/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*', // panggil CI4
      },
    ]
  },
}

export default nextConfig;
