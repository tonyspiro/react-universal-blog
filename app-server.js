// app-server.js
import React from 'react'
import { match, RoutingContext, Route, IndexRoute } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import hogan from 'hogan-express'
import config from './config'

// Actions
import { getStore, getPageData } from './actions/actions'

// Routes
import routes from './routes'

// Express
const app = express()
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.use('/', express.static(__dirname + '/public/'))
app.set('port', (process.env.PORT || 3000))

app.get('*',(req, res) => {

  getStore(function(err, AppStore){

    if(err){
      return res.status(500).end('error')
    }

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      
      // Get page data for template
      const slug_arr = req.url.split('/')
      let page_slug = slug_arr[1]
      let post_slug
      if(page_slug === 'blog' || page_slug === 'work')
        post_slug = slug_arr[2]
      getPageData(page_slug, post_slug)
      const page = AppStore.data.page
      res.locals.page = page
      res.locals.site = config.site

      // Get React markup
      const reactMarkup = ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)
      res.locals.reactMarkup = reactMarkup

      if (error) {
      
        res.status(500).send(error.message)
      
      } else if (redirectLocation) {
        
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)

      } else if (renderProps) {
        
        // Success!
        res.status(200).render('index.html')
      
      } else {
        
        res.status(404).render('index.html')
      
      }
    })

  })
})

app.listen(app.get('port'))

console.info('==> ✅  Server is listening in ' + process.env.NODE_ENV + ' mode')
console.info('==> 🌎  Go to http://localhost:%s', app.get('port'))
