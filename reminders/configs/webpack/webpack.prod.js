const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const { ModuleFederationPlugin } = require("webpack").container;

/** @type {import('webpack').Configuration} **/
/** @type {import('webpack-dev-server').Configuration} **/

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/reminders/latest/",
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
      name: "reminders",
      filename: "remoteEntry.js",
      exposes: {
        "./RemindersApp": "./src/bootstrap",
      },
      shared: ["react", "react-dom"],
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
