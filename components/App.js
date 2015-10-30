// App.js
import React, { Component } from 'react'
import Shorti from 'shorti'
import Header from './Header'

export default class App extends Component {
  
  constructor(){
    super()
    
    let _this = this
    
    this.state = {
      bucket: {}
    }

    fetch('https://api.cosmicjs.com/v1/tonyspirocom')
      .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then(function(response) {
        _this.setState({
          bucket: response.bucket
        })
      });
  }

  handleClick(){
    alert('clicked')
  }

  render(){
    
    let media = this.state.bucket.media
    let first_img_src

    if(media){
      first_img_src = 'https://cosmicjs.com/uploads/' + media[19].name
    }
    let container_style__default = Shorti('w-100p h-800 bg-url(' + first_img_src + ') bg-cover bg-center')
    
    return (
      <div>
        <Header data={ this.props.data }/>
        <div style={container_style__default}>
          
          
        </div>
      </div>
    )
  }
}