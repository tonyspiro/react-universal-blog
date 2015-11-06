// actions.js
import config from '../config/cosmicjs'
import Cosmic from 'cosmicjs'
import _ from 'lodash'

export function getStore(Store, callback){
  
  let pages = {}

  Store.data.ready = false
  Store.data.pages = []

  Cosmic.getObjects(config, function(err, response){
    
    let objects = response.objects
    
    /* Globals
    ======================== */
    let globals = Store.data.globals
    globals.text = response.object['text']
    let metafields = globals.text.metafields
    let menu_title = _.findWhere(metafields, { key: 'menu-title' })
    globals.text.menu_title = menu_title.value

    let footer_text = _.findWhere(metafields, { key: 'footer-text' })
    globals.text.footer_text = footer_text.value

    let site_title = _.findWhere(metafields, { key: 'site-title' })
    globals.text.site_title = site_title.value

    // Social
    globals.social = response.object['social']
    metafields = globals.social.metafields
    let twitter = _.findWhere(metafields, { key: 'twitter' })
    globals.social.twitter = twitter.value
    let facebook = _.findWhere(metafields, { key: 'facebook' })
    globals.social.facebook = facebook.value
    let github = _.findWhere(metafields, { key: 'github' })
    globals.social.github = github.value

    Store.data.globals = globals

    /* Pages
    ======================== */
    let pages = objects.type.page
    Store.data.pages = pages

    /* Articles
    ======================== */
    let articles = objects.type['post']
    articles = _.sortBy(articles, 'order')
    Store.data.articles = articles

    /* Work Items
    ======================== */
    let work_items = objects.type['work']
    work_items = _.sortBy(work_items, 'order')
    Store.data.work_items = work_items
    
    // Emit change
    Store.data.ready = true
    Store.emitChange()

    // Trigger callback (from server)
    if(callback){
      callback(false, Store)
    }

  })
}

export function getMoreItems(Store){
  
  Store.data.loading = true
  Store.emitChange()

  setTimeout(function(){
    let item_num = Store.data.item_num
    let more_item_num = item_num + 5
    Store.data.item_num = more_item_num
    Store.data.loading = false
    console.log(Store.data.loading)
    Store.emitChange()
  }, 300)
}