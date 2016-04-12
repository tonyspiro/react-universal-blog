// NoMatch.js
import React, { Component } from 'react'
import { Link } from 'react-router'
import config from '../../config'

// Components
import Header from '../Partials/Header'

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher'

export default class NoMatch extends Component {

  componentWillMount(){
    this.getPageData()
  }

  componentDidMount(){
    const data = this.props.data
    document.title = config.site.title + ' | Page Not Found'
  }

  getPageData(){
    AppDispatcher.dispatch({
      action: 'get-page-data',
      slug: 'home'
    })
  }
  
  render(){
    
    const data = this.props.data
    const page = data.page

    return (
      <div>
        <Header data={ data }/>
        <div id="main-content" className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <div className="text-center">
                Whoa!  Looks like you stumbled down a worm hole!<br />
                If this is a new page that you've added in Cosmic JS, make sure you add it to your <code>routes.js</code> file!
                <br/>
                <br/>
                <Link to="/">Take me home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
