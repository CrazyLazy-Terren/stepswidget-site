import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentShell } from '../../../../content-shell';
import { ArticleCard } from '../../components/ArticleCard';
import { Pagination } from '../../components/Pagination';
import { BLOG_BASE_PATH } from '../../constants';
import { blog } from '../../lib/blog-client';
import { paginate, parsePage } from '../../pagination';

// Rendered per request: articles change in BabyLoveGrowth, not at build time.
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Articles tagged “${slug}”` };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const articles = await blog.getArticlesByTag(slug);
  if (articles.length === 0) {
    notFound();
  }
  const basePath = `${BLOG_BASE_PATH}/tag/${slug}`;
  const { items, info } = paginate(articles, parsePage(page));

  return (
    <ContentShell
      eyebrow="Articles"
      title={`#${slug}`}
      description={`${articles.length} ${articles.length === 1 ? 'article' : 'articles'}`}>
      <Link
        href={BLOG_BASE_PATH}
        className="mb-8 inline-block text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
        ← All articles
      </Link>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <Pagination basePath={basePath} info={info} />
    </ContentShell>
  );
}
