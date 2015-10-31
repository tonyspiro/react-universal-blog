// AppDispatcher.js
import {Dispatcher} from 'flux'
import AppStore from '../stores/AppStore'

const AppDispatcher = new Dispatcher()

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {

  let action = payload.action

  switch(action) {

    case 'init-app':
      AppStore.init()
      break

    default:
      return true

  }

  return true

})

export default AppDispatcher