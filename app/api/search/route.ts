import { NextResponse } from 'next/server'
import { getSearchIndex } from '../../search-index-data'
import { searchIndex } from '../../search-index'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')
  const type = searchParams.get('type') as 'all' | 'doc' | 'blog' | null

  const allItems = getSearchIndex()

  if (q) {
    const results = searchIndex(allItems, q, type ?? 'all')
    return NextResponse.json(results, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  }

  return NextResponse.json(allItems, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
