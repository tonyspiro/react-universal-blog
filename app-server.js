// app-server.js
import React from 'react'
import { match, RoutingContext, Route, IndexRoute } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import hogan from 'hogan-express'

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