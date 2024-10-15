/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
}

export const images = {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'assets.example.com',
            port: '',
            pathname: '/account123/**',
        },
    ],
}
   
export default nextConfig
