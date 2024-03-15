const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

/** @type {import('webpack').Configuration} **/
/** @type {import('webpack-dev-server').Configuration} **/

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|\.webpack/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
};

module.exports = merge(commonConfig, prodConfig);
