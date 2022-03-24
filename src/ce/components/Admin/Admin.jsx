import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import firebase, {auth, provider} from '../../../firebase';
import routePaths from '../../../routePaths';
import MenuBar from '../MenuBar/MenuBar';
import Button from '../Reusable/Button/Button';

import CcVbsAdminBase from './CcVbsAdminBase';
import EventAdmin from './EventAdmin';
import SubscribedEmailsAdmin from './SubscribedEmailsAdmin';
import './Admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // update adminUsers state based on firebase data status
    const adminUsersRef = firebase.database().ref('user_groups/admins');

    adminUsersRef.on('value', (snapshot) => {
      const adminUsers = snapshot.val();
      this.setState({adminUsers});
    });

    // keeps user logged in on a page refresh
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
    });
  }

  login() {
    auth.signInWithPopup(provider).then((result) => {
      const {user} = result;
      this.setState({user});
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({user: null});
    });
  }

  eventAdminPage() {
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

  generateLinks() {
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
          <MenuBar links={this.generateLinks()} />
          Logged in as {user.displayName}{' '}
          <Button onClick={this.logout}>Log out</Button>
          <Switch>
            <Route path={routePaths.ADMIN_EVENTS}>
              <EventAdmin />
            </Route>
            <Route path={routePaths.ADMIN_CC}>
              <CcVbsAdminBase stringPrefix="cc" />
            </Route>
            <Route path={routePaths.ADMIN_VBS}>
              <CcVbsAdminBase stringPrefix="vbs" />
            </Route>
            <Route
              component={SubscribedEmailsAdmin}
              path={routePaths.ADMIN_EMAIL_SUBSCRIBERS}
            />
          </Switch>
        </div>
      );
    }

    return (
      <div className="admin-page">
        <Button onClick={this.login}>Log in</Button>
      </div>
    );
  }
}

export default Admin;
