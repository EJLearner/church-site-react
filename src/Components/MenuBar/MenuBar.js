import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import churchLogo from './chrisedtopbanner.png';
import PropTypes from 'prop-types';

import './MenuBar.css';

class MenuBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderedLinks = this.props.links.map(link => {
      const {pathname} = this.props.location;
      let className =
        link.path !== '/' && pathname.indexOf(link.path) > -1
          ? 'current-page-link'
          : null;
      const isHomePage =
        !pathname || pathname === '/christianedu.html' || pathname === '/';
      if (link.path === '/' && isHomePage) {
        className = 'current-page-link';
      }
      return (
        <li className={className} key={link.path}>
          <Link to={link.path}>{link.text}</Link>
        </li>
      );
    });

    return (
      <div className="menu-bar" id={this.props.id}>
        <ul>{renderedLinks}</ul>
        {this.props.showLogo ? (
          <div className="logo">
            <img alt="" src={churchLogo} />
          </div>
        ) : null}
        {this.props.addDivToRight ? <div className="styling-div" /> : null}
      </div>
    );
  }
}

MenuBar.defaultProps = {
  showLogo: true
};

MenuBar.propTypes = {
  // renders sibling empty div as a way to get desired calendar menu styling
  addDivToRight: PropTypes.bool,
  id: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  location: PropTypes.object,
  showLogo: PropTypes.bool
};

export default withRouter(MenuBar);
