import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.ctfassets.net',
      'dev-to-uploads.s3.amazonaws.com',
      'media.dev.to',
      'media2.dev.to',
      'res.cloudinary.com',
    ],
  },
};

export default nextConfig;
