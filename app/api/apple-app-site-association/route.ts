import { NextResponse } from 'next/server'

// Served at /.well-known/apple-app-site-association (see next.config.ts), so
// iOS opens the site's share links in the app: /invite for a shared Steps
// card, /s/<token> for the QR code on a shared style card.
const appID = '29Q52CHC8K.xyz.crazylazy.Steps'

export function GET() {
  return NextResponse.json(
    {
      applinks: {
        details: [
          {
            appIDs: [appID],
            components: [
              { '/': '/invite', comment: 'A shared Steps card' },
              { '/': '/s/*', comment: 'A shared widget style card' },
            ],
          },
        ],
      },
    },
    { headers: { 'Cache-Control': 'public, max-age=3600' } }
  )
}
