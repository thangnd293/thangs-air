const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const { ModuleFederationPlugin } = require("webpack").container;

/** @type {import('webpack').Configuration} **/
/** @type {import('webpack-dev-server').Configuration} **/

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/home-screen/latest/",
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
  plugins: [
    new ModuleFederationPlugin({
      name: "home-screen",
      remotes: {
        reminders: `reminders@${domain}/reminders/latest/remoteEntry.js`,
      },
      shared: ["react", "react-dom"],
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
