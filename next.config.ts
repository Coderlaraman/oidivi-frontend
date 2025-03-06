import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

// Solucionar Error: Invalid src prop (http://oidivi-api.test/storage/profile_photos/1740066916_67b75064332c3.jpg) on `next/image`, hostname "oidivi-api.test" is not configured under images in your `next.config.js`
// See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "oidivi-api.test",
    },
  ],
},

};

export default nextConfig;
