/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'i.stack.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'e7.pngegg.com',
      },
      {
        protocol: 'https',
        hostname: 'img-new.cgtrader.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn3d.iconscout.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      },
      {
        protocol: 'https',
        hostname: 'elements-video-cover-images-0.imgix.net',
      },
      {
        protocol: 'https',
        hostname: 'images.newscientist.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.iflscience.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'medlineplus.gov',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'static01.nyt.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'mobility-health-backend-production.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: 'avica.up.railway.app',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'avica-health.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
