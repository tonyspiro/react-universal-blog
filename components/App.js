// App.js
import React, { Component } from 'react'
import Shorti from 'shorti'
import Header from './Header'
import { getBucket } from '../actions'

// Utilities
import AppStore from '../stores/AppStore'
import AppDispatcher from '../dispatcher/AppDispatcher'

const getAppState = () => {
  return AppStore
}

export default class App extends Component {
  
  _onChange() {
    this.setState(getAppState())
  }

  constructor(){
    super()
    
    let _this = this
    
    // API data
    AppDispatcher.dispatch({
      action: 'init-app'
    })

  }

  // Add change listeners to stores
  componentDidMount() {
    AppStore.addChangeListener(this._onChange.bind(this))
  }

  // Remove change listeners from stores
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this))
  }

  render(){

    let bucket = AppStore.bucket
    let objects = bucket.objects
    let objects_html
    let container_style__default = Shorti('w-100p h-100 bw-1 solid bc-444 p-30 mb-20 mr-2 box')
    
    if(objects){
      objects_html = objects.map(object=> <div key={object._id} style={container_style__default}>{ object.title }</div>)
    }

    return (
      <div>
        <Header dev={ this.props.dev }/>
        { objects_html }
      </div>
    )
  }
}