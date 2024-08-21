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
            },
            {
                protocol: 'https',
                hostname: 'mailmeteor.com'
            },
            {
                protocol: 'https',
                hostname: 'marvel-b1-cdn.bc0a.com'
            },
            {
                protocol: 'https',
                hostname: 'media.designrush.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn0.iconfinder.com'
            }
        ]
    }
};

export default nextConfig;
