/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 1. Optimization Settings
    formats: ["image/avif", "image/webp"], 
    qualities: [75, 85], 
    
    // 2. External Domain Allowlist (Fixes both Unsplash and Prismic Errors)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;