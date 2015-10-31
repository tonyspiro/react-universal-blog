// app-server.js
import React, { Component } from 'react'
import { match, RoutingContext, Route, IndexRoute, Link } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config.js'
import constants from './constants'

import App from './components/App'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NoMatch from './pages/NoMatch'

const routes = (
  <Route path="/" component={App}>
    <Route path="about" component={About}/>
    <Route path="contact" component={Contact}/>
    <Route path="*" component={NoMatch}/>
    <IndexRoute component={Home}/>
  </Route>
)

// Express
const app = express()
app.use('/dist', express.static(__dirname + '/dist'))

if(constants.DEV){

  // Development mode
  const compiler = webpack(config)
  new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true
  }).listen(3000, 'localhost', function (err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log('Listening at localhost:3000 in development mode')
    }
  });

} else {

  // Production mode
  app.get('*', function(req, res) {
    
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      
      let header = `<!doctype html><html><head><title>Server Index</title></head><body><div id="app">`
      let body = ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)
      let footer = `</div><script src="/dist/bundle.js"></script></body></html>`
      let markup = header + body + footer

      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        res.status(200).send(markup)
      } else {
        res.status(404).send('Not found')
      }
    })
  
  })
  
  app.listen(3000)
  console.log('Listening at localhost:3000 in production mode')

}