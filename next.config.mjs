/** @type {import('next').NextConfig} */

import withBundleAnalyzer from "@next/bundle-analyzer";

const isAnalyzeEnabled = process.env.ANALYZE === "true";

const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "threadquest.twic.pics",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Prevent 'scrapers/' and 'dummy-data/' from being bundled
    if (!isServer) {
      config.resolve.alias["scrapers"] = false;
      config.resolve.alias["dummy-data"] = false;
    }
    return config;
  },
};

// Export the configuration using ES module syntax
export default isAnalyzeEnabled
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig;
