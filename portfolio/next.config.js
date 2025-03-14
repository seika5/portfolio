/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: process.env.NODE_ENV === 'production' ? '.next' : '.next',
};

module.exports = nextConfig;