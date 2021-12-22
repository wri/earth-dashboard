require("dotenv").config();

const { BundleAnalyzerPlugin } =
  process.env.ED_NODE_ENV === "production" && process.env.BUNDLE_ANALYZER ? require("webpack-bundle-analyzer") : {};

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  env: {
    ED_NODE_ENV: process.env.ED_NODE_ENV || "development",
    APPLICATIONS: "earthhq",
    CALLBACK_URL: process.env.CALLBACK_URL,
    WRI_API_URL: process.env.WRI_API_URL,
    GCA_API_URL: process.env.GCA_API_URL,
    API_ENV: process.env.API_ENV,
    RW_GOGGLE_API_TOKEN_SHORTENER: process.env.RW_GOGGLE_API_TOKEN_SHORTENER,
    NEXTAUTH_URL: "https://earthhq.org",
    NULL_SCHOOL_IFRAME_BASE: process.env.NULL_SCHOOL_IFRAME_BASE
  },

  images: {
    domains: ["imgs.mongabay.com", "content.jwplatform.com"]
  },

  eslint: {
    dirs: [
      "pages",
      "lib",
      "utils",
      "components",
      "config",
      "constants",
      "layout",
      "redactions",
      "selectors",
      "services",
      "slices"
    ]
  },

  experimental: { documentMiddleware: true },

  webpack: (config, { isServer }) => {
    const _config = Object.assign({}, config);

    if (!isServer) {
      _config.resolve.fallback.fs = false;
    }

    _config.module.rules.push({
      loader: "webpack-glsl-loader",
      test: /\.glsl$/
    });

    if (process.env.BUNDLE_ANALYZER) _config.plugins.push(new BundleAnalyzerPlugin());

    return _config;
  }
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
