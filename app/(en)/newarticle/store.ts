import { promises as fs } from 'node:fs';
import path from 'node:path';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

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

// What the index page needs: everything but the article bodies.
export type NewArticleSummary = Omit<NewArticle, 'content_html' | 'content_markdown'>;

export const NEW_ARTICLE_BASE_PATH = '/newarticle';

// Articles live in a DynamoDB table keyed by `slug`. Credentials and region come
// from the standard AWS env vars (AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY).
const TABLE = process.env.ARTICLES_DYNAMODB_TABLE;
// Without a table (local dev), articles are kept on disk instead.
const LOCAL_DIR = path.join(process.cwd(), '.data', 'newarticle');

let documentClient: DynamoDBDocumentClient | undefined;
function db(): DynamoDBDocumentClient {
  documentClient ??= DynamoDBDocumentClient.from(new DynamoDBClient({}), {
    marshallOptions: { removeUndefinedValues: true },
  });
  return documentClient;
}

const SUMMARY_FIELDS = [
  'id',
  'title',
  'slug',
  'meta_description',
  'created_at',
  'published_at',
  'image_url',
  'alt_text',
  'tags',
  'author',
  '#status',
  'is_update',
  'received_at',
];

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function isPublished(article: NewArticleSummary): boolean {
  return article.status?.toLowerCase() !== 'draft';
}

// The post date: when it went live, falling back to when it was written.
export function postDate(article: NewArticleSummary): string {
  return article.published_at ?? article.created_at ?? article.received_at;
}

export async function saveArticle(article: NewArticle): Promise<void> {
  if (TABLE) {
    await db().send(new PutCommand({ TableName: TABLE, Item: article }));
    return;
  }
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_DIR, `${article.slug}.json`), JSON.stringify(article, null, 2));
}

export async function getArticle(slug: string): Promise<NewArticle | null> {
  if (!isValidSlug(slug)) {
    return null;
  }
  if (TABLE) {
    const { Item } = await db().send(new GetCommand({ TableName: TABLE, Key: { slug } }));
    return (Item as NewArticle | undefined) ?? null;
  }
  try {
    return JSON.parse(await fs.readFile(path.join(LOCAL_DIR, `${slug}.json`), 'utf8')) as NewArticle;
  } catch {
    return null;
  }
}

async function listSummaries(): Promise<NewArticleSummary[]> {
  if (TABLE) {
    const items: NewArticleSummary[] = [];
    let startKey: Record<string, unknown> | undefined;
    do {
      const page = await db().send(
        new ScanCommand({
          TableName: TABLE,
          ProjectionExpression: SUMMARY_FIELDS.join(', '),
          // `status` is a DynamoDB reserved word.
          ExpressionAttributeNames: { '#status': 'status' },
          ExclusiveStartKey: startKey,
        })
      );
      items.push(...((page.Items ?? []) as NewArticleSummary[]));
      startKey = page.LastEvaluatedKey;
    } while (startKey);
    return items;
  }
  try {
    const files = (await fs.readdir(LOCAL_DIR)).filter((file) => file.endsWith('.json'));
    const articles = await Promise.all(files.map((file) => getArticle(file.slice(0, -5))));
    return articles.filter((article): article is NewArticle => article !== null);
  } catch {
    return [];
  }
}

// Published articles, newest post date first.
export async function getAllArticles(): Promise<NewArticleSummary[]> {
  return (await listSummaries())
    .filter(isPublished)
    .sort((a, b) => postDate(b).localeCompare(postDate(a)));
}
