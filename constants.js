// constants.js
let constants
if(process.env.NODE_ENV === 'development'){
  constants = {
    DEV: true,
    PROD: false
  }
} else {
  constants = {
    DEV: false,
    PROD: true
  }
}
export default constants