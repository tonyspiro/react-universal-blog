// AppStore.js
import { EventEmitter } from 'events'
import { getObjects, getMoreItems } from '../actions/actions'
import _ from 'lodash'

export default _.extend({}, EventEmitter.prototype, {

  // Initial data
  data: {
    globals: {},
    pages: [],
    item_num: 5
  },

  // Get bucket on init
  init: function() {
    getObjects(this)
  },

  getMoreItems: function(){
    getMoreItems(this)
  },

  // Emit Change event
  emitChange: function(){
    this.emit('change')
  },

  // Add change listener
  addChangeListener: function(callback){
    this.on('change', callback)
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback)
  }
  
})