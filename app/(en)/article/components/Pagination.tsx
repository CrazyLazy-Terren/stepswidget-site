import Link from 'next/link';
import type { PageInfo } from '../pagination';
import { pageHref } from '../pagination';

const baseClass =
  'inline-flex items-center rounded-lg border border-[color:var(--border)] px-4 py-2 text-sm font-medium';

export function Pagination({ basePath, info }: { basePath: string; info: PageInfo }) {
  if (info.totalPages <= 1) {
    return null;
  }
  return (
    <nav className="mt-12 flex items-center justify-between" aria-label="Pagination">
      {info.hasPrev ? (
        <Link
          href={pageHref(basePath, info.page - 1)}
          className={`${baseClass} text-[var(--text-strong)] hover:bg-[var(--surface-1)]`}
        >
          ← Previous
        </Link>
      ) : (
        <span className={`${baseClass} cursor-not-allowed text-[var(--text-subtle)] opacity-50`}>← Previous</span>
      )}
      <span className="text-sm text-[var(--text-subtle)]">
        Page {info.page} of {info.totalPages}
      </span>
      {info.hasNext ? (
        <Link
          href={pageHref(basePath, info.page + 1)}
          className={`${baseClass} text-[var(--text-strong)] hover:bg-[var(--surface-1)]`}
        >
          Next →
        </Link>
      ) : (
        <span className={`${baseClass} cursor-not-allowed text-[var(--text-subtle)] opacity-50`}>Next →</span>
      )}
    </nav>
  );
}
