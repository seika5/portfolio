import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: './',
  trailingSlash: true,
};

export default nextConfig;