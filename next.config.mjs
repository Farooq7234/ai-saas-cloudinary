/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  api: {
    bodyParser: {
      sizeLimit: "70mb", // Adjust the size as needed
    },
  },
};

export default nextConfig;
