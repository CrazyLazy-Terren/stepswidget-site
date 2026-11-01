import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentShell } from '../../../content-shell';
import { SITE_URL } from '../../article/constants';
import { formatDate } from '../../article/format';
import { NEW_ARTICLE_BASE_PATH, getArticle, isPublished, postDate } from '../store';
import '../../article/blog-content.css';

// Rendered per request: articles arrive through the postarticle webhook, not at build time.
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article || !isPublished(article)) {
    return {};
  }
  const canonical = SITE_URL ? `${SITE_URL}${NEW_ARTICLE_BASE_PATH}/${article.slug}` : undefined;
  return {
    title: article.title,
    description: article.meta_description,
    keywords: article.tags,
    authors: article.author ? [{ name: article.author }] : undefined,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.meta_description,
      url: canonical,
      images: article.image_url ? [{ url: article.image_url, alt: article.alt_text }] : undefined,
      publishedTime: postDate(article),
      authors: article.author ? [article.author] : undefined,
      tags: article.tags,
    },
  };
}

export default async function NewArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article || !isPublished(article)) {
    notFound();
  }

  return (
    <ContentShell eyebrow="Article" title={article.title} description={article.meta_description ?? ''}>
      <article className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-subtle)]">
          <Link href={NEW_ARTICLE_BASE_PATH} className="font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
            ← All articles
          </Link>
          <span aria-hidden="true">·</span>
          <time dateTime={postDate(article)}>{formatDate(postDate(article))}</time>
          {article.author ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{article.author}</span>
            </>
          ) : null}
        </div>

        {article.image_url ? (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[var(--surface-2)]">
            <Image src={article.image_url} alt={article.alt_text ?? article.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
        ) : null}

        <div className="blog-content mt-8" dangerouslySetInnerHTML={{ __html: article.content_html }} />

        {article.tags && article.tags.length > 0 ? (
          <footer className="mt-12 flex flex-wrap gap-2 border-t border-[color:var(--border)] pt-6">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]">
                {tag}
              </span>
            ))}
          </footer>
        ) : null}
      </article>
    </ContentShell>
  );
}
