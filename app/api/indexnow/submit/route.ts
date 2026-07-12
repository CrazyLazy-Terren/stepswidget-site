import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import sitemap from '@/app/sitemap'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')

  // Retrieve verification key configuration
  const expectedKey = process.env.INDEXNOW_KEY || 'c578ec83f7ae49908bfeb9b9f494de37'
  const submitSecret = process.env.INDEXNOW_SUBMIT_SECRET || expectedKey

  if (!secret || secret !== submitSecret) {
    return NextResponse.json(
      { error: 'Unauthorized: invalid or missing secret parameter' },
      { status: 401 }
    )
  }

  try {
    // Generate sitemap URLs dynamically using the project's sitemap.ts
    const sitemapEntries = await sitemap()
    const urls = sitemapEntries.map((entry) => entry.url)

    if (urls.length === 0) {
      return NextResponse.json(
        { message: 'No URLs found in sitemap to submit.' },
        { status: 200 }
      )
    }

    // Extract protocol and host from sitemap URLs
    const urlObj = new URL(urls[0])
    const host = urlObj.host
    const protocol = urlObj.protocol // 'https:' or 'http:'

    // Construct the IndexNow submission payload
    const key = expectedKey
    const keyLocation = `${protocol}//${host}/${key}.txt`

    const payload = {
      host,
      key,
      keyLocation,
      urlList: urls,
    }

    // Submit to IndexNow API
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Successfully submitted URLs to IndexNow.',
        submittedUrlsCount: urls.length,
        payload,
      })
    } else {
      const responseText = await response.text()
      return NextResponse.json(
        {
          success: false,
          message: `IndexNow API returned status code ${response.status}`,
          error: responseText,
          payload,
        },
        { status: response.status }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to generate sitemap or submit to IndexNow.',
        error: error?.message || String(error),
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
