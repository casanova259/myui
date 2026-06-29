const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"], // add avif first — ~50% smaller than webp
    qualities: [75,85],                        // you only need one; Next picks based on your <Image quality={} /> prop
  },
}
export default nextConfig