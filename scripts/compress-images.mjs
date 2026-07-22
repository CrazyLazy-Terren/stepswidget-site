import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import sharp from 'sharp'

const targetDirs = ['public/assets', 'public/blog']
const extensions = new Set(['.png', '.jpg', '.jpeg'])
const dryRun = process.argv.includes('--dry-run')
const cachePath = path.join('scripts', '.image-compression-cache.json')
const minSavingsPercent = 5

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

function collectImageFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...collectImageFiles(fullPath))
      continue
    }

    if (extensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }

  return files
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

async function compressImage(filePath) {
  const originalBuffer = fs.readFileSync(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const image = sharp(originalBuffer)

  const compressedBuffer =
    ext === '.png'
      ? await image.png({ quality: 80, compressionLevel: 9, effort: 10, palette: true }).toBuffer()
      : await image.jpeg({ quality: 80, mozjpeg: true }).toBuffer()

  const originalSize = originalBuffer.length
  const compressedSize = compressedBuffer.length

  const savedPercent = ((originalSize - compressedSize) / originalSize) * 100

  if (savedPercent >= minSavingsPercent) {
    if (!dryRun) {
      fs.writeFileSync(filePath, compressedBuffer)
    }
    return { filePath, originalSize, compressedSize, skipped: false, finalHash: hashBuffer(compressedBuffer) }
  }

  return { filePath, originalSize, compressedSize: originalSize, skipped: true, finalHash: hashBuffer(originalBuffer) }
}

async function main() {
  const files = targetDirs.filter((dir) => fs.existsSync(dir)).flatMap((dir) => collectImageFiles(dir))
  const cache = loadCache()

  const results = []
  let cachedCount = 0

  for (const filePath of files) {
    const relativePath = path.relative(process.cwd(), filePath)
    const originalBuffer = fs.readFileSync(filePath)
    const currentHash = hashBuffer(originalBuffer)

    if (cache[relativePath] === currentHash) {
      cachedCount += 1
      results.push({ filePath, originalSize: originalBuffer.length, compressedSize: originalBuffer.length, skipped: true, cached: true })
      continue
    }

    const result = await compressImage(filePath)
    if (!dryRun) {
      cache[relativePath] = result.finalHash
    }
    results.push(result)
  }

  if (!dryRun) {
    saveCache(cache)
  }

  let totalOriginal = 0
  let totalCompressed = 0

  console.log(`${dryRun ? '[dry run] ' : ''}Checked ${files.length} images (${cachedCount} already compressed, skipped)...\n`)

  for (const result of results) {
    totalOriginal += result.originalSize
    totalCompressed += result.compressedSize

    const relativePath = path.relative(process.cwd(), result.filePath)

    if (result.cached) {
      continue
    }

    if (result.skipped) {
      console.log(`  skip   ${relativePath} (savings under ${minSavingsPercent}%, kept original at ${formatBytes(result.originalSize)})`)
      continue
    }

    const savedPercent = (((result.originalSize - result.compressedSize) / result.originalSize) * 100).toFixed(1)
    console.log(`  ${formatBytes(result.originalSize).padStart(10)} -> ${formatBytes(result.compressedSize).padStart(10)}  (-${savedPercent}%)  ${relativePath}`)
  }

  const totalSavedPercent = totalOriginal ? (((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(1) : '0.0'
  console.log(`\nTotal (this run): ${formatBytes(totalOriginal)} -> ${formatBytes(totalCompressed)} (-${totalSavedPercent}%)`)
}

main()
