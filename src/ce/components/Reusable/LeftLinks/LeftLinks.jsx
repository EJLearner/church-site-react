import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

import commonUtils from '../../../../utils/commonUtils';

import './LeftLink.css';

const LeftLinks = (props) => {
  const renderLinks = (linkData, pathname) => {
    if (!linkData || !pathname) {
      return null;
    }

    const isRoot = !linkData.find(({path, pathKey}) => {
      return commonUtils.getComputedPath(path, pathKey) === pathname;
    });

    const listItems = linkData.map((link) => {
      const {path, pathKey, text, isDefault} = link;
      const computedPath = commonUtils.getComputedPath(path, pathKey);
      const currentPage = pathname === computedPath || (isRoot && isDefault);
      const className = currentPage ? 'current-page-link' : null;

      return (
        <React.Fragment key={computedPath}>
          <li className={className}>
            <Link to={computedPath}>{text}</Link>
          </li>
          {renderLinks(link.children, pathname)}
        </React.Fragment>
      );
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
    PropTypes.shape({
      path: PropTypes.string,
      pathKey: PropTypes.string,
      text: PropTypes.string.isRequired
    })
  ),
  pathname: PropTypes.string
};

export default LeftLinks;
