import '../../firebaseApp';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {getDatabase, ref, onValue} from 'firebase/database';
import {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import styled from 'styled-components';

import choir from '../../assets/images/choir.jpg';
import routePaths from '../../routePaths';
import Menubar from '../Menubar';
import Button from '../commonComponents/Button/Button';
import Textbox from '../commonComponents/Textbox';

import CcVbsAdminBase from './CcVbsAdminBase';
import EventAdmin from './EventAdmin';
import SubscribedEmailsAdmin from './SubscribedEmailsAdmin';
const provider = new GoogleAuthProvider();
const auth = getAuth();

const StyledAdminPage = styled.div`
  background-color: var(--light-background);
  color: var(--text-on-light-background);
  padding-bottom: var(--page-bottom-padding);
  min-height: 100%;

  .login-info-and-button {
    margin-bottom: 1em;
  }

  table {
    border-collapse: collapse;
    border: 1px solid black;
    overflow-y: scroll;
  }

  table td,
  table th {
    border: 1px solid black;
    padding: 0.5em;
  }

  .admin-content {
    padding: 1em;
    margin: 0 64px;
  }

  .event-item {
    border: 1px solid black;
    font-family: var(--code);
    margin-top: 1em;
    padding: 0.5em;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    max-width: 320px;

    .login-error {
      color: red;
    }

    .forgot-password {
      background: none;
      border: none;
      color: var(--maroon);
      cursor: pointer;
      padding: 0;
      text-align: left;
      text-decoration: underline;
    }

    .login-divider {
      border-top: 1px solid var(--charcoal-grey);
      margin: 0.5em 0;
      text-align: center;

      span {
        background: var(--light-background);
        padding: 0 0.5em;
        position: relative;
        top: -0.75em;
      }
    }
  }
`;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.sendPasswordReset = this.sendPasswordReset.bind(this);

    this.state = {
      user: null,
      adminUser: null,
      email: '',
      password: '',
      loginError: null,
      resetSent: false,
    };
  }

  componentDidMount() {
    // update adminUsers state based on firebase data status
    const db = getDatabase();
    const adminUsersRef = ref(db, 'user_groups/admins');

    onValue(adminUsersRef, (snapshot) => {
      const adminUsers = snapshot.val();
      this.setState({adminUsers});
    });

    // keeps user logged in on a page refresh
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({user});
      }
    });
  }

  login() {
    signInWithPopup(auth, provider).then((result) => {
      const {user} = result;
      this.setState({user});
    });
  }

  loginWithEmail(event) {
    event.preventDefault();
    const {email, password} = this.state;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        this.setState({user: result.user, loginError: null});
      })
      .catch((err) => {
        const messages = {
          'auth/invalid-credential': 'Incorrect email or password.',
          'auth/user-not-found': 'No account found with that email.',
          'auth/wrong-password': 'Incorrect password.',
          'auth/too-many-requests': 'Too many attempts. Try again later.',
        };
        this.setState({
          loginError: messages[err.code] ?? 'Login failed. Please try again.',
        });
      });
  }

  sendPasswordReset() {
    const {email} = this.state;
    if (!email) {
      this.setState({loginError: 'Enter your email address above first.'});
      return;
    }
    sendPasswordResetEmail(auth, email).then(() => {
      this.setState({resetSent: true, loginError: null});
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({user: null});
    });
  }

  generateLinks() {
    const {
      adminUsers,
      ccRegAccess,
      emailSubscribersAccess,
      vbsRegAccess,
      user,
    } = this.state;

    const uid = user?.uid;
    const isAdmin = user && adminUsers?.[uid];
    const adminPath = '/admin/';

    return [
      {text: 'Home', path: '/'},
      isAdmin && {path: adminPath + routePaths.ADMIN_EVENTS, text: 'Events'},
      (isAdmin || ccRegAccess?.[uid]) && {
        path: adminPath + routePaths.ADMIN_CC,
        text: 'Children’s Church',
      },
      (isAdmin || vbsRegAccess?.[uid]) && {
        path: adminPath + routePaths.ADMIN_VBS,
        text: 'VBS',
      },
      (isAdmin || emailSubscribersAccess?.[uid]) && {
        path: adminPath + routePaths.ADMIN_EMAIL_SUBSCRIBERS,
        text: 'Email Subscribers List',
      },
    ].filter(Boolean);
  }

  renderContent() {
    const {user} = this.state;

    if (user) {
      return (
        <div className="admin-page">
          <div className="login-info-and-button">
            Logged in as {user.displayName}{' '}
            <Button onClick={this.logout}>Log out</Button>
          </div>

          <Routes>
            <Route element={<EventAdmin />} path={routePaths.ADMIN_EVENTS} />
            <Route
              element={<CcVbsAdminBase stringPrefix="cc" />}
              path={routePaths.ADMIN_CC}
            />
            <Route
              element={<CcVbsAdminBase stringPrefix="vbs" />}
              path={routePaths.ADMIN_VBS}
            />
            <Route
              element={<SubscribedEmailsAdmin />}
              path={routePaths.ADMIN_EMAIL_SUBSCRIBERS}
            />
          </Routes>
        </div>
      );
    }

    const {email, password, loginError, resetSent} = this.state;

    return (
      <div className="login-form">
        <form onSubmit={this.loginWithEmail}>
          <div className="login-info-and-button">
            <Textbox
              id="login-email"
              label="Email"
              onChange={(value) => this.setState({email: value})}
              type="email"
              value={email}
            />
          </div>
          <div className="login-info-and-button">
            <Textbox
              id="login-password"
              label="Password"
              onChange={(value) => this.setState({password: value})}
              type="password"
              value={password}
            />
          </div>
          {loginError && <div className="login-error">{loginError}</div>}
          {resetSent && <div>Password reset email sent.</div>}
          <Button type="submit">Sign in</Button>
          <button
            className="forgot-password"
            onClick={this.sendPasswordReset}
            type="button"
          >
            Forgot password?
          </button>
        </form>
        <div className="login-divider">
          <span>or</span>
        </div>
        <Button onClick={this.login}>Sign in with Google</Button>
      </div>
    );
  }

  render() {
    return (
      <StyledAdminPage>
        <Menubar imageSource={choir} menuItems={this.generateLinks()} />
        <div className="admin-content">{this.renderContent()}</div>
      </StyledAdminPage>
    );
  }
}

export default Admin;
