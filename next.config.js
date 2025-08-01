/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: false // fully disable SWC transforms
  }
};

module.exports = nextConfig;