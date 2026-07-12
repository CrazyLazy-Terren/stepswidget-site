import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params

  // User-provided IndexNow verification key, with fallback to environment variable
  const expectedKey = process.env.INDEXNOW_KEY || 'c578ec83f7ae49908bfeb9b9f494de37'

  if (key === expectedKey) {
    return new NextResponse(expectedKey, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  }

  return new NextResponse('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
