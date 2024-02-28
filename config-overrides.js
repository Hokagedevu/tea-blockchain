const { override } = require("customize-cra");
const addLessLoader = require("customize-cra-less-loader");
const webpack = require('webpack');

function webConfig (config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "assert": require.resolve("assert"),
    "buffer": require.resolve('buffer'),
    "url": require.resolve("url"),
    "zlib": false
  })
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ])
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.unshift({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false, // disable the behavior
    },
  });
  return config;
}

module.exports = override(addLessLoader({
    cssLoaderOptions: {
      sourceMap: true,
      modules: {
        localIdentName: "[hash:base64:8]",
      },
    },
    lessLoaderOptions: {
      lessOptions: {
        strictMath: true,
      },
    },
}), webConfig)
