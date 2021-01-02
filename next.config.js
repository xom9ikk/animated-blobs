const path = require('path');
const WorkerPlugin = require("worker-plugin");
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const app = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new WorkerPlugin({
          globalObject: "self",
        })
      );
    }
    return config;
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
};

module.exports = withBundleAnalyzer(
  withPWA(
    app
  )
)
