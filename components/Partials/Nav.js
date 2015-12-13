// Nav.js
import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Nav extends Component {

  handleClick(){
    $('.navbar-collapse').removeClass('in')
    $('html,body').scrollTop(0)
  }

  render(){
    
    const data = this.props.data
    const pages = data.pages
    const globals = data.globals
    
    // Prevent initial null
    if(!pages){
      return <div></div>
    }

    let page_link

    let menu_items = pages.map(( page ) => {
      
      if(page.slug == 'home'){
      
        page_link = ''
      
      } else {
      
        page_link = page.slug

      }

      return (
        <li key={ 'key-' + page.slug }>
          <Link onClick={ this.handleClick } to={ '/' + page_link }>{ page.title }</Link>
        </li>
      )
    })

    return (
      <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header page-scroll">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" target="_blank" href="https://cosmicjs.com">Cosmic JS</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              { menu_items }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}