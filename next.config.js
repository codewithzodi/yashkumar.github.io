/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '/yashkumar.github.io',
  assetPrefix: '/yashkumar.github.io/',
}

module.exports = nextConfig
