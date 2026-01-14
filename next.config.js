/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages basePath (update 'skyvibes' to your repo name if different)
  basePath: process.env.NODE_ENV === "production" ? "/skyvibes" : "",
  // Disable trailing slashes for GitHub Pages
  trailingSlash: true,
};

module.exports = nextConfig;
