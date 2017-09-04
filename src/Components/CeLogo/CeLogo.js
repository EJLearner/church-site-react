import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import _ from 'lodash';
import ceLogo from './cesquare.png'

import './CeLogo.css';

const types = {
  VACATION_BIBLE: 'Vacation Bible School',
  CHILDRENS_CHURCH: 'Children’s Church'
}

const CeLogo = (props) => {
  return (
    <Link to="/"><img className="ce-logo-corner" src={ceLogo} alt="Christian Ed Logo"/></Link>
  );
};

CeLogo.propTypes = {
  type: PropTypes.oneOf(_.values(types)),
  onClickAttend: PropTypes.func.isRequired,
  onClickVolunteer: PropTypes.func.isRequired
};

CeLogo.TYPES = types;


export default CeLogo;
