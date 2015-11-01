// AppClient.js
import React, { Component } from 'react'
import Shorti from 'shorti'
import Nav from './Nav'
import { getBucket } from '../actions/actions'

// Utilities
import AppStore from '../stores/AppStore'
import AppDispatcher from '../dispatcher/AppDispatcher'

export default class App extends Component {
  
  _onChange() {
    this.setState(AppStore)
  }

  constructor(){
    
    super()
    
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

  handleClick(e){
    console.log(e.target.dataset.id)
  }

  render(){
    let data = AppStore.data
    let objects = data.bucket.objects
    let objects_html
    let container_style__default = Shorti('w-100p h-100 bw-1 solid bc-444 p-30 mb-20 mr-2 box')

    if(objects){
      objects_html = objects.map(object=> <div data-id={ object._id } onClick={ this.handleClick } key={object._id} style={container_style__default}>{ object.title }</div>)
    }

    return (
      <div>
        <Nav />
        { this.props.children }
        { objects_html }
      </div>
    )
  }
}