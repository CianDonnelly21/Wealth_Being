/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/server/:path*',
        destination: 'https://wealth-being-api-for-app.onrender.com/:path*',
      },
    ];
  },
};

export default nextConfig;