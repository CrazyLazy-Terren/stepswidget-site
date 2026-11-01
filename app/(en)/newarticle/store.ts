import { promises as fs } from 'node:fs';
import path from 'node:path';
import { get, list, put } from '@vercel/blob';

// One article as delivered by the postarticle webhook.
export type NewArticle = {
  id: string;
  title: string;
  slug: string;
  content_html: string;
  content_markdown?: string;
  meta_description?: string;
  created_at?: string;
  published_at?: string;
  image_url?: string;
  alt_text?: string;
  tags?: string[];
  author?: string;
  status?: string;
  is_update?: boolean;
  // Set by the webhook, not the sender.
  received_at: string;
};

export const NEW_ARTICLE_BASE_PATH = '/newarticle';

const PREFIX = 'newarticle/';
// Without a Blob token (local dev), articles are kept on disk instead.
const LOCAL_DIR = path.join(process.cwd(), '.data', 'newarticle');
const blobEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function isPublished(article: NewArticle): boolean {
  return article.status?.toLowerCase() !== 'draft';
}

// The post date: when it went live, falling back to when it was written.
export function postDate(article: NewArticle): string {
  return article.published_at ?? article.created_at ?? article.received_at;
}

export async function saveArticle(article: NewArticle): Promise<void> {
  const body = JSON.stringify(article, null, 2);
  if (blobEnabled()) {
    await put(`${PREFIX}${article.slug}.json`, body, {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_DIR, `${article.slug}.json`), body);
}

export async function getArticle(slug: string): Promise<NewArticle | null> {
  if (!isValidSlug(slug)) {
    return null;
  }
  if (blobEnabled()) {
    const result = await get(`${PREFIX}${slug}.json`, { access: 'private', useCache: false });
    if (!result || result.statusCode !== 200) {
      return null;
    }
    return (await new Response(result.stream).json()) as NewArticle;
  }
  try {
    return JSON.parse(await fs.readFile(path.join(LOCAL_DIR, `${slug}.json`), 'utf8')) as NewArticle;
  } catch {
    return null;
  }
}

async function listSlugs(): Promise<string[]> {
  if (blobEnabled()) {
    const slugs: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: PREFIX, cursor });
      slugs.push(...page.blobs.map((blob) => blob.pathname.slice(PREFIX.length, -'.json'.length)));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return slugs;
  }
  try {
    return (await fs.readdir(LOCAL_DIR)).filter((file) => file.endsWith('.json')).map((file) => file.slice(0, -5));
  } catch {
    return [];
  }
}

// Published articles, newest post date first.
export async function getAllArticles(): Promise<NewArticle[]> {
  const articles = await Promise.all((await listSlugs()).map(getArticle));
  return articles
    .filter((article): article is NewArticle => article !== null && isPublished(article))
    .sort((a, b) => postDate(b).localeCompare(postDate(a)));
}
