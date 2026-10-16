import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import sharp from 'sharp'

/*
 * Converts every PNG and JPEG under the target dirs to WebP, points every
 * reference in the source at the new file, and removes the original. A WebP
 * with the same name is overwritten, so dropping in a new PNG or JPEG under an
 * existing image's name updates that image.
 *
 * Files in `keepFormat` stay in their own format (browsers, iOS and search
 * engines expect PNG there) and are only recompressed in place, as before.
 *
 *   pnpm compress-images            convert, rewrite references, delete originals
 *   pnpm compress-images --dry-run  report what would change, touch nothing
 */

const targetDirs = ['public/assets', 'public/blog']
const sourceDirs = ['app', 'scripts']
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.md', '.mdx', '.css', '.json'])
const extensions = new Set(['.png', '.jpg', '.jpeg'])
const keepFormat = [/^favicon-/, /^apple-touch-icon\.png$/, /^app-store\.png$/, /^stepswidget-icon\.png$/]
const dryRun = process.argv.includes('--dry-run')
const cachePath = path.join('scripts', '.image-compression-cache.json')
const minSavingsPercent = 5

// UI screenshots carry small text, so PNGs get a higher quality than photos.
const webpOptions = {
  '.png': { quality: 88, alphaQuality: 100, effort: 6 },
  '.jpg': { quality: 80, effort: 6 },
  '.jpeg': { quality: 80, effort: 6 },
}

function loadCache() {
  if (!fs.existsSync(cachePath)) {
    return {}
  }
  return JSON.parse(fs.readFileSync(cachePath, 'utf8'))
}

function saveCache(cache) {
  const sortedEntries = Object.fromEntries(Object.keys(cache).sort().map((key) => [key, cache[key]]))
  fs.writeFileSync(cachePath, `${JSON.stringify(sortedEntries, null, 2)}\n`)
}

function hashBuffer(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

function collectFiles(dir, allowed) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath, allowed))
      continue
    }

    if (allowed.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }

  return files
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

function keepsFormat(filePath) {
  return keepFormat.some((pattern) => pattern.test(path.basename(filePath)))
}

/** `public/assets/foo.png` is served as `/assets/foo.png`; references are matched on that path without the leading slash. */
function publicPath(filePath) {
  return path.relative('public', filePath).split(path.sep).join('/')
}

async function compressInPlace(filePath, originalBuffer) {
  const ext = path.extname(filePath).toLowerCase()
  const image = sharp(originalBuffer)

  const compressedBuffer =
    ext === '.png'
      ? await image.png({ quality: 80, compressionLevel: 9, effort: 10, palette: true }).toBuffer()
      : await image.jpeg({ quality: 80, mozjpeg: true }).toBuffer()

  const originalSize = originalBuffer.length
  const savedPercent = ((originalSize - compressedBuffer.length) / originalSize) * 100

  if (savedPercent >= minSavingsPercent) {
    if (!dryRun) {
      fs.writeFileSync(filePath, compressedBuffer)
    }
    return { kind: 'compressed', filePath, originalSize, finalSize: compressedBuffer.length, finalHash: hashBuffer(compressedBuffer) }
  }

  return { kind: 'skipped', filePath, originalSize, finalSize: originalSize, finalHash: hashBuffer(originalBuffer) }
}

async function convertToWebp(filePath, originalBuffer) {
  const ext = path.extname(filePath).toLowerCase()
  const webpPath = filePath.slice(0, -ext.length) + '.webp'

  // A PNG or JPEG dropped in next to an existing WebP is the newer source, so it
  // always replaces that WebP.
  const replacesWebp = fs.existsSync(webpPath)
  const webpBuffer = await sharp(originalBuffer).webp(webpOptions[ext]).toBuffer()

  // A flat-colour PNG can come out larger as WebP; leave a new one alone.
  if (!replacesWebp && webpBuffer.length >= originalBuffer.length) {
    return { kind: 'skipped', filePath, originalSize: originalBuffer.length, finalSize: originalBuffer.length, finalHash: hashBuffer(originalBuffer) }
  }

  if (!dryRun) {
    fs.writeFileSync(webpPath, webpBuffer)
  }

  return { kind: 'converted', filePath, webpPath, replacesWebp, originalSize: originalBuffer.length, finalSize: webpBuffer.length }
}

