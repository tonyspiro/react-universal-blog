// app-server.js
import React from 'react'
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
import { getStore } from './actions/actions'

// Main component
import App from './components/App'

// Pages
import Blog from './pages/Blog'
import Work from './pages/Work'
import Default from './pages/Default'
import NoMatch from './pages/NoMatch'

// Store
import AppStore from './stores/AppStore'

// Express
const app = express()
app.engine('html', hogan)
app.set('views', __dirname + '/public')
app.use('/dist', express.static(__dirname + '/public/dist'))
app.set('port', (process.env.PORT || 3000))

if(constants.DEV){

  // Development mode
  const compiler = webpack(config)
  new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true
  }).listen(app.get('port'), 'localhost',(err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Listening at localhost:%s in development mode', app.get('port'))
    }
  })

} else {

  // Production mode
  app.get('*',(req, res) => {

    getStore(AppStore, function(err, Store){
      
      const routes = (
        <Route path="/" data={AppStore.data} component={App}>
          <Route path="about" component={Default}/>
          <Route path="contact" component={Default}/>
          <Route path="work" component={Work}/>
          <Route path="/work/:slug" component={Work}/>
          <Route path="/blog/:slug" component={Blog}/>
          <IndexRoute component={Blog}/>
          <Route path="*" component={NoMatch}/>
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
  
  app.listen(app.get('port'))
  console.log('Listening at localhost:%s in production mode', app.get('port'))

}