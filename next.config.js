require('dotenv').load();

const { BundleAnalyzerPlugin } = (process.env.ED_NODE_ENV === 'production' && process.env.BUNDLE_ANALYZER) ?
  require('webpack-bundle-analyzer') : {};

module.exports = {
  env: {
    ED_NODE_ENV: process.env.ED_NODE_ENV || 'development',
    APPLICATIONS: 'earthhq',
    CALLBACK_URL: process.env.CALLBACK_URL,
    CONTROL_TOWER_URL: process.env.CONTROL_TOWER_URL,
    WRI_API_URL: process.env.WRI_API_URL,
    API_ENV: process.env.API_ENV,
    RW_GOGGLE_API_TOKEN_SHORTENER: process.env.RW_GOGGLE_API_TOKEN_SHORTENER,
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
