// BlogList.js
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

export default class BlogList extends Component {

  scrollTop(){
    $('html, body').animate({
      scrollTop: $("#main-content").offset().top
    }, 500)
  }

  render(){
    
    let data = this.props.data
    let item_num = data.item_num
    let articles = data.articles

    let load_more
    let show_more_text = 'Show More Articles'

    if(data.loading){
      show_more_text = 'Loading...'
    }

    if(articles && item_num <= articles.length){
      load_more = (
        <div>
          <button className="btn btn-default center-block" onClick={ this.props.getMoreArticles.bind(this) }>
            { show_more_text }
          </button>
        </div>
      )
    }

    articles = _.take(articles, item_num)
    
    let articles_html = articles.map(( article ) => {
      let date_obj = new Date(article.created)
      let created = (date_obj.getMonth()+1) + '/' + date_obj.getDate() + '/' + date_obj.getFullYear()
      return (
        <div key={ 'key-' + article.slug }>
          <div className="post-preview">
            <h2 className="post-title pointer">
              <Link to={ '/blog/' + article.slug } onClick={ this.scrollTop }>{ article.title }</Link>
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