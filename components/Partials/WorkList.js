// WorkList.js
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher'

export default class WorkList extends Component {

  scrollTop(){
    $('html, body').animate({
      scrollTop: $("#main-content").offset().top
    }, 500)
  }

  render(){
    
    let data = this.props.data
    let item_num = data.item_num
    let work_items = data.work_items

    let load_more
    let show_more_text = 'Show More Work'

    if(data.loading){
      show_more_text = 'Loading...'
    }

    if(work_items && item_num <= work_items.length){
      load_more = (
        <div>
          <button className="btn btn-default center-block" onClick={ this.props.getMoreWorkItems.bind(this) }>
            { show_more_text }
          </button>
        </div>
      )
    }

    work_items = _.take(work_items, item_num)
    
    let articles_html = work_items.map(( work_item ) => {
      let date_obj = new Date(work_item.created)
      let created = (date_obj.getMonth()+1) + '/' + date_obj.getDate() + '/' + date_obj.getFullYear()
      return (
        <div key={ 'key-' + work_item.slug }>
          <div className="post-preview">
            <h2 className="post-title pointer">
              <Link to={ '/work/' + work_item.slug } onClick={ this.scrollTop }>{ work_item.title }</Link>
            </h2>
            <p className="post-meta">Posted by <a href="https://cosmicjs.com" target="_blank">Cosmic JS</a> on { created }</p>
          </div>
          <hr/>
        </div>
      )
    })

    return (
      <div>
        <div>{ articles_html }</div>
        { load_more }
      </div>
    )
  }
}