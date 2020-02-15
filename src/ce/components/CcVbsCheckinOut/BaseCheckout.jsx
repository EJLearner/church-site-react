import React, {Component} from 'react';
import PropTypes from 'prop-types';
import firebase, {auth, provider} from '../../../firebase';
import moment from 'moment';
import _ from 'lodash';

import Button from '../Reusable/Button/Button';
import Checklist from '../Reusable/Checklist/Checklist';
import Text from '../../../common/components/Text';

import utils from '../../../utils/commonUtils';

import {CHILD_STATUS, PAGE_STATUS} from './BaseCheckinOutConstants';

import './BaseCheckinOut.css';

const bindThese = function(functions, context) {
  functions.forEach(func => {
    context[func] = context[func].bind(context);
  });
};

class BaseCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childrenOfParent: {},
      parentName: '',
      regStaff: {},
      status: PAGE_STATUS.ENTERING_PARENT_NAME,
      todaysLogbook: {},
      user: null
    };

    bindThese(
      [
        '_handleLoginClick',
        '_startSearchAgain',
        '_onChange',
        '_onCheckoutClick',
        '_onChecklistChange',
        '_onSearch',
        '_onSelectAllClick'
      ],
      this
    );
  }

  componentDidMount() {
    // update regStaff state based on firebase data status
    const regStaffRef = firebase
      .database()
      .ref(this.props.registryAccessRefName);

    regStaffRef.on('value', snapshot => {
      const regStaff = snapshot.val();
      this.setState({regStaff});
    });

    const todaysLogRef = this._getTodaysLogRef();

    todaysLogRef.on('value', snapshot => {
      const todaysLogbook = snapshot.val();
      this.setState({todaysLogbook});
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
    return firebase.database().ref(`${this.props.logbookRefName}/${today}`);
  }

  _onCheckoutClick(disabled) {
    const idKey = `${this.props.logbookRefName}Id`;

    if (disabled) {
      window.alert('You must select at least one child');
    } else {
      const children = this._getSelectedChildren();
      const selectedChildrenLogbookIds = _.map(children, idKey);
      const todaysLogRef = this._getTodaysLogRef();
      const {todaysLogbook} = this.state;

      _.forEach(todaysLogbook, (loggedChild, key) => {
        if (_.includes(selectedChildrenLogbookIds, loggedChild[idKey])) {
          const childRef = todaysLogRef.child(key);
          // TODO: check for return from update

          childRef.update({
            checkOutTime: new Date().toISOString(),
            status: CHILD_STATUS.CHECKED_OUT
          });
        }
      });
      this.setState({status: PAGE_STATUS.CHILDREN_CHECKED_OUT});
    }
  }

  _onChange(value, id) {
    this.setState({[id]: value});
  }

  _onSearch() {
    const {parentName} = this.state;
    const childrenOfParent = {};

    _.forEach(this.state.todaysLogbook, child => {
      if (_.includes(child.parentNames, parentName)) {
        childrenOfParent[child[this.props.registryIdName]] = child;
      }
    });

    this.setState({
      status: PAGE_STATUS.SELECT_CHILDREN,
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
    this.setState({parentName: '', status: PAGE_STATUS.ENTERING_PARENT_NAME});
  }

  _listChildren() {
    const {childrenOfParent} = this.state;

    const checkListItems = _.map(childrenOfParent, child => {
      const {childDob, childName} = child;
      const registeredId = child[this.props.registryIdName];
      const checkedIn = child.status === CHILD_STATUS.CHECKED_IN;

      let checked = Boolean(_.get(childrenOfParent, `${registeredId}.checked`));
      let disabled = false;
      let label = `${childName}, age ${utils.getAge(childDob)}`;

      if (!checkedIn) {
        checked = true;
        disabled = true;
        label += ' (already checked out)';
      }

      return {
        checked,
        disabled,
        label,
        value: registeredId
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
    const {childrenOfParent, parentName} = this.state;
    let checkInButtonClass = 'check-in-button';
    let disabled = false;
    let atLeastOneChildSelected = this._getSelectedChildren().length;

    if (!atLeastOneChildSelected) {
      checkInButtonClass += ' disabled';
      disabled = true;
    }

    if (_.isEmpty(childrenOfParent)) {
      return (
        <div>
          No children found for name “{parentName}”. Please try a different name
          or get staff assistance.
          <div className="button-div">
            <Button
              className="select-all-button"
              onClick={this._startSearchAgain}
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    const checkedInChildrenOfParent = _.filter(
      childrenOfParent,
      child => child.status === CHILD_STATUS.CHECKED_IN
    );

    if (!checkedInChildrenOfParent.length) {
      return (
        <div>
          <p>All of the children for this name are checked out already</p>
          {this._listChildren()}
          <div className="button-div">
            <Button
              className="select-all-button"
              onClick={this._startSearchAgain}
            >
              Go Back To Search
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p className="who-checking">Who are you checking out today?</p>
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
            onClick={_.partial(this._onCheckoutClick, disabled)}
          >
            Check Out
          </Button>
        </div>
      </div>
    );
  }

  _renderNameInput() {
    return (
      <div>
        <Text
          id="parentName"
          instructions="Please enter parent/guardian’s name below to check children out"
          label="Parent/Guardian Name"
          onChange={this._onChange}
          onEnter={this._onSearch}
          placeholder="First Last"
          value={this.state.parentName}
        />
      </div>
    );
  }

  _renderWhileLoggedIn() {
    const {status} = this.state;

    return (
      <div>
        <h1>Thanks for attending {this.props.welcomeName}</h1>
        {status === PAGE_STATUS.ENTERING_PARENT_NAME && this._renderNameInput()}
        {status === PAGE_STATUS.SELECT_CHILDREN && this._renderChildSelectDiv()}
        <div className="logged-in-name">
          Logged in under {this.state.user.displayName}{' '}
          <Button
            onClick={() => {
              auth.signOut().then(() => {
                this.setState({user: null});
              });
            }}
          >
            Log Out
          </Button>
        </div>
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
        <h1>Thanks for checking your child out!</h1>
        <Button onClick={this._startSearchAgain}>
          Check Another Child Out
        </Button>
      </div>
    );
  }

  _renderProperScreen() {
    const {regStaff, user, status} = this.state;

    const memberOfBaseCheckinGroup = user && regStaff[user.uid];

    if (status === PAGE_STATUS.CHILDREN_CHECKED_OUT) {
      return this._renderAfterLoginScreen();
    }

    if (user && memberOfBaseCheckinGroup) {
      return this._renderWhileLoggedIn(user);
    }

    return this._renderLoginScreen();
  }

  render() {
    return (
      <div className="check-in-out-page">{this._renderProperScreen()}</div>
    );
  }
}

BaseCheckout.propTypes = {
  logbookRefName: PropTypes.string.isRequired,
  registryAccessRefName: PropTypes.string.isRequired,
  registryIdName: PropTypes.string.isRequired,
  welcomeName: PropTypes.string.isRequired
};

export default BaseCheckout;
