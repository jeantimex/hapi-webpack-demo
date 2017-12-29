'use strict';

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DEV = process.env.NODE_ENV !== 'production';

const config = {
  entry: ['./client/index.js'],
  devtool: DEV ? 'source-map' : '',
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    // Output our index.html and inject the script tag
    new HtmlWebpackPlugin()
  ]
};

if (DEV) {
  console.log('dev build adding webpack-hot-middleware for DEV environment');
  config.entry.push(`webpack-hot-middleware/client/?reload=true`);

  config.plugins.push(
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
  );
} else {
  console.log('production build adding UglifyJsPlugin plugin');
  // Minify JS for production
  config.plugins.push(
    new Webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
