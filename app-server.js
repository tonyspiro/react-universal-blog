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
import constants from './config/constants'

// Actions
import { getObjects } from './actions/actions'

// Main component
import App from './components/App'

// Pages
import Blog from './pages/Blog'
import Work from './pages/Work'
import Default from './pages/Default'
import NoMatch from './pages/NoMatch'

import AppStore from './stores/AppStore'

const routes = (
  <Route path="/" component={App}>
    <Route path="/" component={App}>
      <Route path="about" component={Default}/>
      <Route path="contact" component={Default}/>
      <Route path="work" component={Work}/>
      <Route path="/work/:slug" component={Work}/>
      <Route path="/blog/:slug" component={Blog}/>
      <IndexRoute component={Blog}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Route>
)

// Express
const app = express()
app.use('/dist', express.static(__dirname + '/public/dist'))

if(constants.DEV){

  // Development mode
  const compiler = webpack(config)
  new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true
  }).listen(3000, 'localhost',(err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Listening at localhost:3000 in development mode')
    }
  });

} else {

  // Production mode
  app.get('*',(req, res) => {

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    
      let header = 
        `<!DOCTYPE html>
          <html lang="en">

          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="">
            <meta name="author" content="">

            <title>React Blog</title>

            <!-- Bootstrap Core CSS -->
            <link href="/dist/css/bootstrap.min.css" rel="stylesheet">

            <!-- Custom CSS -->
            <link href="/dist/css/clean-blog.min.css" rel="stylesheet">
            <link href="/dist/css/cosmic-custom.css" rel="stylesheet">

            <!-- Custom Fonts -->
            <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
            <link href='http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
            <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

            <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
            <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
            <!--[if lt IE 9]>
              <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
              <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
            <![endif]-->
          </head>

          <body>

            <div id="app">`

      let body = ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)
      let footer = 

        `</div>

          <script src="/dist/js/jquery.min.js"></script>

          <script src="/dist/js/bootstrap.min.js"></script>

          <script src="/dist/js/clean-blog.min.js"></script>

          <script src="/dist/bundle.js"></script>

        </body>

        </html>`
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