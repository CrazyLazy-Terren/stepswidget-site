import type { Metadata } from 'next';
import { ContentShell } from '../../content-shell';
import { ArticleCard } from './components/ArticleCard';
import { Pagination } from './components/Pagination';
import { BLOG_BASE_PATH, SITE_NAME } from './constants';
import { blog } from './lib/blog-client';
import { paginate, parsePage } from './pagination';

// Rendered per request: articles change in BabyLoveGrowth, not at build time.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: 'Latest articles, guides, and updates.',
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const articles = await blog.getAllArticles();
  const { items, info } = paginate(articles, parsePage(page));

  return (
    <ContentShell eyebrow="Steps Widget" title={SITE_NAME} description="Latest articles, guides, and updates.">
      {items.length === 0 ? (
        <p className="text-[var(--text-muted)]">No articles have been published yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      <Pagination basePath={BLOG_BASE_PATH} info={info} />
    </ContentShell>
  );
}
