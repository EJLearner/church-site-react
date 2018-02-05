import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import {withRouter} from 'react-router-dom';

import moment from 'moment';
import firebase, {auth, provider} from '../../firebase';

import Text from '../Reusable/Text/Text';
import Button from '../Reusable/Button/Button';

import _ from 'lodash';

import './Admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {name: '', item: '', items: [], removeKey: '', user: null};

    this._onChange = this._onChange.bind(this);
    this._submit = this._submit.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
  }

  componentDidMount() {
    // FBH get a reference for the 'items' top level prop of the data
    const itemsRef = firebase.database().ref('items');

    // FBH add a listener to the items object, update on value change (guessing)
    // listener gets the items object using snapshot.val();
    // then pushes the udpated item object into the state
    itemsRef.on('value', snapshot => {
      const items = snapshot.val();
      const newState = [];

      _.forEach(items, (item, key) => {
        newState.push({
          id: key,
          title: item.title,
          user: item.user
        });
      });

      this.setState({
        items: newState
      });
    });

    // keeps user logged in on a page refresh
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
      }
    });
  }

  _onChange(value, id) {
    this.setState({[id]: value});
  }

  _submit() {
    // FBH get 'items' reference from firebase
    const itemsRef = firebase.database().ref('items');

    // make new item object
    const item = {
      title: this.state.item,
      user: this.state.name
    };

    // push item object into 'items' reference
    itemsRef.push(item);

    // reset textboxes to empty
    this.setState({
      item: '',
      name: ''
    });
  }

  _removeItem() {
    // FBH get specific item reference from firebase using key
    const itemRef = firebase.database().ref(`/items/${this.state.removeKey}`);
    itemRef.remove();
  }

  _renderItems() {
    return this.state.items.map(item => {
      return (
        <div key={item.id}>
          {item.id} {item.title} {item.user}
        </div>
      );
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

  render() {
    return (
      <div>
        {this.state.user ? (
          <Button onClick={this._logout}>Log out</Button>
        ) : (
          <Button onClick={this._login}>Log in</Button>
        )}
        <p>Add Item</p>
        <Text
          id="name"
          label="name"
          onChange={this._onChange}
          value={this.state.name}
        />
        <Text
          id="item"
          label="item"
          onChange={this._onChange}
          value={this.state.item}
        />
        <Button onClick={this._submit}>Submit</Button>
        <p>Remove Item</p>
        <Text
          id="removeKey"
          label="Key of Item To Remove"
          onChange={this._onChange}
          value={this.state.removeKey}
        />
        <Button onClick={this._removeItem}>Remove</Button>
        <div>{this._renderItems()}</div>
      </div>
    );
  }
}

Admin.defaultProps = {
  moreStuff: 'Default more stuff'
};

Admin.propTypes = {
  moreStuff: PropTypes.string
};

export default Admin;
