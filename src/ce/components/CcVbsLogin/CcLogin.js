import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import {withRouter} from 'react-router-dom';

import Button from '../Reusable/Button/Button';
import Checklist from '../Reusable/Checklist/Checklist';

import moment from 'moment';
import _ from 'lodash';

import './CcLogin.css';

class CcLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'child-select-Zuri Jones': {name: 'Zuri Jones', age: 6, isChild: true},
      'child-select-Earl Jones': {name: 'Earl Jones', age: 36, isChild: true},
      'child-select-April Jones': {name: 'April Jones', age: 36, isChild: true}
    };

    this._onChecklistChange = this._onChecklistChange.bind(this);
    this._onSelectAllClick = this._onSelectAllClick.bind(this);
  }

  _onChecklistChange(value, id) {
    const child = this.state[id];
    child.checked = value;
    this.setState({[id]: child});
  }

  _onSelectAllClick() {
    const newState = {};

    _.forEach(this._getChildStates(), (child, key) => {
      child.checked = true;
      newState[key] = child;
    });

    this.setState(newState);
  }

  _onCheckInClick(disabled) {
    if (disabled) {
      window.alert('You mus select at least one child');
    } else {
      console.log('check in action here');
    }
  }

  _getChildStates() {
    return _.reduce(
      this.state,
      (children, property, key) => {
        if (_.get(property, 'isChild')) {
          children[key] = property;
        }
        return children;
      },
      {}
    );
  }

  _listChildren() {
    const children = this._getChildStates();

    const checkListItems = _.map(children, (child, index) => {
      const {age, name} = child;
      const checkboxId = `child-select-${name}`;
      return {
        checked: Boolean(this.state[checkboxId].checked),
        label: `${name}, age ${age}`,
        value: checkboxId
      };
    });

    return (
      <div>
        <Checklist
          checklistItems={checkListItems}
          id="children-checklist"
          label="Select Child"
          onChange={this._onChecklistChange}
          required
        />
      </div>
    );
  }

  _isAChildSelected() {
    return _.some(this._getChildStates(), child => child.checked);
  }

  render() {
    let checkInButtonClass = 'check-in-button';
    let disabled = false;
    if (!this._isAChildSelected()) {
      checkInButtonClass += ' disabled';
      disabled = true;
    }

    return (
      <div className="cc-login-page">
        <h1>Welcome Back</h1>
        <p className="who-checking">Who are you checking in today?</p>
        <div className="instructions">
          You can select names individually or press{' '}
          <span className="select-all-text">Select All</span> to select every
          one listed below
        </div>
        {this._listChildren()}
        <div className="button-div">
          <Button
            className="select-all-button"
            onClick={this._onSelectAllClick}
          >
            Select All
          </Button>
        </div>
        <div className="button-div">
          <Button
            className={checkInButtonClass}
            onClick={_.partial(this._onCheckInClick, disabled)}
          >
            Check In
          </Button>
        </div>
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
