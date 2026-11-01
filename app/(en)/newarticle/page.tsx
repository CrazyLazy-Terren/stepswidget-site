import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ContentShell } from '../../content-shell';
import { formatDate } from '../article/format';
import { NEW_ARTICLE_BASE_PATH, getAllArticles, postDate } from './store';

// Rendered per request: articles arrive through the postarticle webhook, not at build time.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Latest articles, guides, and updates.',
};

export default async function NewArticleIndexPage() {
  const articles = await getAllArticles();

  return (
    <ContentShell eyebrow="Steps Widget" title="Articles" description="Latest articles, guides, and updates.">
      {articles.length === 0 ? (
        <p className="text-[var(--text-muted)]">No articles have been published yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`${NEW_ARTICLE_BASE_PATH}/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[var(--surface-1)] transition hover:border-[color:var(--border-strong)]"
            >
              {article.image_url ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--surface-2)]">
                  <Image
                    src={article.image_url}
                    alt={article.alt_text ?? article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-5">
                <time dateTime={postDate(article)} className="text-xs font-medium text-[var(--text-subtle)]">
                  {formatDate(postDate(article))}
                </time>
                <h2 className="mt-2 text-lg font-semibold text-[var(--text-strong)] transition group-hover:text-[var(--text-muted)]">
                  {article.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-[var(--text-muted)]">{article.meta_description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </ContentShell>
  );
}
