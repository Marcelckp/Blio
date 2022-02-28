/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['iili.io'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/post/:path*',
  //       destination: 'http://freeimage.host/api/1/upload/?key6d207e02198a847aa98d0a2a901485a5=source=C:\fakepath\A4B30D0A-EB5C-4617-8EE2-5E4C6220AAA6.heic&format=json'
  //     }
  //   ]
  // }
}
