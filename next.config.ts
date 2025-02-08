import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  output: 'standalone'
  // basePath: '/weather'                                                                                                                                                                                                                                                        
};

export default nextConfig;
