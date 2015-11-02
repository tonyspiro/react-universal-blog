// app-client.js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory()

// Main component
import App from './components/App'

// Pages
import Blog from './pages/Blog'
import Work from './pages/Work'
import Default from './pages/Default'
import NoMatch from './pages/NoMatch'

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

var app = document.getElementById('app')

render(routes, app)