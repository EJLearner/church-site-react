import React from 'react';
import {Link} from 'react-router-dom';

import ceLogo from './cesquare.png';

import './CeLogo.css';

const CeLogo = () => {
  return (
    <Link to="/">
      <img alt="Christian Ed Logo" className="ce-logo-corner" src={ceLogo} />
    </Link>
  );
};

export default CeLogo;
