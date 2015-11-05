// BlogSingle.js
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

// Store
import AppStore from '../stores/AppStore'

class BlogSingle extends Component {
  
  render(){
    
    let articles = AppStore.data.articles

    // Get current page slug
    let slug = this.props.slug
    let articles_object = _.indexBy(articles, 'slug')
    let article = articles_object[slug]
    
    let style = {
      marginBottom: 20
    }
    
    return (
      <div>
        <Link to="/" className="btn btn-default" style={ style }>&lt&lt Back to Article List</Link>
        <h2>{ article.title }</h2>
        <div dangerouslySetInnerHTML={ {__html: article.content } }></div>
      </div>
    )
  }
}

export default BlogSingle