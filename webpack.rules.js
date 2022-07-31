module.exports = [
  {
    test: /native_modules\/.+\.node$/,
    use: "node-loader",
  },
  {
    test: /\.s[ac]ss$/i,
    exclude: /\.module.(s(a|c)ss)$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.jsx?$/,
    use: {
      loader: "babel-loader",
      options: {
        exclude: /node_modules/,
        presets: ["@babel/preset-react"],
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
];
