# House Keeping in the Dist Folder | clean-webpack-plugin | 07

This plugin isn't nesseary but is recomended to keep the dist folder organized. Since we're contantlt using webpack to build bundles from our src directory, everytime we make changes or add resorces such as new files, images, fonts, etc. to src, a new resources will get generated in the dist folder. If we decided that no longer need any of those resorces and delete them from src, they will remain in the dist folder.

The clean-webpack-plugin solves this issue: According to the [docs](https://www.npmjs.com/package/clean-webpack-plugin)

> By default, this plugin will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.

## Instalation

    npm install --save-dev clean-webpack-plugin

Then add the plugin to webpack.config.js as shown below:

    //  inside webpack.config.js

    module.exports = {
      mode: "development",
      entry: "./src/index.ts",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.bundle.js",
      },
      module: {
        rules: [
          ...
          { test: /\.txt?/, use: "raw-loader" },
          ..
        ]
      }

      //  ADD CleanWebpackPlugin BELOW in the plugins array

      plugins: [
        new HtmlWebpackPlugin({template: 'src/html/index.html'}),
        new CleanWebpackPlugin()
      ],

      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
    };

Now run:

    npm run webpack

If there are any un-used files in the dist folder, the will get removed everytime you rebundle webpack.

