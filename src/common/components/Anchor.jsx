import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const Anchor = ({external, path, children}) => {
  if (external) {
    return (
      <a href={path} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return <Link to={path}>{children}</Link>;
};

Anchor.propTypes = {
  children: PropTypes.node,
  external: PropTypes.bool,
  path: PropTypes.string
};

export default Anchor;
