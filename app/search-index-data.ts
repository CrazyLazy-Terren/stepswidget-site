import { getBlogPosts } from './(en)/blog/posts'
import { docPath, getDocs } from './(en)/docs/docs'
import type { SearchIndexItem } from './search-index'

export function getSearchIndex(): SearchIndexItem[] {
  const docs: SearchIndexItem[] = getDocs().map((doc) => ({
    id: `doc-${doc.section.slug}-${doc.slug}`,
    type: 'doc',
    title: doc.title,
    url: docPath(doc),
    category: doc.section.title,
    description: doc.description,
    keywords: doc.keywords,
    updated: doc.updated,
  }))

  const blogPosts: SearchIndexItem[] = getBlogPosts().map((post) => ({
    id: `blog-${post.slug}`,
    type: 'blog',
    title: post.title,
    url: `/blog/${post.slug}`,
    category: post.category,
    description: post.description,
    keywords: post.keywords,
    updated: post.updated ?? post.date,
  }))

  return [...docs, ...blogPosts]
}
