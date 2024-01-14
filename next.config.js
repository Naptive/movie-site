/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracing: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            pathname: '**',
          },
        ],
      },
}
module.exports = nextConfig