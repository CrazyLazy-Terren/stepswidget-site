import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://localhost:3000'],
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
