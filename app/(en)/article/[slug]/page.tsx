import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentShell } from '../../../content-shell';
import { ArticleJsonLd } from '../components/ArticleJsonLd';
import { TagList } from '../components/TagList';
import { BLOG_BASE_PATH, SITE_URL } from '../constants';
import { formatDate } from '../format';
import { blog } from '../lib/blog-client';
import '../blog-content.css';

export const revalidate = 86400;

export async function generateStaticParams() {
  const articles = await blog.getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await blog.getArticleBySlug(slug);
  if (!article) {
    return {};
  }
  const canonical = SITE_URL ? `${SITE_URL}${BLOG_BASE_PATH}/${article.slug}` : undefined;
  return {
    title: article.title,
    description: article.meta_description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.meta_description,
      url: canonical,
      images: article.hero_image_url ? [{ url: article.hero_image_url }] : undefined,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await blog.getArticleBySlug(slug);
  if (!article || !article.published) {
    notFound();
  }

  return (
    <ContentShell eyebrow="Article" title={article.title} description={article.meta_description}>
      <ArticleJsonLd data={article.jsonLd} />
      <ArticleJsonLd data={article.faqJsonLd} />

      <article className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-subtle)]">
          <Link href={BLOG_BASE_PATH} className="font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
            ← All articles
          </Link>
          <span aria-hidden="true">·</span>
          <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
        </div>

        <div className="blog-content mt-8" dangerouslySetInnerHTML={{ __html: article.content_html }} />

        <footer className="mt-12 border-t border-[color:var(--border)] pt-6">
          <TagList keywords={[article.seedKeyword ?? '', ...article.keywords]} />
        </footer>
      </article>
    </ContentShell>
  );
}
