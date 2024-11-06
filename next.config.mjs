/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['gravatar.com'],
    },
    assetPrefix: process.env.REACT_APP_ENV === 'development' 
        ? 'http://tecnos-gateway:8080/admin-static' 
        : 'http://tecnos-gateway:8080/admin-static',
};

export default nextConfig;
