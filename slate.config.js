/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const styleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.extend': (config) => {
    return {
      resolve: {
        alias: {
          '@': path.resolve('src'),
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
        /**
         * Build notifications
         */
        new WebpackNotifierPlugin({
          skipFirstNotification: true,
          excludeWarnings: true,
          alwaysNotify: false,
        }),

        new styleLintPlugin({
          configFile: '.stylelintrc',
          context: path.resolve(config.get('paths.theme.src'), 'styles'),
          failOnError: false,
          quiet: false,
        })
      ],
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader", "eslint-loader"]
          },
          {
            test: /\.hbs$/,
            loader: "handlebars-loader"
          },
          {
            test: /\.svg$/,
            include: [
              path.resolve(config.get('paths.theme.src.assets'), 'static')
            ],
            loader: 'raw-loader'
          }
        ]
      }
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
