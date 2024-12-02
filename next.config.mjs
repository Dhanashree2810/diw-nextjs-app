/** @type {import('next').NextConfig} */

export const reactStrictMode = true;

const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    domains: ['api-diw.wazl.in','diw.wazl.in','asset.wazl.in'],
  },
};

export default nextConfig;
