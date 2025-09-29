// next.config.mjs
/** @type {import('next').NextConfig} */
export default {
 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com", // Firebase
      },
      {
        protocol: "https",
        hostname: "i.ibb.co", // ImgBB
      },
    ],
  },
};
