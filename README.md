# Set up Styles and CSS Loader | style-loader | css-loader | 03

- 1.) Install style and css loaders

  npm install --save-dev style-loader css-loader

- 2.) In webpack.config.js, add loader configuation in the rules array

      //inside webpack.config.js

      module.exports={
          mode: 'development',
          entry: './src/index.ts',
          output:{
              path: path.resolve(__dirname, 'dist' ),
              filename: 'main.bundle.js',
          },
          module:{
              rules:[
                  {test: /\.txt?/ , use: 'raw-loader'},

                  {
                      test: /\.tsx?$/,
                      use: 'ts-loader',
                      exclude: /node_modules/,
                  },

                  {
                      test: /\.css$/i,
                      use: ["style-loader", "css-loader"],
                  },
              ]
          },
          resolve: {
              extensions: ['.tsx', '.ts', '.js'],
          },
      }

- 3.)import the css file into the main index.ts file so that webpack is aware it needs to handle css files.

//inside ./src/index.ts

    import { test } from './js/test'
    import "./style/input.css";

    function Component(){
            const element = document.createElement('div');
            element.innerHTML = ['Hello', 'webpack', test, 'hello again!!!!'].join(' ');
        return element;
    }

    document.body.appendChild(Component());

- 4.) Rebuild webpack

  npm run webpack

## Other Loaders | Reconfigure the rules

We'll need to reconfigure the object in the rules array because we need to be able to pass in "options" to loader.These options instruct that loader on tasks such as weather or not to process certain files as resources to provide for our html. If they **do** need to process the resource, the options values gives further granularity on how to do so. [For more info](https://webpack.js.org/concepts/loaders/#configuration)

For this example, I'll how configure css-loader to have th ability to handle the usage url() so that I can add a background image as the background of a div with the class of "logo".

The changes we'll make below simply are to:

- remove the strings names of the loader.
- replace the string name with an object in its place.
- give that object a key of loader with the value of string name of the loader we removed from the rules array.
- if we need to add options, we make a key of options whole value is an object.

Note about that last step: The keys will be specific to the particular loader so you'll probably need to look at the docs for that loader to figure out the options paramters to configure the loader.

The update we make below is what's recomended from [Webpack's Docs](https://webpack.js.org/concepts/loaders/#using-loaders)

//inside webpack.config.js

      module:{
          rules:[
              {test: /\.txt?/ , use: 'raw-loader'},

              {
                  test: /\.tsx?$/,
                  use: 'ts-loader',
                  exclude: /node_modules/,
                },

              // Previous Configuation : use array with strings as loaders
              //   {
              //     test: /\.css$/i,
              //     use: ["style-loader", "css-loader"],
              //   },

              // New Configuation : use array with seprate objects of seperate loaders
                {
                  test: /\.css$/i,
                  use:[{loader: 'style-loader'} ,{
                      loader: 'css-loader',
                      options: {
                          url: true,
                        },
                  }]
                }


          ]
      },

Above you can see that the use array is now an array of objects. Both those objects have a value of loader but one is for the style-loader and one is for the 'css-loader.

**Very important** , the order of the loaders matters since Webpack will start at the "end" first when it bundles since the loaders are chained. According to the [doc](https://webpack.js.org/concepts/loaders/#using-loaders) ;

> Loaders can be chained. Each loader in the chain applies transformations to the processed resource. A chain is executed in reverse order. **The first loader passes its result (resource with applied transformations) to the next one, and so forth** . Finally, webpack expects JavaScript to be returned by the last loader in the chain.

**The next important action** is to import the input.css (which is the global css stylesheet) into src/index.ts so that it will be included when webpack complies and bundles index.ts to include it in the dist folder.

![set up](./src/images/importCss-indexTs.png?raw=true "Optional Title")

I'll then go ahead and add the class name "logo" to the div I want the background image to appear in:

![set up](./src/images/divUsingCssUrl.png?raw=true "Optional Title")

and finally run:

    npm run webpack

The you should now be able to see the background image in the div with class "logo" like shown above.
