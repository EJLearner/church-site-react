import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './LeftLink.css';

const LeftLinks = props => {
  const renderLinks = (linkData, pathname) => {
    if (!linkData) {
      return null;
    }

    const isRoot = !linkData.find(link => link.path === pathname);

    const listItems = linkData.map(link => {
      const {path, text, isDefault} = link;
      const currentPage = pathname === path || (isRoot && isDefault);
      const className = currentPage ? 'current-page-link' : null;
      return [
        <li className={className} key={path}>
          <Link to={path}>{text}</Link>
        </li>,
        renderLinks(link.children, pathname)
      ];
    });

    return <ul>{listItems}</ul>;
  };

  return (
    <div className="ce-left-links">
      {renderLinks(props.linkData, props.pathname)}
    </div>
  );
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
