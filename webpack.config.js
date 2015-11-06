// webpack.config.js
module.exports = {
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