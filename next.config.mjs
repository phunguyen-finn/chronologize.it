/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'en.wikipedia.org',
                port: '',
                pathname: '/**',
            }
        ],
        unoptimized: true,
    },
};

export default nextConfig;
