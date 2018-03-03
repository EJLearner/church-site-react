import React from 'react';
import {Link} from 'react-router-dom';

import routePaths from '../../../routePaths';

import ceLogo from './cesquare.png';

import './CeLogo.css';

const CeLogo = () => {
  return (
    <Link to={routePaths.CE_HOME}>
      <img alt="Christian Ed Logo" className="ce-logo-corner" src={ceLogo} />
    </Link>
  );
};

export default CeLogo;
