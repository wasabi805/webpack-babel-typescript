const path = require("path");
<<<<<<< HEAD
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
=======
>>>>>>> 003e294975254b01034dc5a731f1a682d3468800
const _ = require("lodash");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
  module: {
    rules: [
      { test: /\.txt?/, use: "raw-loader" },

      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },

      {
        test: /\.(woff|woff2)$/i,
        loader: "url-loader",
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "src/images",
              name: '[path][name].[ext]',
            },
          },
        ],
      },

      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              url: true,
            },
          },
        ],
      },
    ],
  },
<<<<<<< HEAD
  plugins: [
    new HtmlWebpackPlugin({ template: "src/html/index.html" }),
    new CleanWebpackPlugin(),
  ],
=======
>>>>>>> 003e294975254b01034dc5a731f1a682d3468800
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
