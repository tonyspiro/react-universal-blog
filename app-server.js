// app-server.js
import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config.js'

import AppClient from './components/AppClient'

// components
class AppServer extends Component{
  render(){
    return (
      <html>
        <head>
          <title>This is a test...</title>
        </head>
        <body>
          server
          <div id="app">
            <AppClient />
          </div>
          <script src="/dist/bundle.js"></script>
        </body>
      </html>
    )
  }  
}

const app = express();

app.use('/dist', express.static(__dirname + '/dist'));

if(process.env.NODE_ENV === 'development'){

  const compiler = webpack(config);

  new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true
  }).listen(3000, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:3000');
  });

} else {
  
  app.get('*', function(req, res) {
    var markup = React.renderToStaticMarkup(<AppServer />)
    res.send('<!doctype html>' + markup);
  });
  
  app.listen(3000);
  console.log('Listening at localhost:3000');

}