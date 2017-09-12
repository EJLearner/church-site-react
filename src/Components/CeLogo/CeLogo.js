import React from 'react';
import {Link} from 'react-router-dom';

import _ from 'lodash';
import ceLogo from './cesquare.png'

import './CeLogo.css';

const CeLogo = () => {
  return (
    <Link to="/"><img className="ce-logo-corner" src={ceLogo} alt="Christian Ed Logo"/></Link>
  );
};

export default CeLogo;
