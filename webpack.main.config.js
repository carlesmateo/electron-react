const plugins = require("./webpack.plugins");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: require("./webpack.rules"),
  },
  plugins: plugins.concat(
    new CopyPlugin({ patterns: [{ to: "main_window", from: "assets" }] })
  ),
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json", ".scss"],
  },
};
