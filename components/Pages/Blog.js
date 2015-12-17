// Blog.js
import React, { Component } from 'react'
import _ from 'lodash'

// Components
import Header from '../Partials/Header'
import BlogList from '../Partials/BlogList'
import BlogSingle from '../Partials/BlogSingle'

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher'

export default class Blog extends Component {

  getMoreArticles(){
    AppDispatcher.dispatch({
      action: 'get-more-items'
    })
  }

  getPage(){

    const data = this.props.data
    let pages = data.pages
    let pages_object = _.indexBy(pages, 'slug')
    let page = pages_object['home']

    // Get page info
    let metafields = page.metafields
    let hero = _.findWhere(metafields, { key: 'hero' })
    page.hero = 'https://cosmicjs.com/uploads/' + hero.value

    let headline = _.findWhere(metafields, { key: 'headline' })
    page.headline = headline.value

    let subheadline = _.findWhere(metafields, { key: 'subheadline' })
    page.subheadline = subheadline.value

    if(!this.props.params.slug){

      page.main_content = <BlogList getMoreArticles={ this.getMoreArticles } data={data}/>

    } else {

      const articles = data.articles
      
      // Get current page slug
      const slug = this.props.params.slug
      const articles_object = _.indexBy(articles, 'slug')
      const article = articles_object[slug]
      page.main_content = <BlogSingle article={article} />

    }

    return page
  }

  render(){

    const data = this.props.data
    const globals = data.globals
    const pages = data.pages
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