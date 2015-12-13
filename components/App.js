// App.js
import React, { Component } from 'react'

// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher'

// Store
import AppStore from '../stores/AppStore'

// Components
import Nav from './Partials/Nav'
import Footer from './Partials/Footer'
import Loading from './Partials/Loading'

// Pages
import Blog from './Pages/Blog'
import Work from './Pages/Work'
import Default from './Pages/Default'
import NoMatch from './Pages/NoMatch'

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
    
    const data = AppStore.data

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

    // Server first
    const Routes = React.cloneElement(this.props.children, { data: data })

    return (
      <div>
        <Nav data={ data }/>
        { Routes }
        <Footer data={ data }/>
      </div>
    )
  }
}
