import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { getBlogPost, postsDirectory } from '@/app/(en)/blog/posts'

/*
 * Dev-only: replaces a blog post's hero image from the "Replace hero" button.
 *
 * The upload is converted to WebP (same settings as `pnpm compress-images` for
 * photos) and written over the post's existing `image` path, so every
 * reference keeps working. A post without a hero gets `/assets/blog-<slug>.webp`
 * and an `image:` line in its front matter.
 *
 * Returns 404 outside `next dev`, and `sharp` (a devDependency) is imported
 * only after that check, so production never loads it.
 */

const assetsDirectory = path.join(process.cwd(), 'public', 'assets')
const maxWidth = 1920

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Not found', { status: 404 })
  }

  const form = await request.formData()
  const slug = form.get('slug')
  const file = form.get('file')

  if (typeof slug !== 'string' || !(file instanceof File)) {
    return Response.json({ error: 'Expected a slug and a file.' }, { status: 400 })
  }

  const post = getBlogPost(slug)
  if (!post) {
    return Response.json({ error: `No post with slug "${slug}".` }, { status: 404 })
  }

  const imagePath = post.image ?? `/assets/blog-${post.slug}.webp`
  const target = path.join(process.cwd(), 'public', imagePath)

  // Only ever write WebP files inside public/assets.
  if (!target.startsWith(assetsDirectory + path.sep) || path.extname(target) !== '.webp') {
    return Response.json({ error: `Refusing to write to ${imagePath}.` }, { status: 400 })
  }

  const { default: sharp } = await import('sharp')
  const input = Buffer.from(await file.arrayBuffer())

  try {
    const info = await sharp(input)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(target)

    if (!post.image) {
      addImageToFrontMatter(post.slug, imagePath)
    }

    return Response.json({ image: imagePath, width: info.width, height: info.height, bytes: info.size })
  } catch (error) {
    return Response.json({ error: `Could not convert the image: ${(error as Error).message}` }, { status: 400 })
  }
}

function addImageToFrontMatter(slug: string, imagePath: string) {
  const slugLine = new RegExp(`^slug:\\s*['"]?${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]?\\s*$`, 'm')
  const filename = readdirSync(postsDirectory).find(
    (name) => name.endsWith('.md') && slugLine.test(readFileSync(path.join(postsDirectory, name), 'utf8'))
  )

  if (!filename) {
    throw new Error(`Could not find the markdown file for "${slug}".`)
  }

  const filePath = path.join(postsDirectory, filename)
  const raw = readFileSync(filePath, 'utf8')
  // Insert right after the opening `---`, so the front matter stays valid.
  writeFileSync(filePath, raw.replace(/^---\r?\n/, `---\nimage: ${imagePath}\n`))
}
