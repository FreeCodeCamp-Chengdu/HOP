// Add Tailwind CSS support to Next.js
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },
  experimental: {
    esmExternals: true,
  },
};