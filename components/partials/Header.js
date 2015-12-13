// Header.js
import React, { Component } from 'react'

export default class Header extends Component {

  render(){
    
    const data = this.props.data
    const hero = data.page.hero
    const headline = data.page.headline
    const subheadline = data.page.subheadline

    return (
      <div>
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