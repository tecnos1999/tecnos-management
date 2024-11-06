/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['gravatar.com'],
    },
    assetPrefix: process.env.REACT_APP_ENV === 'development'
        ? 'http://tecnos-gateway/admin-static'
        : 'http://tecnos-gateway/admin-static',
};

export default nextConfig;
