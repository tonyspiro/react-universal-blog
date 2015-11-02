// AppClient.js
import React, { Component } from 'react'

// Utilities
import AppStore from '../stores/AppStore'
import AppDispatcher from '../dispatcher/AppDispatcher'

// Components
import Nav from './Nav'
import Footer from './Footer'
import Loading from './Loading'

// Pages
import Blog from '../pages/Blog'
import Work from '../pages/Work'
import Default from '../pages/Default'
import NoMatch from '../pages/NoMatch'

export default class App extends Component {
  
  _onChange() {
    this.setState(AppStore)
  }

  constructor(){
    
    super()
    
    // API data
    AppDispatcher.dispatch({
      action: 'init-app'
    })

  }

  // Add change listeners to stores
  componentDidMount() {
    AppStore.addChangeListener(this._onChange.bind(this))
  }

  // Remove change listeners from stores
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this))
  }

  handleClick(e){
    console.log(e.target.dataset.id)
  }

  render(){
    
    if(!AppStore.data.ready){
      let style = {
        marginTop: 120
      }
      return (
        <div className="container text-center" style={ style }>
          <Loading />
        </div>
      );
    }
    let globals = AppStore.data.globals;
    let pages = AppStore.data.pages;

    // Pass this down!!!!
    let data = AppStore.data;
    let Routes = React.cloneElement(this.props.children, { data: data });
    
    return (
      <div>
        <Nav pages={ pages }/>
        { Routes }
        <Footer globals={ globals }/>
      </div>
    );
  }
}