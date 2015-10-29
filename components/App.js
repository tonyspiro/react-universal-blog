import React, { Component } from 'react'
import Shorti from 'shorti'

export default class App extends Component {
  
  handleClick(){
    alert('clicked');
  }

  render(){
    
    let container_style__default = Shorti('p-20 solid bw-10 bc-444 m-20')
    let container_style__active = {...Shorti('bg-00FF00'), ...container_style__default}
    
    return (
      <div>
        <h1>{ this.props.data.mode }</h1>
        <div style={container_style__active}>
          <button onClick={ this.handleClick }>Click me</button>
          This a is just a test
        </div>
      </div>
    )
  }
}