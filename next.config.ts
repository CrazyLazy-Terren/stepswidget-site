import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://localhost:3000'],
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Disable caching and optimization ONLY in local development
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co' }],
  },
  async rewrites() {
    return [
      {
        source: '/:key([a-f0-9]{32}).txt',
        destination: '/api/indexnow-key/:key',
      },
    ]
  },
}

export default nextConfig
