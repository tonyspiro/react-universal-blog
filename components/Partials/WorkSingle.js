// WorkSingle.js
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

export default class WorkSingle extends Component {
  
  render(){
    
    let work_items = this.props.data.work_items

    // Get current page slug
    let slug = this.props.slug
    let articles_object = _.indexBy(work_items, 'slug')
    let work_item = articles_object[slug]
    
    let style = {
      marginBottom: 20
    }

    return (
      <div>
        <Link to="/work" className="btn btn-default" style={ style }>&lt;&lt; Back to Work List</Link>
        <h2>{ work_item.title }</h2>
        <div dangerouslySetInnerHTML={ {__html: work_item.content } }></div>
      </div>
    )
  }
}