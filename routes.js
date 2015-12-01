// routes.config.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Store
import AppStore from './stores/AppStore'

// Main component
import App from './components/App'

// Routes
import Blog from './components/routes/Blog'
import Work from './components/routes/Work'
import Default from './components/routes/Default'
import NoMatch from './components/routes/NoMatch'

export default (
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