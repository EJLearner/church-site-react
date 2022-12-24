import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const Anchor = ({external, path, children, className}) => {
  if (external) {
    return (
      <a href={path} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={path}>
      {children}
    </Link>
  );
};

Anchor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  external: PropTypes.bool,
  path: PropTypes.string
};

export default Anchor;
