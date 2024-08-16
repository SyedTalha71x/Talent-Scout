/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com'

            },
            {
                protocol: 'https',
                hostname: 'readymadeui.com'
            },
            {
                protocol: 'https',
                hostname: 'pagedone.io'
            },
            {
                protocol: 'https',
                hostname: '1000logos.net'
            }
        ]
    }
};

export default nextConfig;
