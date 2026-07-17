const isGithubActions = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath: isGithubActions ? "/website" : "",
  assetPrefix: isGithubActions ? "/website" : "",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["three"],
};

export default nextConfig;
