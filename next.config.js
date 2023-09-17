/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'utfs.io', 'img.clerk.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
