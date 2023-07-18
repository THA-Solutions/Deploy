/** @type {import('next').NextConfig} */
require("dotenv").config();

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
      "res.cloudinary.com",
    ],
  },
  env: {
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
  },
};
