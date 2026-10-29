import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://localhost:3000'],
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Disable caching and optimization ONLY in local development
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [{ protocol: 'https', hostname: '*' }],
  },
  async redirects() {
    return [
      // The iOS 27 public beta post was rewritten for the public release.
      { source: '/blog/ios-27-public-beta', destination: '/blog/ios-27', permanent: true },
      { source: '/blog/posts/ios-27-public-beta', destination: '/blog/posts/ios-27', permanent: true },
    ]
  },
  async rewrites() {
    return [
      // iOS reads this to open /invite links (shared Steps cards) in the app.
      {
        source: '/.well-known/apple-app-site-association',
        destination: '/api/apple-app-site-association',
      },
      {
        source: '/:key([a-f0-9]{32}).txt',
        destination: '/api/indexnow-key/:key',
      },
    ]
  },
}

export default nextConfig
