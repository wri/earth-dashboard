require("dotenv").config();

const { BundleAnalyzerPlugin } =
  process.env.ED_NODE_ENV === "production" && process.env.BUNDLE_ANALYZER ? require("webpack-bundle-analyzer") : {};

module.exports = {
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
    domains: ["imgs.mongabay.com"]
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
  },

  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/data/datasets",
        permanent: true
      },
      {
        source: "/admin/data",
        destination: "/admin/data/datasets",
        permanent: true
      }
    ];
  }
};
