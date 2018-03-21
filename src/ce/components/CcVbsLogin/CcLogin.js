import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import {withRouter} from 'react-router-dom';

import Button from '../Reusable/Button/Button';
import Checklist from '../Reusable/Checklist/Checklist';
import Text from '../Reusable/Text/Text';

import firebase, {auth, provider} from '../../../firebase';
import moment from 'moment';
import _ from 'lodash';

import './CcLogin.css';

class CcLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      user: null,
      ccRegistered: [],
      ccRegUsers: {}
    };

    this._onChecklistChange = this._onChecklistChange.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSelectAllClick = this._onSelectAllClick.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._login = this._login.bind(this);
  }

  componentDidMount() {
    // update ccRegistered state based on firebase data status
    const ccRegisteredRef = firebase.database().ref('ccRegistered');
    ccRegisteredRef.on('value', snapshot => {
      const ccRegistered = snapshot.val();

      this.setState({
        ccRegistered
      });
    });

    // update ccRegUsers state based on firebase data status
    const ccRegUsersRef = firebase.database().ref('user_groups/ccRegAccess');
    ccRegUsersRef.on('value', snapshot => {
      const ccRegUsers = snapshot.val();

      this.setState({
        ccRegUsers
      });
    });

    // keeps user logged in on a page refresh
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
      }
    });
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
      window.alert('You must select at least one child');
    } else {
      console.log('check in action here');
    }
  }

  _onChange(value, id) {
    this.setState({[id]: value});
  }

  _onSearch() {
    const childrenOfParent = this._getChildrenOfParent();
    this.setState({showSearchResults: true, ...childrenOfParent});
  }

  _login() {
    auth.signInWithPopup(provider).then(result => {
      const {user} = result;
      this.setState({user});
    });
  }

  _getChildStates() {
    return _.reduce(
      this.state,
      (children, child = {}, index) => {
        if (_.get(child, 'isChild')) {
          children.push(child);
        }

        return children;
      },
      []
    );
  }

  _getChildrenOfParent() {
    return _.reduce(
      this.state.ccRegistered,
      (children, child = {}, index) => {
        if (_.includes(child.parentNames, this.state.name)) {
          const newChild = _.cloneDeep(child);
          newChild.isChild = true;
          children[`child-select-${child.name}`] = newChild;
        }

        return children;
      },
      {}
    );
  }

  _getAge(dob) {
    const dobMoment = moment(dob, 'YYYY-MM-DD');
    return moment().diff(dobMoment, 'years');
  }

  _listChildren() {
    const children = this._getChildStates();

    const checkListItems = _.map(children, (child, index) => {
      const {dob, name} = child;
      const checkboxId = `child-select-${name}`;
      return {
        checked: Boolean(this.state[checkboxId].checked),
        label: `${name}, age ${this._getAge(dob)}`,
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

  _renderChildSelectDiv() {
    let checkInButtonClass = 'check-in-button';
    let disabled = false;

    if (!this._isAChildSelected()) {
      checkInButtonClass += ' disabled';
      disabled = true;
    }

    return (
      <div>
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

  _renderNameInput() {
    return (
      <div>
        <Text
          id="name"
          label="Name"
          onChange={this._onChange}
          onEnter={this._onSearch}
          value={this.state.name}
        />
      </div>
    );
  }

  _renderWhileLoggedIn() {
    const {showSearchResults} = this.state;

    return (
      <div>
        <h1>Welcome Back</h1>
        {!showSearchResults && this._renderNameInput()}
        {showSearchResults && this._renderChildSelectDiv()}
      </div>
    );
  }

  _renderLoginScreen(loggedIn) {
    return (
      <div>
        {loggedIn ? (
          <div>
            <h1>Please Login</h1>A Staff Member Must Log In Order To Enable
            Registration
          </div>
        ) : (
          <div>
            <h1>Insufficient Access</h1>You must log in as a member of the
            Children’s Church Staff
          </div>
        )}
        <div className="admin-page">
          <Button onClick={this._login}>Log in</Button>
        </div>
      </div>
    );
  }

  render() {
    const {user, ccRegUsers} = this.state;

    const memberOfCcLoginGroup = user && ccRegUsers[user.uid];

    return (
      <div className="cc-login-page">
        {user && memberOfCcLoginGroup
          ? this._renderWhileLoggedIn()
          : this._renderLoginScreen(user)}
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
