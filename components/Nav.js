// Nav.jsx
import React from 'react';
import { Link } from 'react-router';

// Utilities
import AppStore from '../stores/AppStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

class Nav extends React.Component {

  handleClick(){
    $('.navbar-collapse').removeClass('in');
    $('html,body').scrollTop(0);
  }

  render(){
    
    let _this = this;

    let pages = AppStore.data.pages;
    let globals = AppStore.data.globals;

    let page_link;

    let menu_items = pages.map(( page ) => {
      
      if(page.slug == 'home'){
      
        page_link = '';
      
      } else {
      
        page_link = page.slug;

      }

      return (
        <li key={ 'key-' + page.slug }>
          <Link onClick={ _this.handleClick } to={ '/' + page_link }>{ page.title }</Link>
        </li>
      );
    });

    return (
      <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header page-scroll">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" target="_blank" href="https://cosmicjs.com">{ globals.text.menu_title }</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              { menu_items }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;