/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "medusa-public-images.s3.eu-west-1.amazonaws.com",
            "localhost",
            "medusa-server-testing.s3.amazonaws.com",
        ],
    },
}

module.exports = nextConfig
