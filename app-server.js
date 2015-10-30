// app-server.js
import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config.js'
import constants from './constants'

// Express
const app = express()
app.use('/dist', express.static(__dirname + '/dist'))

// Components
import App from './components/App'

if(constants.DEV){

  // Development mode
  const compiler = webpack(config)
  new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true
  }).listen(3000, 'localhost', function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log('Listening at localhost:3000 in development mode')
  });

} else {

  // Production mode
  app.get('*', function(req, res) {
    
    const header = `<html><head><title>Server Index</title></head><body><div id="app">`
    const markup = ReactDOMServer.renderToStaticMarkup(<App />)
    const footer = `<script src="/dist/bundle.js"></script></body></html>`
    res.send(header + markup + footer)
  
  })
  
  app.listen(3000)
  console.log('Listening at localhost:3000 in production mode')

}