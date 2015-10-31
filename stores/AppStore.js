
// AppStore.js
import { EventEmitter } from 'events'
import { getBucket, removeItem } from '../actions/actions'
import _ from 'lodash'

const AppStore = _.extend({}, EventEmitter.prototype, {

  // Initial data
  bucket: {},

  init: function() {
    
    getBucket(this)

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

export default AppStore