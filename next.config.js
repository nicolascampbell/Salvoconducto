/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  basePath: '/Salvoconducto',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    config.optimization.splitChunks.cacheGroups = {
      common: {
        name: 'common',
        chunks: 'all'
      }
    }

    return config
  }
}

module.exports = nextConfig
