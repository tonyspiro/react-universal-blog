// app-client.js
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
const history = createBrowserHistory()

// Main component
import App from './components/App'

// Routes
import Blog from './components/routes/Blog'
import Work from './components/routes/Work'
import Default from './components/routes/Default'
import NoMatch from './components/routes/NoMatch'

const routes = (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="about" component={Default}/>
      <Route path="contact" component={Default}/>
      <Route path="work" component={Work}/>
      <Route path="/work/:slug" component={Work}/>
      <Route path="/blog/:slug" component={Blog}/>
      <IndexRoute component={Blog}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
)

const app = document.getElementById('app')
render(routes, app)