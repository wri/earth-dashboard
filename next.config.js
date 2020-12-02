require('dotenv').load();

const { BundleAnalyzerPlugin } = (process.env.NODE_ENV === 'production' && process.env.BUNDLE_ANALYZER) ?
  require('webpack-bundle-analyzer') : {};

module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    APPLICATIONS: 'earthhq',
    BASEMAP_TILE_URL: process.env.BASEMAP_TILE_URL,
    CALLBACK_URL: process.env.CALLBACK_URL,
    CONTROL_TOWER_URL: process.env.CONTROL_TOWER_URL,
    WRI_API_URL: process.env.WRI_API_URL,
    STATIC_SERVER_URL: process.env.STATIC_SERVER_URL,
    BING_MAPS_API_KEY: process.env.BING_MAPS_API_KEY,
    API_ENV: process.env.API_ENV,
    RW_GOGGLE_API_TOKEN_SHORTENER: process.env.RW_GOGGLE_API_TOKEN_SHORTENER,
    BITLY_TOKEN: process.env.BITLY_TOKEN,
    NEXTAUTH_URL: 'https://earthhq.org'
  },

  experimental: {
    documentMiddleware: true
  },

  webpack: (config) => {
    const _config = Object.assign({}, config);

    _config.node = {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    };

    if (process.env.BUNDLE_ANALYZER) _config.plugins.push(new BundleAnalyzerPlugin());

    return _config;
  },

  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/data/datasets',
        permanent: true
      },
      {
        source: '/admin/data',
        destination: '/admin/data/datasets',
        permanent: true
      }
    ];
  }
};
