import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  basePath: '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig;