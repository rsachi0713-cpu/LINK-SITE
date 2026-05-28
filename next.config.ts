import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg', '@prisma/pg-worker', '@prisma/adapter-pg-worker'],
  webpack: (config) => {
    config.externals.push('cloudflare:sockets');
    return config;
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
