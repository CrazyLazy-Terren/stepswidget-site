import { notFound } from 'next/navigation'
import { blogPosts, getBlogPostMarkdown } from '../../posts'

type BlogPostMarkdownRouteProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function GET(_request: Request, { params }: BlogPostMarkdownRouteProps) {
  const { slug } = await params
  const markdown = getBlogPostMarkdown(slug)

  if (!markdown) {
    notFound()
  }

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `inline; filename="${slug}.md"`,
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
