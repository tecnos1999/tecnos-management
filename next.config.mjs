/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['gravatar.com'],
    },
    assetPrefix: process.env.REACT_APP_ENV === 'development' ?
        'http://localhost:8080/admin-static' :
        'http://84.46.241.251:8080/admin-static',
};

export default nextConfig;
