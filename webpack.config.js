// webpack.config.js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  port: {
    prod: 3000,
    dev: 8080
  },
  devtool: 'eval',
  entry: './app-client.js',
  output: {
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