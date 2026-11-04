import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '../../content-shell';
import { BLOG_BASE_PATH } from '../article/constants';
import { formatDate } from '../article/format';
import { blog } from '../article/lib/blog-client';
import { NEW_ARTICLE_BASE_PATH, getAllArticles, log, postDate } from '../newarticle/store';

// Rendered per request: both sources change outside the build.
export const dynamic = 'force-dynamic';

const title = 'Media';
const description = 'Every article published on the site, from both of our article sources, in one place.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/media' },
};

type MediaItem = {
  key: string;
  title: string;
  href: string;
  date: string;
  description?: string;
};

type MediaSource = {
  id: string;
  heading: string;
  indexHref: string;
  items: MediaItem[];
  failed: boolean;
};

// One source being down should not take the whole page with it.
async function load(name: string, fetchItems: () => Promise<MediaItem[]>): Promise<{ items: MediaItem[]; failed: boolean }> {
  try {
    return { items: await fetchItems(), failed: false };
  } catch (error) {
    log(`media page could not load ${name}`, { error: error instanceof Error ? error.message : String(error) });
    return { items: [], failed: true };
  }
}

async function getSources(): Promise<MediaSource[]> {
  const [articles, newArticles] = await Promise.all([
    load('article', async () =>
      (await blog.getAllArticles()).map((article) => ({
        key: `article-${article.id}`,
        title: article.title,
        href: `${BLOG_BASE_PATH}/${article.slug}`,
        date: article.published_at,
        description: article.meta_description,
      }))
    ),
    load('newarticle', async () =>
      (await getAllArticles()).map((article) => ({
        key: `newarticle-${article.id}`,
        title: article.title,
        href: `${NEW_ARTICLE_BASE_PATH}/${article.slug}`,
        date: postDate(article),
        description: article.meta_description,
      }))
    ),
  ]);

  return [
    { id: 'articles', heading: 'Articles', indexHref: BLOG_BASE_PATH, ...articles },
    { id: 'guides-and-updates', heading: 'Guides and updates', indexHref: NEW_ARTICLE_BASE_PATH, ...newArticles },
  ];
}

export default async function MediaPage() {
  const sources = await getSources();

  return (
    <ContentShell eyebrow="Steps Widget" title={title} description={description}>
      <nav aria-label="Sources" className="mb-12 flex flex-wrap gap-2">
        {sources.map((source) => (
          <a
            key={source.id}
            href={`#${source.id}`}
            className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-[color:var(--border-strong)] hover:text-[var(--text-strong)]"
          >
            {source.heading} <span className="text-[var(--text-subtle)]">{source.items.length}</span>
          </a>
        ))}
      </nav>

      <div className="space-y-16">
        {sources.map((source) => (
          <section key={source.id} id={source.id} className="scroll-mt-24">
            <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--border)] pb-4">
              <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{source.heading}</h2>
              <Link href={source.indexHref} className="shrink-0 text-sm text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
                View all
              </Link>
            </div>

            {source.items.length === 0 ? (
              <p className="py-6 text-[var(--text-muted)]">
                {source.failed ? 'These articles could not be loaded right now.' : 'No articles have been published yet.'}
              </p>
            ) : (
              <ul className="divide-y divide-[color:var(--border)]">
                {source.items.map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} className="group flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
                      <time dateTime={item.date} className="shrink-0 pt-1 text-xs font-medium text-[var(--text-subtle)] sm:w-36">
                        {formatDate(item.date)}
                      </time>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-[var(--text-strong)] transition group-hover:text-[var(--text-muted)]">
                          {item.title}
                        </h3>
                        {item.description ? (
                          <p className="mt-1 line-clamp-2 text-sm text-[var(--text-muted)]">{item.description}</p>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </ContentShell>
  );
}
