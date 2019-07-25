const path = require("path");
// https://webpack.js.org/guides/author-libraries/
module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public",
    watchContentBase: true,
    host: "0.0.0.0", //your ip address
    port: 8080,
    https: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "3d-image.js",
    path: path.resolve(__dirname, "dist"),
    libraryExport: "default",
    library: "Image3D",
    libraryTarget: "umd"
  }
};
