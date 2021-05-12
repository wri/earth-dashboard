require('dotenv').load();

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const { BundleAnalyzerPlugin } = (process.env.ED_NODE_ENV === 'production' && process.env.BUNDLE_ANALYZER) ?
  require('webpack-bundle-analyzer') : {};

module.exports = {
  env: {
    ED_NODE_ENV: process.env.ED_NODE_ENV || 'development',
    APPLICATIONS: 'earthhq',
    CALLBACK_URL: process.env.CALLBACK_URL,
    WRI_API_URL: process.env.WRI_API_URL,
    API_ENV: process.env.API_ENV,
    RW_GOGGLE_API_TOKEN_SHORTENER: process.env.RW_GOGGLE_API_TOKEN_SHORTENER,
    NEXTAUTH_URL: 'https://earthhq.org'
  },

  experimental: { documentMiddleware: true },

  webpack: (config, { webpack, isServer }) => {
    const _config = Object.assign({}, config);

    _config.node = {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    };

    _config.module.rules.push({
      loader: 'webpack-glsl-loader',
      test: /\.glsl$/
    });

    _config.externals = Object.assign(_config.externals,{
      cesium: 'Cesium',
    });

    // CESIUM JS configuration
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(
                __dirname,
                'node_modules/cesium/Build/Cesium/Workers'
              ),
              to: '../public/Cesium/Workers'
            },
            {
              from: path.join(
                __dirname,
                'node_modules/cesium/Build/Cesium/ThirdParty'
              ),
              to: '../public/Cesium/ThirdParty'
            },
            {
              from: path.join(
                __dirname,
                'node_modules/cesium/Build/Cesium/Assets'
              ),
              to: '../public/Cesium/Assets'
            },
            {
              from: path.join(
                __dirname,
                'node_modules/cesium/Build/Cesium/Widgets'
              ),
              to: '../public/Cesium/Widgets'
            }
          ]
        })
      );
    }
    _config.plugins.push(new webpack.DefinePlugin({ CESIUM_BASE_URL: JSON.stringify('/Cesium') }));

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
