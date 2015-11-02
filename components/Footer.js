// Footer.jsx
import React from 'react';

class Footer extends React.Component {

  render(){
      
    let footer_text;
    if(this.props.globals.text){
      footer_text = this.props.globals.text.footer_text;
    }

    let twitter;
    let facebook;
    let github;
    if(this.props.globals.social){
      twitter = this.props.globals.social.twitter;
      facebook = this.props.globals.social.facebook;
      github = this.props.globals.social.github;
    }

    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <ul className="list-inline text-center">
                <li>
                  <a href={ twitter } target="_blank">
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-circle fa-stack-2x"></i>
                      <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={ facebook } target="_blank">
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-circle fa-stack-2x"></i>
                      <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={ github } target="_blank">
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-circle fa-stack-2x"></i>
                      <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                </li>
              </ul>
              <p className="copyright text-muted" dangerouslySetInnerHTML={{__html: footer_text }}></p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
