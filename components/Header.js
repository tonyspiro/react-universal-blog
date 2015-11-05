// Header.js
import React, { Component } from 'react'
import Nav from './Nav'

// Store
import AppStore from '../stores/AppStore'

class Header extends Component {

  render(){
    
    let hero
    let headline
    let subheadline

    if(this.props.page){
      hero = this.props.page.hero
      headline = this.props.page.headline
      subheadline = this.props.page.subheadline
    }

    return (
      <div>
        <Nav />
        <header className="intro-header" style={ { backgroundImage: "url('" + hero + "')" } }>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <div className="site-heading">
                  <h1>{ headline }</h1>
                  <hr className="small" />
                  <span className="subheading">{ subheadline }</span>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

export default Header
