import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import {withRouter} from 'react-router-dom';

import Checklist from '../Reusable/Checklist/Checklist';

import moment from 'moment';
import _ from 'lodash';

import './CcLogin.css';

class CcLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._onChange = this._onChange.bind(this);
  }

  _onChange(value, id) {
    this.setState({[id]: value});
  }

  _listChildren(childrenFound) {
    const checkListItems = childrenFound.map((child, index) => {
      const checkboxId = `child${index}`;
      return {
        checked: this.state[checkboxId],
        label: `${child.name}, age ${child.age}`,
        value: checkboxId
      };
    });

    return (
      <Checklist
        checklistItems={checkListItems}
        id="children-checklist"
        label="Select Child"
        onChange={this._onChange}
        required
      />
    );
  }

  render() {
    const childrenFound = [
      {name: 'Zuri Jones', age: 6},
      {name: 'Earl Jones', age: 36},
      {name: 'April Jones', age: 36}
    ];

    return (
      <div>
        <h1>Welcome Back</h1>
        <div className="who-checking">Who are you checking in today?</div>
        <div className="instructions">
          You can select names individually or press{' '}
          <span className="select-all-text">Select All</span> to select every
          one listed below
        </div>
        {childrenFound.length ? this._listChildren(childrenFound) : null}
      </div>
    );
  }
}

CcLogin.defaultProps = {
  moreStuff: 'Default more stuff'
};

CcLogin.propTypes = {
  moreStuff: PropTypes.string
};

export default CcLogin;
