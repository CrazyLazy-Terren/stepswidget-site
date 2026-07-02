import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://localhost:3000'],
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Disable caching and optimization ONLY in local development
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

export default nextConfig
