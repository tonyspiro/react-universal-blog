// app-server.js
import React, { Component } from 'react'
import { match, RoutingContext, Route, IndexRoute, Link } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import path from 'path'
import express from 'express'
import hogan from 'hogan-express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config.js'
import constants from './config/constants'

// Actions
import { getStoreServer } from './actions/actions'

// Main component
import App from './components/App'

// Pages
import Blog from './pages/Blog'
import Work from './pages/Work'
import Default from './pages/Default'
import NoMatch from './pages/NoMatch'

import AppStore from './stores/AppStore'

// Express
const app = express()
app.engine('html', hogan)
app.set('views', __dirname + '/public')

app.use('/dist', express.static(__dirname + '/public/dist'))

if(constants.DEV){

  // Development mode
  const compiler = webpack(config)
  new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true
  }).listen(config.port.prod, 'localhost',(err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Listening at localhost:3000 in development mode')
    }
  })

} else {

  // Production mode
  app.get('*',(req, res) => {

    getStoreServer(AppStore, function(err, Store){
      
      const routes = (
        <Route path="/" data={AppStore.data} component={App}>
          <Route path="about" data={AppStore.data} component={Default}/>
          <Route path="contact" data={AppStore.data} component={Default}/>
          <Route path="work" data={AppStore.data} component={Work}/>
          <Route path="/work/:slug" data={AppStore.data} component={Work}/>
          <Route path="/blog/:slug" data={AppStore.data} component={Blog}/>
          <IndexRoute data={AppStore.data} component={Blog}/>
          <Route path="*" data={AppStore.data} component={NoMatch}/>
        </Route>
      )

      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      
        let reactMarkup = ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)
        
        res.locals.reactMarkup = reactMarkup

        if (error) {
          res.status(500).send(error.message)
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          res.status(200).render('index.html')
        } else {
          res.status(404).render('index.html')
        }
      })

    })
  })
  
  app.listen(config.port.prod)
  console.log('Listening at localhost:%s in production mode', config.port.prod)

}