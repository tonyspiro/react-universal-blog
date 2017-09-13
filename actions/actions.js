// actions.js
import config from '../config'
import Cosmic from 'cosmicjs'
import _ from 'lodash'

// AppStore
import AppStore from '../stores/AppStore'

export function getStore(callback){
  
  let pages = {}

  Cosmic.getObjects(config, function(err, response){
    
    let objects = response.objects
    
    /* Globals
    ======================== */
    let globals = AppStore.data.globals
    globals.text = response.object['text']
    let metafields = globals.text.metafields
    let menu_title = _.find(metafields, { key: 'menu-title' })
    globals.text.menu_title = menu_title.value

    let footer_text = _.find(metafields, { key: 'footer-text' })
    globals.text.footer_text = footer_text.value

    let site_title = _.find(metafields, { key: 'site-title' })
    globals.text.site_title = site_title.value

    // Social
    globals.social = response.object['social']
    metafields = globals.social.metafields
    let twitter = _.find(metafields, { key: 'twitter' })
    globals.social.twitter = twitter.value
    let facebook = _.find(metafields, { key: 'facebook' })
    globals.social.facebook = facebook.value
    let github = _.find(metafields, { key: 'github' })
    globals.social.github = github.value

    // Nav
    const nav_items = response.object['nav'].metafields
    globals.nav_items = nav_items
    
    AppStore.data.globals = globals

    /* Pages
    ======================== */
    let pages = objects.type.page
    AppStore.data.pages = pages

    /* Articles
    ======================== */
    let articles = objects.type['post']
    articles = _.sortBy(articles, 'order')
    AppStore.data.articles = articles

    /* Work Items
    ======================== */
    let work_items = objects.type['work']
    work_items = _.sortBy(work_items, 'order')
    AppStore.data.work_items = work_items
    
    // Emit change
    AppStore.data.ready = true
    AppStore.emitChange()

    // Trigger callback (from server)
    if(callback){
      callback(false, AppStore)
    }

  })
}

export function getPageData(page_slug, post_slug){
  
  if(!page_slug || page_slug === 'blog')
    page_slug = 'home'
  
  // Get page info
  const data = AppStore.data
  const pages = data.pages
  const page = _.find(pages, { slug: page_slug })
  const metafields = page.metafields
  if(metafields){
    const hero = _.find(metafields, { key: 'hero' })
    page.hero = config.bucket.media_url + '/' + hero.value

    const headline = _.find(metafields, { key: 'headline' })
    page.headline = headline.value

    const subheadline = _.find(metafields, { key: 'subheadline' })
    page.subheadline = subheadline.value
  }

  if(post_slug){
    if(page_slug === 'home'){
      const articles = data.articles
      const article = _.find(articles, { slug: post_slug })
      page.title = article.title
    }
    if(page_slug === 'work'){
      const work_items = data.work_items
      const work_item = _.find(work_items, { slug: post_slug })
      page.title = work_item.title
    }
  }
  AppStore.data.page = page
  AppStore.emitChange()
}

export function getMoreItems(){
  
  AppStore.data.loading = true
  AppStore.emitChange()

  setTimeout(function(){
    let item_num = AppStore.data.item_num
    let more_item_num = item_num + 5
    AppStore.data.item_num = more_item_num
    AppStore.data.loading = false
    AppStore.emitChange()
  }, 300)
}