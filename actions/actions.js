// actions.js
require('es6-promise').polyfill()
require('isomorphic-fetch')
import config from '../config/cosmicjs';
import Cosmic from 'cosmicjs';

export function getBucket(Store){
  Cosmic.getBucket(config, function(err, response){
    Store.data = response
    Store.emitChange()
  })
}