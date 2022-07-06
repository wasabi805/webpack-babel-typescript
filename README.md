# Set up html-webpack-plugin | 06

According to the [docs](https://webpack.js.org/plugins/html-webpack-plugin/):

> The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles

## Why do we need this plugin?

In regards to this repo, we'll use features from HtmlWebpackPlugin to generate an index.html for our dist folder that are generated from a template index.html file located in src/html. Consider that we've already specified the entry point within webpack.config.js for our javascript. In the previous section above for _Install ts-loader_, the changes we made to webpack.config.js are:

    // inside webpack.config.js

    module.exports={
          mode: 'development',
          entry: './src/index.ts',
          output: {
            path: path.resolve(__dirname, "dist"),
            filename: "main.bundle.js",
          }
    }
    ...

Since we've set entry = _'./src/index.ts'_ and _output.path = path.resolve(\_\_dirname, "dist")_ what we are saying that we want wepack to bundle our src/index.ts file and once it's completed creating the bundled copy, place it in the dist folder.

## The need for this html-webpack-plugin

Currently, we do not have the same type of process to bundle and include our src/html/index.html into the dist folder. Since more than likely, dist is gitignored, anytime this branch is cloned, it wil not have an index.html. Setting up HtmlWebpackPlugin will make sure that an index.html exists when this branch is cloned.

## Instalation

    npm install --save-dev html-webpack-plugin

Next, modify webpack.config.js to include HtmlWebpackPlugin as a plugin. [see the docs](https://webpack.js.org/plugins/html-webpack-plugin/)

    // inside webpack.config.js

    const HtmlWebpackPlugin = require('html-webpack-plugin');   <----- 1.) make sure to require HtmlWebpackPlugin
    const path = require('path');

    module.exports = {
      entry: 'index.js',
      output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
      },

    plugins: [new HtmlWebpackPlugin(        <----- 2.) add the plugin to the plugins array
      {template: 'src/html/index.html',     <----- 3.) include a template key with a value for the path to our souce index.html
      filename: './src/html/index.html'     <----- 4.) include a filename key with a value for the path to our outputindex.html location in dist
      }
    )],
    };

We'll need to make sure now that we've specified that our index.html template it exists. If it does not exist create the directory with a generic html doc inside. It should look something like this:

    //inside src/html.index.html

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Webpack-TypeScript-Tailwind</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>

      </body>
    </html>

Now rebuild webpack to verify that an index.html gets generated into our dist folder by running:

    npm run webpack

You should now see a new index.html file show up in the dist folder as shown below:
![set up](./src/images/html-webpack-plugin-destination.png?raw=true "Optional Title")

Something worth point out is that if there are any script tags within our source index.html that reference dist/main.bundle.js, remove the script. As shown below, now that we have HtmlWebpackPlugin installed, it will automatically include the bundle containing the index.html from dist that we want to display: Any additional script tags from the source index.html will result in rending index.html from dist twice.

![set up](./src/images/html-webpack-plugin-generated-script-tag.png?raw=true "Optional Title")

