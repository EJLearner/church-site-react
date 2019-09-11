import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import firebase, {auth, provider} from '../../../firebase';

import Button from '../Reusable/Button/Button';
import CcVbsAdminBase from './CcVbsAdminBase';
import EventAdmin from './EventAdmin';

import MenuBar from '../MenuBar/MenuBar';
import routePaths from '../../../routePaths';
import Switch from 'react-router-dom/Switch';
import {Route} from 'react-router-dom';

import './Admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
  }

  componentDidMount() {
    // update adminUsers state based on firebase data status
    const adminUsersRef = firebase.database().ref('user_groups/admins');

    adminUsersRef.on('value', snapshot => {
      const adminUsers = snapshot.val();
      this.setState({adminUsers});
    });

    // keeps user logged in on a page refresh
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
      }
    });
  }

  _login() {
    auth.signInWithPopup(provider).then(result => {
      const {user} = result;
      this.setState({user});
    });
  }

  _logout() {
    auth.signOut().then(() => {
      this.setState({user: null});
    });
  }

  _eventAdminPage() {
    const addingEvent = this.state.currentEdit === 'new';
    const onAddItemClick = () => {
      this.setState({currentEdit: 'new'});
    };

    return (
      <div>
        <div>
          <Button onClick={onAddItemClick}>Add Item</Button>
        </div>
        {addingEvent && this._renderEditInput(true)}
        <div>{this._renderItems()}</div>
      </div>
    );
  }

  _generateLinks() {
    const {
      adminUsers,
      ccRegAccess,
      emailSubscribersAccess,
      vbsRegAccess,
      user
    } = this.state;

    const paths = [];
    const {uid} = user;
    const isAdmin = adminUsers && adminUsers[uid];

    if (isAdmin) {
      paths.push({path: routePaths.ADMIN_EVENTS, text: 'Events'});
    }

    if (isAdmin || (ccRegAccess && ccRegAccess[uid])) {
      paths.push({path: routePaths.ADMIN_CC, text: 'Children’s Church'});
    }

    if (isAdmin || (vbsRegAccess && vbsRegAccess[uid])) {
      paths.push({path: routePaths.ADMIN_VBS, text: 'VBS'});
    }

    if (isAdmin || (emailSubscribersAccess && emailSubscribersAccess[uid])) {
      paths.push({
        path: routePaths.ADMIN_EMAIL_SUBSCRIBERS,
        text: 'Email Subscribers List'
      });
    }

    return paths;
  }

  render() {
    const {user} = this.state;

    if (user) {
      return (
        <div className="admin-page">
          <MenuBar links={this._generateLinks()} />
          Logged in as {user.displayName}{' '}
          <Button onClick={this._logout}>Log out</Button>
          <Switch>
            <Route
              path={routePaths.ADMIN_EVENTS}
              render={() => <EventAdmin />}
            />
            <Route
              path={routePaths.ADMIN_CC}
              render={() => <CcVbsAdminBase stringPrefix="cc" />}
            />
            <Route
              path={routePaths.ADMIN_VBS}
              render={() => <CcVbsAdminBase stringPrefix="vbs" />}
            />
          </Switch>
        </div>
      );
    }

    return (
      <div className="admin-page">
        <Button onClick={this._login}>Log in</Button>
      </div>
    );
  }
}

export default withRouter(Admin);
