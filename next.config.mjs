/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['gravatar.com'],
    },
    assetPrefix: process.env.REACT_APP_ENV === 'development' ?
        'http://localhost:80/admin-static' :
        'http://84.46.241.251/admin-static',
};

export default nextConfig;
