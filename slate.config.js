/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.extend': {
    resolve: {
      alias: {
        jquery: path.resolve('./node_modules/jquery'),
        'lodash-es': path.resolve('./node_modules/lodash-es'),
      },
    },
  },
  'webpack.extend': (config) => {
    return {
      resolve: {
        alias: {
          jquery: path.resolve('./node_modules/jquery'),
          'lodash-es': path.resolve('./node_modules/lodash-es'),
        },
      },
      plugins: [
        /**
         * Export svgs into snippets folder         
         */
        new CopyWebpackPlugin([
          {
            from: path.resolve(config.get('paths.theme.src'), 'icons'),
            ignore: ['.DS_Store'],
            to: `${config.get('paths.theme.dist.snippets')}/[name].liquid`,
          }
        ]),
      ],
    }
  },
  'webpack.postcss.plugins': (config) => {
    const plugins = [autoprefixer];

    // We only want to minify our CSS if we're building for production
    if (process.env.NODE_ENV === 'production') {
      plugins.push(cssnano(config.get('webpack.cssnano.settings')))
    }

    return plugins;
  },
};
