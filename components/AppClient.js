import React, { Component } from 'react'

export default class AppClient extends Component {
  
  handleClick(){
    alert('clicked again!');
  }

  render(){
    return (
      <div onClick={ this.handleClick }>Hello, this is a test.</div>
    )
  }  
}