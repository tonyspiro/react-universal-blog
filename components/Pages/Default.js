// Default.js
import React, { Component } from 'react'
import { Link } from 'react-router'
import config from '../../config'

// Components
import Header from '../Partials/Header'

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher'

export default class Default extends Component {

  componentWillMount(){
    this.getPageData()
  }

  componentDidUpdate(){
    const data = this.props.data
    document.title = config.site.title + ' | ' + data.page.title
    
    // Updated
    const page = data.page
    const page_slug = this.getSlug()
    if(page.slug !== page_slug)
      this.getPageData(page_slug)
  }

  getSlug(){
    return this.props.location.pathname.replace('/','') 
  }

  getPageData(){
    const page_slug = this.getSlug()
    AppDispatcher.dispatch({
      action: 'get-page-data',
      page_slug: page_slug
    })
  }
  
  render(){
    
    const slug = this.getSlug()
    const data = this.props.data
    const page = data.page

    let main_content = <div dangerouslySetInnerHTML={ {__html: page.content } }></div>

    return (
       <div>
        <Header data={ data }/>
        <div id="main-content" className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            { main_content }
            </div>
          </div>
        </div>
      </div>
    )
  }
}