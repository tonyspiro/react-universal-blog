# React Universal Blog
##### [View a demo here](http://react-universal-blog.cosmicapp.co/)
[Sign up for Cosmic JS](https://cosmicjs.com/) to start managing content for your websites and applications faster and easier.

##### About
The React Universal Blog is a portfolio blog app that renders html on the server to make all pages visible to search engines. Then after initial load from the server, it is converted to a single page application to allow for fast navigation between pages.  

##### Notes
I tried to keep the organization as simple as possible.  There are no client, server or shared component folders.  All components are shared and the only difference between client and server are the entry points (app-client.js, app-server.js and app.js). 

It uses the following:
<br>
1. [React](http://facebook.github.io/react/) for UI views<br>
2. [Express](http://expressjs.com/) for server side rendering<br>
3. [React Router](https://github.com/rackt/react-router) for routing<br>
4. [React Hot Loader](https://github.com/gaearon/react-hot-loader) for hot loading in development<br>
5. [Flux](https://facebook.github.io/flux/) for data flow<br>
6. [Cosmic JS](https://cosmicjs.com) for content management
##### Install
```
git clone https://github.com/tonyspiro/react-universal-blog
cd react-universal-blog
npm install
```
##### Run development
```
npm run development
```
Go to [http://localhost:8080](http://localhost:8080)
##### Run production
```
npm start
```
Go to [http://localhost:3000](http://localhost:3000)
##### Configure your Cosmic JS bucket
After setting up your bucket on [Cosmic JS](https://cosmicjs.com), edit the ```config.js``` file and edit the slug to point to the slug of your bucket:
```javascript
// config.js
export default {
  bucket: {
    slug: 'react-universal-blog'
  }
}
```
