/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 1. Optimization Settings
    formats: ["image/avif", "image/webp"], 
    qualities: [75, 85], 
    
    // 2. External Domain Allowlist (Fixes the Unsplash Error)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;