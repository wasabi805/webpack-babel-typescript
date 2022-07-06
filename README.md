# Babel And Jest | 08

Before starting the set up, it wouldn't hurt to look over the docs for using [Typescript with jest](https://jestjs.io/docs/getting-started#using-typescript) to get a general idea of what we're trying to accomplish.

Babel [DOES NOT SUPPORT TypeScript out of the box](https://babeljs.io/docs/en/babel-core/#default_extensions). The following steps will allow babel support for TypeScript. The following steps will grant us the ability to make use of es6 functionality such as imports and exports of .ts files for things such as createing Jest test files later on.

## Instalation | Babel Set Up for TypeScript

    npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-typescript @babel/plugin-transform-typescript

[babel-preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript) and [babel-plugin-transform-typescript](https://babeljs.io/docs/en/babel-plugin-transform-typescript)

Next, create a [babel.config.json](https://babeljs.io/docs/en/usage#overview) in the root directory, then add '@babel/preset-env' and @babel/preset-typescript to the presets array as shown below: [see](https://jestjs.io/docs/getting-started#using-typescript)

      //inside babel.config.json

      module.exports = {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
        ],
      };

FYI, If this step above isn't completed or '@babel/preset-env', '@babel/preset-typescript' are missing for the presets array, you will encounter [this error](https://drive.google.com/file/d/165ZryS-0YmuvNp_jEPv4c6LZZ6bfsoVS/view?usp=sharing)when trying to run jest tests later on.

The [order of listed presets matters](https://babeljs.io/docs/en/presets/) as they opperate last to first.

## Configure Loaders | Babel Set Up

Now that we've set up the presets in babel.config.js we'll continue by [adding the babel-loader in webpack.config.js ](https://webpack.js.org/loaders/babel-loader/#usage)

      // inside webpack.config.js

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
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,

            //  ADD babel-loader HERE
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins:['@babel/preset-typescript'],
              }
            }
          }
          ...
        ]
      }
      }


      ///JEST INSTRUCTIONS START HERE:

## Installation | Jest set up for Typescript

This portion of the instalation process covers our changes made to the webpack configurations to handle assest importanted into our index.ts. This is nessesary since index.ts is parsed by Jest when index.ts is imported into a jest test file.

We'll need to install a few more things:

    npm i jest jest-environment-jsdom jest-cli @types/jest

- jest-environment-jsdom provides a test environment for Jest to test DOM events
- jest-cli just allows us to run jest commands in the terminal.
- @types/jest allows TypeScript to understand types in Jest

We'll need jest-environment-jsdom to be able to test events that occur in the DOM such as things like clicking buttons and testing their actions. According to the :

> jsdom and the jest-environment-jsdom package simulate a DOM environment as if you were in the browser. This means that every DOM API that we call can be observed in the same way it would be observed in a browser!

