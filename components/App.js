// App.js
import React, { Component } from 'react'

// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher'

// Store
import AppStore from '../stores/AppStore'

// Components
import Nav from './partials/Nav'
import Footer from './partials/Footer'
import Loading from './partials/Loading'

// Pages
import Blog from './routes/Blog'
import Work from './routes/Work'
import Default from './routes/Default'
import NoMatch from './routes/NoMatch'

export default class App extends Component {
  
  _onChange() {
    this.setState(AppStore)
  }

  // Add change listeners to stores
  componentDidMount() {
    AppStore.addChangeListener(this._onChange.bind(this))
  }

  // Remove change listeners from stores
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this))
  }

  getStore(){
    AppDispatcher.dispatch({
      action: 'get-app-store'
    })
  }

  render(){
    
    // Server first
    let data = this.props.route.data
    
    if(!data){
      // Browser next
      // Doing this because I don't want all of the content in a pile of JS mush on the page
      data = AppStore.data
    }

    // Show loading for browser
    if(!data.ready){

      this.getStore()

      let style = {
        marginTop: 120
      }
      return (
        <div className="container text-center" style={ style }>
          <Loading />
        </div>
      )
    }

    let globals = data.globals
    let pages = data.pages
    let Routes = React.cloneElement(this.props.children, { data: data })

    return (
      <div>
        <Nav pages={ pages } globals={ globals }/>
        { Routes }
        <Footer globals={ globals }/>
      </div>
    )
  }
}
