// config.js
export default {
  site: {
    title: 'React Universal Blog'
  },
  bucket: {
    slug: process.env.COSMIC_BUCKET || 'react-universal-blog',
    media_url: 'https://cosmicjs.com/uploads'
  }
}