Once you've installed the packages from above, add "jest" to package.json. We'll specify the transform value to [allow Jest to parse Typescript syntax](https://jestjs.io/docs/code-transformation). Also we need to define [testEnvivornment as jsdom](https://jestjs.io/docs/tutorial-jquery) so that jest can handle DOM events as mentioned earlier.

      // inside package.json:
      {
      ...
        "jest": {
          "transform": {
            "^.+\\.[t|j]sx?$": "babel-jest"
          },
          "testEnvironment": "jsdom",
        },
      ...
      }

# Jest Set up for Testing | Test Folder Structure

- In package.json add a script to run jest tests:

      //inside pacakage.json:
      {
      ...
        "scripts": {
          "webpack": "npx webpack ",
          "typescript": "tsc",
          "format": "npx prettier --write .",

          // ADD jest to script
          "test": "jest",

      },
      ...
      }

- In the root directory, create a folder named "\_\_tests\_\_"
- Inside that "\_\_tests\_\_" directory, create two more directories: one name "stubs" and the other named "unit"

- Inside the "stubs" directory, create a file named images.js and inside images.js, add the following code:

      //  inside \__tests__/stubs/images.js

      module.exports = {

      };

- Inside the "stubs" directory, create a file named styles.js and inside styles.js, add the following code:

      //  inside \__tests__/stubs/styles.js

      module.exports = {

      };

What we've done here is [define the mock/stub](https://jestjs.io/docs/webpack#handling-static-assets) according to Jest documentation. We'll continue on with making a simple unit test.

- Inside the "\_\_tests\_\_/unit" directory create a file called "index.test.ts" . It's worth noting that I've chosen to name this file index.test.ts for this project. This file could also be very well named something Component.test.ts or someOtherName.test.ts. The important part is that whatever name is chosen, the name is proceded by ".test.ts" . **This is so that jest knows to only run tests on files that end in "test.ts"**

- In "\_\_test\_\_/unit/index.test.ts", write a simple test:

      // insideside "\__test__/unit/index.test.ts"

      describe('test', ()=>{
          it('tests that 1 + 1 is equal to 2',()=>{
              expect(1+1===2).toBe(true)
          })

          it('tests that 4 divided by 2 is equal to 2',()=>{
              expect(4/2 ===2).toBe(true)
          })
      })

Below is to recap what our file structure should look like:
![set up](./src/images/jest-tests-dir-set-up.png?raw=true "Optional Title")

We can test that Jest is working properly based off the simple test we created in "\_\_tests\_\_/unit/index.test.ts"

At this point let's confirm that jest in hook eup correctly. In the terminal run:

    npm run test

we should be able to see:
![set up](./src/images/jest-confirmed-pass.png?raw=true "Optional Title")

# Jest Set up for Styling and Images | moduleNameMapper

Previously, we confirmed that Jest is working with our simple test however, if we we're to import src/index.ts into this file, we would see some Jest errors since we haven't configured Jest to handle situations where it encounters other assest such as styles and images we've imported into src/index.ts. [see](https://stackoverflow.com/a/54646930/7857134) and the [docs for handling static assets](https://jestjs.io/docs/webpack#handling-static-assets)

To remedy this, well need to mock/stub stying and images since Jest is primarly concerned with only testing typescript and javascript functionality.

Next, we'll stub out the styles and images. Make the following changes in package.json by updating the update the [moduleNameMapper](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring) key our jest configuation to assign a path to the stubs:

      // inside package.JSON
      {
        "jest": {
          "transform": {
            "^.+\\.[t|j]sx?$": "babel-jest"
          },
          "testEnvironment": "jsdom",

          // ADD path to the stubs

          "moduleNameMapper": {
            "\\.(css|less|scss)$": "<rootDir>/__tests__/stubs/styles.js",
            "\\.(png|jpg|jpeg)$": "<rootDir>/__tests__/stubs/images.js"
          },
        }
      }

Next, we'll need to let Jest know to only run tests on files that have ".test.ts" in their filename : we do this by adding a "testMatch" key to the jest configuations in package.json. The value for "testMatch" is a regex match for specifiying the .test.ts prefix. FYI, if this step is not done, then Jest will include out stubs as tests and those tests will fail. You'll see a measage like:

        FAIL  __tests__/stubs/images.js
          ● Test suite failed to run

            Your test suite must contain at least one test.

In order to get jest to ingnore files that aren't tests and resolve this error, we'll need to update package.JSON to ignore it.

      //inside package.json

        {
          "jest": {
          "transform": {
            "^.+\\.[t|j]sx?$": "babel-jest"
          },
          "testEnvironment": "jsdom",
          "moduleNameMapper": {
            "\\.(css|less|scss)$": "<rootDir>/__tests__/stubs/config.js",
            "\\.(png|jpg|jpeg)$": "<rootDir>/__tests__/stubs/images.js"
          },

            //  ADD THIS TO THE JEST CONFIGS in package.JSON
          "testMatch": [ "**/?(*.)+(test).[jt]s?(x)" ]
        },
        }

So now that our Jest configuation is set up, we can test weather or not we can successfully import a Typescript file into a Jest file.

To confirm our configuration changes were succesfull, import the file from src/index.ts into "\_\_tests\_\_/unit/index.test.ts". We'll also add a console.log for our import as shown below

Now run:

     npm run test

We can conclude from our Jest set up :

- Jest file encountered no issues with importing src/index.ts : No issues encountered due to the static assets imported into src/index.ts.
- The simple tests passed
- Jest understood the type for our imported src/index.ts file.
- No additional tests were created with the inclusion of the stubs directory into the \_\_tests\_\_ directory

![set up](./src/images/jest-confirm-import-works.png?raw=true "Optional Title")

