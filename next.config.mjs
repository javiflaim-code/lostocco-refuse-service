/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // The pose art is at most 700px wide at source, so there is nothing to gain
    // from 1920/2048/3840 candidates — Next would upscale them, which costs
    // encode time and ships more bytes for no extra detail.
    deviceSizes: [360, 480, 640, 828, 1080],
    imageSizes: [96, 128, 200, 256, 320],
  },
};

export default nextConfig;
