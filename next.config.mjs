/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