function rewriteReferences(conversions) {
  const sourceFiles = sourceDirs.filter((dir) => fs.existsSync(dir)).flatMap((dir) => collectFiles(dir, sourceExtensions))
  const replacements = conversions.map(({ filePath, webpPath }) => [publicPath(filePath), publicPath(webpPath)])
  const changedFiles = []

  for (const sourceFile of sourceFiles) {
    if (path.resolve(sourceFile) === path.resolve(cachePath)) {
      continue
    }

    const original = fs.readFileSync(sourceFile, 'utf8')
    let updated = original
    let count = 0

    for (const [from, to] of replacements) {
      const parts = updated.split(from)
      count += parts.length - 1
      updated = parts.join(to)
    }

    if (updated !== original) {
      changedFiles.push({ sourceFile, count })
      if (!dryRun) {
        fs.writeFileSync(sourceFile, updated)
      }
    }
  }

  return changedFiles
}

async function main() {
  const files = targetDirs.filter((dir) => fs.existsSync(dir)).flatMap((dir) => collectFiles(dir, extensions))
  const cache = loadCache()

  const results = []
  let cachedCount = 0

  for (const filePath of files) {
    const relativePath = path.relative(process.cwd(), filePath)
    const originalBuffer = fs.readFileSync(filePath)

    if (keepsFormat(filePath)) {
      if (cache[relativePath] === hashBuffer(originalBuffer)) {
        cachedCount += 1
        continue
      }

      const result = await compressInPlace(filePath, originalBuffer)
      if (!dryRun) {
        cache[relativePath] = result.finalHash
      }
      results.push(result)
      continue
    }

    const result = await convertToWebp(filePath, originalBuffer)
    if (!dryRun && result.kind === 'skipped') {
      cache[relativePath] = result.finalHash
    }
    results.push(result)
  }

  const conversions = results.filter((result) => result.kind === 'converted')
  const changedFiles = rewriteReferences(conversions)

  if (!dryRun) {
    for (const { filePath } of conversions) {
      fs.rmSync(filePath)
      delete cache[path.relative(process.cwd(), filePath)]
    }
    saveCache(cache)
  }

  let totalOriginal = 0
  let totalFinal = 0

  console.log(`${dryRun ? '[dry run] ' : ''}Checked ${files.length} images (${cachedCount} kept-format images already compressed, skipped)...\n`)

  for (const result of results) {
    totalOriginal += result.originalSize
    totalFinal += result.finalSize

    const relativePath = path.relative(process.cwd(), result.filePath)

    if (result.kind === 'skipped') {
      console.log(`  skip   ${relativePath} (savings under ${minSavingsPercent}% or WebP larger, kept original at ${formatBytes(result.originalSize)})`)
      continue
    }

    const savedPercent = (((result.originalSize - result.finalSize) / result.originalSize) * 100).toFixed(1)
    const label =
      result.kind === 'converted'
        ? `${relativePath} -> ${path.basename(result.webpPath)}${result.replacesWebp ? ' (replaced existing)' : ''}`
        : relativePath
    console.log(`  ${formatBytes(result.originalSize).padStart(10)} -> ${formatBytes(result.finalSize).padStart(10)}  (-${savedPercent}%)  ${label}`)
  }

  if (changedFiles.length) {
    console.log(`\n${dryRun ? 'Would update' : 'Updated'} references in ${changedFiles.length} files:`)
    for (const { sourceFile, count } of changedFiles) {
      console.log(`  ${String(count).padStart(3)}  ${sourceFile}`)
    }
  }

  const totalSavedPercent = totalOriginal ? (((totalOriginal - totalFinal) / totalOriginal) * 100).toFixed(1) : '0.0'
  console.log(`\nTotal (this run): ${formatBytes(totalOriginal)} -> ${formatBytes(totalFinal)} (-${totalSavedPercent}%)`)
}

main()
