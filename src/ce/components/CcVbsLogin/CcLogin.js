import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import {withRouter} from 'react-router-dom';
import firebase, {auth, provider} from '../../../firebase';
import moment from 'moment';
import _ from 'lodash';

import Button from '../Reusable/Button/Button';
import Checklist from '../Reusable/Checklist/Checklist';
import Text from '../Reusable/Text/Text';

import utils from '../../../utils/commonUtils';

import './CcLogin.css';

const STATUS = {
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
  ENTERING_PARENT_NAME: 'ENTERING_PARENT_NAME',
  SELECT_CHILDREN: 'SELECT_CHILDREN',
  SIGNING_CHILD_IN: 'SIGNING_CHILD_IN',
  CHILDREN_SIGNED_IN: 'CHILDREN_SIGNED_IN'
};

const bindThese = function(functions, context) {
  functions.forEach(func => {
    context[func] = context[func].bind(context);
  });
};

class CcLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ccRegistered: [],
      ccRegUsers: {},
      name: 'Earl Jones', // temporary
      status: STATUS.ENTERING_PARENT_NAME,
      user: null
    };

    bindThese(
      [
        '_handleLoginClick',
        '_startSearchAgain',
        '_onChange',
        '_onCheckInClick',
        '_onChecklistChange',
        '_onSearch',
        '_onSelectAllClick'
      ],
      this
    );
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

    const todaysLogRef = this._getTodaysLogRef();
    todaysLogRef.on('value', snapshot => {
      const signedInIds = _.map(snapshot.val(), 'ccRegisteredId');

      this.setState({signedInIds});
    });

    // keeps user logged in on a page refresh
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
      }
    });
  }

  _onChecklistChange(value, id) {
    const {childrenOfParent} = this.state;
    const newChildrenOfParent = _.cloneDeep(childrenOfParent);
    const child = newChildrenOfParent[id];
    child.checked = value;
    this.setState({childrenOfParent: newChildrenOfParent});
  }

  _onSelectAllClick() {
    const newChildrenOfParent = _.cloneDeep(this.state.childrenOfParent);

    _.forEach(newChildrenOfParent, (child, key) => {
      child.checked = true;
    });

    this.setState({childrenOfParent: newChildrenOfParent});
  }

  _getTodaysLogRef() {
    const today = moment().format('YYYY-MM-DD');
    return firebase.database().ref(`ccLogbook/${today}`);
  }

  _onCheckInClick(disabled) {
    if (disabled) {
      window.alert('You must select at least one child');
    } else {
      const children = this._getSelectedChildren();

      const childrenObjectsToAdd = _.cloneDeep(children).map(child => {
        child.ccLogbookId = utils.generatePushID();
        child.status = STATUS.LOGGED_IN;
        return child;
      });

      const todaysLogRef = this._getTodaysLogRef();
      todaysLogRef.push(...childrenObjectsToAdd);

      // TODO: check for return from push
      this.setState({status: STATUS.CHILDREN_SIGNED_IN});
    }
  }

  _onChange(value, id) {
    this.setState({[id]: value});
  }

  _onSearch() {
    const childrenOfParent = _.cloneDeep(this.state.ccRegistered).filter(
      child => {
        return (
          _.includes(child.parentNames, this.state.name) &&
          !_.includes(this.state.signedInIds, child.ccRegisteredId)
        );
      }
    );

    this.setState({
      status: STATUS.SELECT_CHILDREN,
      childrenOfParent
    });
  }

  _handleLoginClick() {
    auth.signInWithPopup(provider).then(result => {
      const {user} = result;
      this.setState({user});
    });
  }

  _startSearchAgain() {
    this.setState({name: '', status: STATUS.ENTERING_PARENT_NAME});
  }

  _getChildStates() {
    return this.state.childrenOfParent;
  }

  _getAge(dob) {
    const dobMoment = moment(dob, 'YYYY-MM-DD');
    return moment().diff(dobMoment, 'years');
  }

  _listChildren() {
    const {childrenOfParent, signedInIds} = this.state;
    const notSignedInChildren = childrenOfParent.filter(
      child => !_.includes(signedInIds, child.ccRegistered)
    );

    const checkListItems = _.map(notSignedInChildren, child => {
      const {dob, ccRegisteredId: id, name} = child;
      return {
        checked: Boolean(notSignedInChildren[id].checked),
        label: `${name}, age ${this._getAge(dob)}`,
        value: id
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

  _getSelectedChildren() {
    return _.filter(this.state.childrenOfParent, child => child.checked);
  }

  _renderChildSelectDiv() {
    let checkInButtonClass = 'check-in-button';
    let disabled = false;
    let atLeastOneChildSelected = this._getSelectedChildren().length;

    if (!atLeastOneChildSelected) {
      checkInButtonClass += ' disabled';
      disabled = true;
    }

    // TODO: Need to render something different when there are no children left

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
    const {status} = this.state;

    return (
      <div>
        <h1>Welcome Back</h1>
        {status === STATUS.ENTERING_PARENT_NAME && this._renderNameInput()}
        {status === STATUS.SELECT_CHILDREN && this._renderChildSelectDiv()}
      </div>
    );
  }

  _renderLoginScreen(loggedIn) {
    return (
      <div>
        {loggedIn ? (
          <div>
            <h1>Insufficient Access</h1>You must log in as a member of the
            Children’s Church Staff
          </div>
        ) : (
          <div>
            <h1>Please Login</h1>A Staff Member Must Log In Order To Enable
            Registration
          </div>
        )}
        <div className="admin-page">
          <Button onClick={this._handleLoginClick}>Log in</Button>
        </div>
      </div>
    );
  }

  _renderAfterLoginScreen() {
    return (
      <div>
        <h1>Thanks for signing your child in!</h1>
        <Button onClick={this._startSearchAgain}>Sign Another Child In</Button>
      </div>
    );
  }

  _renderProperScreen() {
    const {ccRegUsers, user, status} = this.state;

    const memberOfCcLoginGroup = user && ccRegUsers[user.uid];

    if (status === STATUS.CHILDREN_SIGNED_IN) {
      return this._renderAfterLoginScreen();
    }

    if (user && memberOfCcLoginGroup) {
      return this._renderWhileLoggedIn(user);
    }

    return this._renderLoginScreen();
  }

  render() {
    return <div className="cc-login-page">{this._renderProperScreen()}</div>;
  }
}

CcLogin.defaultProps = {
  moreStuff: 'Default more stuff'
};

CcLogin.propTypes = {
  moreStuff: PropTypes.string
};

export default CcLogin;
