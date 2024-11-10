/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['gravatar.com'],
    },
    assetPrefix: process.env.REACT_APP_ENV === 'development'
        ? 'http://localhost:8080/admin-static'
        : 'https://89.33.44.227/admin-static',
};

export default nextConfig;
