/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  // Отключаем турбопак для сборки на Vercel
  experimental: {
    turbo: {
      resolveAlias: {
        // Явно указываем корневую директорию
      }
    }
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig