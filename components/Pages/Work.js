// Work.js
import React, { Component } from 'react'
import _ from 'lodash'

// Components
import Header from '../Partials/Header'
import WorkList from '../Partials/WorkList'
import WorkSingle from '../Partials/WorkSingle'

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher'

export default class Work extends Component {

  getMoreWorkItems(){
    AppDispatcher.dispatch({
      action: 'get-more-items'
    })
  }

  getPage(){

    const data = this.props.data
    let pages = data.pages
    let pages_object = _.indexBy(pages, 'slug')
    let page = pages_object['work']

    // Get page info 
    let metafields = page.metafields
    let hero = _.findWhere(metafields, { key: 'hero' })
    page.hero = 'https://cosmicjs.com/uploads/' + hero.value

    let headline = _.findWhere(metafields, { key: 'headline' })
    page.headline = headline.value

    let subheadline = _.findWhere(metafields, { key: 'subheadline' })
    page.subheadline = subheadline.value

    if(!this.props.params.slug){

      page.main_content = <WorkList getMoreWorkItems={ this.getMoreWorkItems } data={data}/>

    } else {
      
      const work_items = data.work_items
      
      // Get current page slug
      const slug = this.props.params.slug
      const work_items_object = _.indexBy(work_items, 'slug')
      const work_item = work_items_object[slug]
      page.main_content = <WorkSingle data={data} work_item={ work_item }/>

    }
    return page
  }

  render(){

    const data = this.props.data
    let globals = data.globals
    let pages = data.pages
    let page = this.getPage()
    data.page = page

    return (
      <div>
        <Header data={ data }/>
          <div id="main-content" className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              { page.main_content }
              </div>
          </div>
        </div>
      </div>
    )
  }
}