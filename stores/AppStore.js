// AppStore.js
import { EventEmitter } from 'events'
import _ from 'lodash'

export default _.extend({}, EventEmitter.prototype, {

  // Initial data
  data: {
    ready: false,
    globals: {},
    pages: [],
    item_num: 5
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