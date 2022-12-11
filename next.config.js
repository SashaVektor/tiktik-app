/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['w1.pngwing.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
