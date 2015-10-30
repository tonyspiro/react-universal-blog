require('es6-promise').polyfill();
require('isomorphic-fetch');

export function getBucket(AppStore){
  
  fetch('https://api.cosmicjs.com/v1/wedding-site')
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(response => {
      AppStore.bucket = response.bucket
      AppStore.emitChange();
    })
}