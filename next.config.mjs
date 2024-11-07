/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['gravatar.com'],
    },
    assetPrefix: process.env.REACT_APP_ENV === 'development'
        ? 'http://localhost:80/admin-static'
        : process.env.REACT_APP_ENV === 'production'
            ? 'http://tecnos-gateway/admin-static'
            : '',
};

export default nextConfig;
