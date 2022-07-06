# Handle Sass files | sass-loader sass

We need to install sass and sass-loader. For more info on sass-loader, see the [docs](https://www.npmjs.com/package/sass-loader) In the terminal run:

    npm install sass-loader sass --save-dev

Let's start by adding the adding sass-loader to our rules array in webpack.config.js .

    //inside webpack.config.js

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

          //  Adding sass-loader bellow:

              {
                test: /\.s[ac]ss$/i,
                use: [{ loader: "style-loader" }, {loader: "css-loader" }, {loader: "sass-loader" }],
              },

            ]
          }}

Next, **rename your global stylesheet** ending in **.css to .scss**. For this example, my _src/style/input.css_ will get renamed to _isrc/style/input.css_.

![set up](./src/images/sass-loader-rename-file.png?raw=true "Optional Title")

Since this file is imported into src/index.ts for so that webpack can bundle it, we'll need to also rename the file src/index.ts as well :

    //inside src/index.ts
    import { pack, someFunction } from "./js/constants";

    import "./style/input.scss"; // CHANGE THE IMPORT HERE

    import img from "./images/webpack-icon.png";

    function Component() {
      const docFragment = document.createDocumentFragment();
      ...
    }

To Summarize, what we've done so far, we have:

- added the loader setup to the rules array in webpack.config.js
- renamed src/style/input.css to src/style/input.scss
- renamed the import of input.scss into src/index.ts

it'd would be a good idea to check that we've installed everything correctly. In the terminal run:

    npm run webpack

If the previous styling in the browser didn't change, it means that we've succesfully added sass-loader. If they did change or you get an error, check syntax, spelling, references to relative paths, etc.

Assuming there are no erros, we'll want to confirm that we can _use_ sass. The easiest way to check is to see if any sass syntax registers with webpack is, to use a nested selector that will apply style changes for an element.

Let's do that by adding another element to the DOM by creating it in src/index.ts . We'll use a nested selector from sass syntax on the element we're about to create.

Below are the changes made in src/index.ts that create our new h2 element:

![set up](./src/images/sass-loader-create-new-el.png?raw=true "Optional Title")

Above, we simply created a sub-title h2 element with some text in it then append it to the wrapper div.

Next, open src/style/input.scss add the following sass selector for h2:

    // inside src/style/input.scss
    body:{
      background: black;
      color: white;
    }
    ...

    .wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      // Sass selector for h2
      & h2 {
        color: red;
      }

    }

    ...

This will simply select our h2 child element from the div with the class of .wrapper . Make sure to rebundle webpack in the terminal by running:

    npm run webpack

As you can see below, this will result in changing the color of the h2 to red.

![set up](./src/images/sass-loader-nested-selector.png?raw=true "Optional Title")

I'm going to remove the styling we just added since we've verified that sass selectors are woring.

## Additional Verificiation for @use

Another critical feature from sass is the ability to load rules, mixins, and variable from other Sass style sheets. Here's more info on [@use](https://sass-lang.com/documentation/at-rules/use) if you're interested. On a side note, @use is the current version of @import which will get phased out eventually in the next couple of years.

Let's start by adding a className to the h2 sub-title element we recently created. Here, I've given the h2 element the className of _from-a-different-sass-file_ as shown below:
![set up](./src/images/sass-loader-add-className.png?raw=true "Optional Title")

Next, we need to create a new sass stylesheet in src/style. For this example, the new sass stylesheet is called _different-sass-file.scss_.

Inside _different-sass-file.scss_, we'll just create a new class with the same name of the stylesheet then, assign the font color for this class like so:

    //  inside src/style/different-sass-file.scss

    .from-a-different-sass-file {
      color: light grey;
    }

Afterwards, we'll need to import the styling class we created in src/style/from-a-different-sass-file.scss into src/style/input.scss. This is done using @use provided by sass inside src/style/index.ts. It's recommended to place @use at the top of the file. According to the [docs](https://sass-lang.com/documentation/at-rules/use):

> A stylesheet’s @use rules must come before any rules other than @forward, including style rules. However, you can declare variables before @use rules to use when configuring modules.

The @use should be implemented like so:

    // inside src/style/input.scss

    @use "different-sass-file";

    body {
      background: black;
      color: white;
    }

    ...

We're going to verify that @use is allowing us to apply styles from a different stylesheet. We'll do that by adding a nested class for .different-sass-file to the .wrapper class as shown below :

    // inside src/style/input.scss
    @use "different-sass-file";

    body {
      background: black;
      color: white;
    }
    ...
    @font-face {
      font-family: "Adistro";
      src: url(.././fonts/Adistro.otf) format("opentype");
    }

    .wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      // Here is the styling we will add

      .different-sass-file {
        font-family: "Adistro";
        font-size: 3rem;
      }
    }
    ...

Finally to apply our changes, recomplie by running in the terminal:

    npm run webpack

We see that both styles from src/style.iput.scss and from src/style/different-sass-file-scss are applied to the html mark up.
![set up](./src/images/sass-loader-use.png?raw=true "Optional Title")

