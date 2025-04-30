/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.sanity.io'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push((context: any, request: string, callback: any) => {
        if (request.startsWith('./studio') || request.startsWith('studio')) {
          return callback(null, 'commonjs ' + request);
        }
        callback();
      });
    }
    return config;
  },
};

export default nextConfig;
