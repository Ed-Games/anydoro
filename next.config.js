/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  sw: "/service-worker.js",
});
const withOffline = require("next-offline");

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = withOffline(nextConfig);
