// webpack.config.js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: './app-client.js',
  output: {
    output: { path: __dirname + 'public', filename: 'dist/bundle.js' },
    filename: 'public/dist/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }]
  }
};