import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import churchLogo from './chrisedtopbanner.png';
import PropTypes from 'prop-types';

import './MenuBar.css';

class MenuBar extends Component {
  static propTypes = {
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

  static defaultProps = {
    showLogo: true
  };

  _renderLogo() {
    return (
      <div className="logo">
        <img alt="City Temple Logo" src={churchLogo} />
      </div>
    );
  }

  render() {
    const renderedLinks = this.props.links.map(({path, text}) => {
      const {pathname} = this.props.location;
      let className =
        path !== '/' && pathname.indexOf(path) > -1
          ? 'current-page-link'
          : null;

      const isHomePage =
        !pathname || pathname === '/christianedu.html' || pathname === '/';

      if (path === '/' && isHomePage) {
        className = 'current-page-link';
      }

      return (
        <li className={className} key={path}>
          <Link to={path}>{text}</Link>
        </li>
      );
    });

    return (
      <div className="menu-bar" id={this.props.id}>
        <ul>{renderedLinks}</ul>
        {this.props.showLogo ? this._renderLogo() : null}
        {this.props.addDivToRight ? <div className="styling-div" /> : null}
      </div>
    );
  }
}

export default withRouter(MenuBar);
