const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const cwd = process.cwd();

function createWebpackAliases(aliases) {
  const result = {};
  for (const name in aliases) {
    result[name] = path.join(cwd, aliases[name]);
  }
  return result;
}

/** @type {import('webpack').Configuration} **/
module.exports = {
  entry: "./src/main.ts",
  resolve: {
    extensions: [".js", ".ts", ".tsx", "..."],
    alias: createWebpackAliases({
      "@": "src",
      "@components": "src/components",
      "@assets": "src/assets",
      "@utils": "src/utils",
      "@hooks": "src/hooks",
    }),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
