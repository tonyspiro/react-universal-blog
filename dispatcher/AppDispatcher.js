// AppDispatcher.js
import {Dispatcher} from 'flux'
import AppStore from '../stores/AppStore'
import { getStoreBrowser, getMoreItems } from '../actions/actions'

const AppDispatcher = new Dispatcher()

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {

  let action = payload.action

  switch(action) {

    case 'get-store-browser':
      getStoreBrowser(AppStore)
      break

    case 'get-more-items':
      getMoreItems(AppStore)
      break

    default:
      return true

  }

  return true

})

export default AppDispatcher