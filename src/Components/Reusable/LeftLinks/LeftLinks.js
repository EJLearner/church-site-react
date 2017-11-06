import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const LeftLinks = props => {
  const renderLinks = (linkData, pathname) => {
    if (!linkData) {
      return null;
    }

    const listItems = linkData.map(link => {
      const {path, text} = link;
      const className = path === pathname ? 'current-page-link' : null;
      return [
        <li className={className} key={path}>
          <Link to={path}>{text}</Link>
        </li>,
        renderLinks(link.children, pathname)
      ];
    });

    return <ul>{listItems}</ul>;
  };

  return renderLinks(props.linkData, props.pathname);
};

LeftLinks.propTypes = {
  linkData: PropTypes.arrayOf(
    React.PropTypes.shape({
      path: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  pathname: PropTypes.string.isRequired
};

export default LeftLinks;
