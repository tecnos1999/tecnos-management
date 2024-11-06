/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['gravatar.com'],
    },
    assetPrefix: process.env.REACT_APP_ENV === 'development' 
        ? 'http://localhost:8080/admin-static' 
        : '',
};

export default nextConfig;
