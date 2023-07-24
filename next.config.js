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
    USER_PASSWORD: process.env.USER_PASSWORD,
    USER_EMAIL: process.env.USER_EMAIL,
    SECRET: process.env.SECRET,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    
  },
};
