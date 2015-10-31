// app-client.js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory()

import App from './components/App'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NoMatch from './pages/NoMatch'

const routes = (
  <Router history={ history }>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="contact" component={Contact}/>
      <Route path="*" component={NoMatch}/>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
)

var app = document.getElementById('app')

render(routes, app)