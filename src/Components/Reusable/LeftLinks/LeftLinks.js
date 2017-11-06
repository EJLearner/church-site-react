import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const LeftLinks = props => {
  if (!props.linkData) {
    return null;
  }

  const listItems = props.linkData.map(link => {
    const {path, text} = link;
    const className = path === props.pathname ? 'current-page-link' : null;
    return [
      <li className={className} key={path}>
        <Link to={path}>{text}</Link>
      </li>,
      this.renderLinks(link.children, props.pathname)
    ];
  });

  return <ul>{listItems}</ul>;
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
