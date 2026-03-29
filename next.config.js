/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  // basePath: '/yashkumar.github.io', // Enable this if using project site instead of user/org site
}

module.exports = nextConfig
