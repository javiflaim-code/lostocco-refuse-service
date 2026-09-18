/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Source art tops out at 1400px wide, so candidates above that would only
    // upscale — slow to encode and more bytes for no extra detail.
    deviceSizes: [360, 480, 640, 828, 1080, 1400],
    imageSizes: [96, 128, 200, 256, 320],
  },
};

export default nextConfig;
