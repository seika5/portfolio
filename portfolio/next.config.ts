import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true, 
  },
  basePath: '/portfolio', 
  assetPrefix: '/portfolio/', 
  trailingSlash: true,
};

export default nextConfig;
