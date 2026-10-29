export const BLOG_BASE_PATH = '/article';

export const PAGE_SIZE = 12;

export const SITE_NAME = 'Articles';

export const REVALIDATE_SECONDS = process.env.NODE_ENV === 'development' ? 10 : 86400;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/+$/, '');
