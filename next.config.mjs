/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['gravatar.com'],
    },
    assetPrefix: process.env.REACT_APP_ENV === 'development'
        ? 'http://tecnos-gateway/ui-static'
        : 'http://tecnos-gateway/ui-static',
};

export default nextConfig;
