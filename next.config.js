/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      "source.unsplash.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
};
