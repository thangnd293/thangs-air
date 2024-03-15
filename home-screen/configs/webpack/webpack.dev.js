const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const { ModuleFederationPlugin } = require("webpack").container;
const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");
const packageJson = require("../../package.json");

/** @type {import('webpack').Configuration} **/
/** @type {import('webpack-dev-server').Configuration} **/

const devConfig = {
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
    clean: true,
  },
  stats: "errors-warnings",
  devtool: "cheap-module-source-map",
  devServer: {
    port: 2509,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|\.webpack/,
        use: {
          loader: "ts-loader",
          options: {
            getCustomTransformers: () => ({
              before: [ReactRefreshTypeScript()],
            }),
            transpileOnly: true,
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: true,
    }),
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        app1: "app1@http://localhost:2510/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
