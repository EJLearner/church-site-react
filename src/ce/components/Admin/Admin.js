import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import firebase, {auth, provider} from '../../../firebase';

import Button from '../Reusable/Button/Button';
import CcAdmin from './CcAdmin';
import EventAdmin from './EventAdmin';
import VbsAdmin from './VbsAdmin';

import './Admin.css';
import MenuBar from '../MenuBar/MenuBar';
import Switch from 'react-router-dom/Switch';
import {Route} from 'react-router-dom';

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
      console.log(adminUsers);
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

  _ccAdminPage() {
    return <div>Children’s Church Admin Page Coming Soon</div>;
  }

  _vbsAdminPage() {
    return <div>VBS Admin Page Coming Soon</div>;
  }

  _generateLinks() {
    const paths = [];
    const {uid} = this.state.user;
    const isAdmin = this.state.adminUsers && this.state.adminUsers[uid];

    if (isAdmin) {
      paths.push({path: 'events-admin', text: 'Events'});
    }

    if (isAdmin || (this.state.ccRegAccess && this.state.ccRegAccess[uid])) {
      paths.push({path: 'cc-admin', text: 'Children’s Church'});
    }

    if (isAdmin || (this.state.vbsRegAccess && this.state.vbsRegAccess[uid])) {
      paths.push({path: 'vbs-admin', text: 'VBS'});
    }

    return paths;
  }

  render() {
    return this.state.user ? (
      <div className="admin-page">
        <MenuBar links={this._generateLinks()} />
        Logged in as {this.state.user.displayName}{' '}
        <Button onClick={this._logout}>Log out</Button>
        <Switch>
          <Route path="/admin/events-admin" render={EventAdmin} />
          <Route path="/admin/cc-admin" render={CcAdmin} />
          <Route path="/admin/vbs-admin" render={VbsAdmin} />
        </Switch>
      </div>
    ) : (
      <div className="admin-page">
        <Button onClick={this._login}>Log in</Button>
      </div>
    );
  }
}

export default withRouter(Admin);
