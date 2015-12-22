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

export default class App extends Component {
  
  // Add change listeners to stores
  componentDidMount(){
    AppStore.addChangeListener(this._onChange.bind(this))
  }

  // Remove change listeners from stores
  componentWillUnmount(){
    AppStore.removeChangeListener(this._onChange.bind(this))
  }

  getStore(){
    AppDispatcher.dispatch({
      action: 'get-app-store'
    })
  }

  _onChange(){
    this.setState(AppStore)
  }

  render(){
    
    const data = AppStore.data

    // Show loading for browser
    if(!data.ready){

      document.body.className = ''
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
