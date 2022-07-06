# Import Images and Fonts | file-loader | url-loader | 04

This will cover....

## Set up file-loader

Add file-loader and url-loader: [For more info on file-loader ](https://v4.webpack.js.org/loaders/file-loader/)

    npm install --save-dev style-loader file-loader

We'll need to have an image to import. Place an image in src/images.

Next import the image into src/index.ts like so:
![set up](./src/images/file-loader-import-image.png?raw=true "Optional Title")

it's worth noting you'll see the red squiggles under the path name. This is because a type for images hasn't been declared yet. We'll handle this later on.

Next, you need to add a rule for images in the the rules array by adding an object to the rules array. This object will:

- have a test key with a value of a file extentions associated with images.
- have a use key with a value of an array of objects

Each object will have a key of loader with the value equal to the name of the loader. Specfically for file-loader, we'll need to assign an output path so that it is included in the bundling process for webpack to distrubute the image to our index.html located in the dist folder. For more about outputPath, see the [doc](https://v4.webpack.js.org/loaders/file-loader/#outputpath)

Below are the changes mentioned above.

    {
      module.exports={
      mode: 'development',
      entry: './src/index.ts',
      output:{
      path: path.resolve(\_\_dirname, 'dist' ),
      filename: 'main.bundle.js',
    },
    module:{
      rules:[
        {test: /\.txt?/ , use: 'raw-loader'},

        {
          test: /\.(png|jpe?g|gif)$/i,
          use:[{
            loader: 'file-loader',

            options: {
              outputPath: 'src/images',       <----- Assign the output path to include images in the dist folder
              name: '[path][name].[ext]'      <----- give a name so that it doesn't show as a hash in the dist folder
            }
        },

        ...
      ]
        ...
    },
    }

Now that the file-loader configuation is set, we can generate the image file in the dist folder by rebuilding webpack. Run this in the terminal to rebuild webpack:

    npm run webpack

This should generate a new images directory inside the dist folder containing the image file as shown below:
![set up](./src/images/file-loader-dist-src-images.png?raw=true "Optional Title")

You may notice that although the dist/src/images succesfully auto generated, you see the following error below:
![set up](./src/images/error-file-loader-ts-for-images.png?raw=true "Optional Title")

This relates to the image type hasn't been declared as mentioned earlier. To declare a type we'll need to create a global.d.ts file in the root directory and declare a type inside that file. For more info on modules and the role of d.ts file check the [TypeScript docs](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules)

Inside the global.d.ts file declare the type for png extensions : [solution found here](https://stackoverflow.com/a/46629045/7857134)

    //inside global.d.ts
    declare module "*.png"{
        const value: any;
        export default value;
    }

This should satisfy TypeScript to allow you to import the the image without an error.

Finally rebuild webpack:

    npm run webpack

Setting up exports and imports for png image useage in another file is now complete. You should no longer see the red squiggles now that the type for png is declared. Repeat this process for jpg,jpeg, tiff, etc. if you plan on using other image file types.

![set up](./src/images/file-loader-import-error-resolved.png?raw=true "Optional Title")

# Set up url-loader

npm install --save-dev style-loader url-loader

Once installed, configure the rules for this loader in webpack:

    //inside webpackconfig.js

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
                  test: /\.(woff|woff2)$/i,
                  loader: 'url-loader'
                },
            ]}
            ...
    }

Next, we'll need to download a custom font and add it in our project. In the src directory, I simply made a fonts folder where I place the custom font.

![set up](./src/images/ur-loader-fonts-dir.png?raw=true "Optional Title")

In order to use that font, use the CSS at rule inside the global css file. The global css file for this project is located in src/style/input.css Make sure to make a relative path reference to the font and include the font format.

![set up](./src/images/url-loader-font-face.png?raw=true "Optional Title")

Then in the class where the font is used, include css attr of 'font-family' and make its value the font name;

![set up](./src/images/url-loader-font-family.png?raw=true "Optional Title")

Add the class to the h1 containing the text we ant to apply our custom font to. We'll do this through the src/index.ts file. Then in the terminal, re-bundle webpack by running:

    npm run webpack

![set up](./src/images/url-loader-apply-class.png?raw=true "Optional Title")

see: https://www.robinwieruch.de/webpack-font/
[for later Babel vs Webpack ](https://dev.to/getd/wtf-are-babel-and-webpack-explained-in-2-mins-43be)
