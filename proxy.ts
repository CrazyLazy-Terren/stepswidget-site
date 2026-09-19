import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Tells the root layout which language a request is for.
 *
 * The root layout renders `<html lang>` but cannot see the URL, so requests
 * under `/es` get an `x-site-lang` header it reads instead. Everything else
 * is English and never reaches this function.
 */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-site-lang', 'es')

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/es', '/es/:path*'],
}
