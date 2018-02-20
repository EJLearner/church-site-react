import React, {Component} from 'react';

import firebase, {auth, provider} from '../../firebase';
import moment from 'moment';

import Text from '../Reusable/Text/Text';
import Button from '../Reusable/Button/Button';
import Checklist from '../Reusable/Checklist/Checklist';

import './Admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnnouncement: false,
      followsWorship: false,
      name: '',
      date: '',
      dates: {},
      longDescription: '',
      removeKey: '',
      timeEnd: '',
      timeStart: '',
      title: '',
      user: null
    };

    this._onChange = this._onChange.bind(this);
    this._getTime = this._getTime.bind(this);
    this._submit = this._submit.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
  }

  componentDidMount() {
    // FBH get a reference for the 'dates' top level prop of the data
    const datesRef = firebase.database().ref('dates');

    // FBH add a listener to the dates object, update on value change (guessing)
    // listener gets the dates object using snapshot.val();
    // then pushes the udpated date object into the state
    datesRef.on('value', snapshot => {
      const dates = snapshot.val();

      this.setState({
        dates
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

  _getTime(type) {
    const {date, timeStart, timeEnd} = this.state;

    const time = type === 'start' ? timeStart : timeEnd;

    if (time) {
      const timeMoment = time ? moment(time, 'h:mm a', true) : null;

      if (timeMoment.isValid()) {
        const dateTimeMoment = moment(date, 'YYYY-MM-DD').set({
          hour: timeMoment.hour(),
          minute: timeMoment.minute()
        });

        return dateTimeMoment.format('YYYY-MM-DDTHH:mm:ss');
      }
    }

    return time ? false : null;
  }

  _isValid(event) {
    const {title, timeStart, timeEnd} = event;

    return title && timeStart !== false && timeEnd !== false;
  }

  _submit() {
    // FBH get 'dates' reference from firebase
    const {
      date,
      title,
      longDescription,
      followsWorship,
      isAnnouncement
    } = this.state;

    const hasValidDate = moment(date, 'YYYY-MM-DD', true).isValid();

    // make new date object
    const event = {
      title: title,
      timeStart: this._getTime('start'),
      timeEnd: this._getTime('end'),
      longDescription: longDescription || null,
      followsWorship: followsWorship || null,
      isAnnouncement: isAnnouncement || null
    };

    const isDataValid = this._isValid(event) && hasValidDate;

    if (isDataValid) {
      const dateRef = firebase.database().ref(`dates/${date}/events`);

      // push date object into 'dates' reference

      dateRef.push(event);

      // reset textboxes to empty
      this.setState({
        date: '',
        title: '',
        timeStart: '',
        timeEnd: '',
        longDescription: '',
        followsWorship: false,
        isAnnouncement: false
      });
    }
  }

  _removeItem() {
    // FBH get specific date reference from firebase using key
    const dateRef = firebase.database().ref(`/dates/${this.state.removeKey}`);
    dateRef.remove();
  }

  _renderItems() {
    return <pre>{JSON.stringify(this.state.dates, null, 4)}</pre>;
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

  _getOptionsList() {
    return [
      {
        checked: this.state.isAnnouncement,
        label: 'Announcement',
        value: 'isAnnouncement'
      },
      {
        checked: this.state.followsWorship,
        label: 'Immediately Follows Worship',
        value: 'followsWorship'
      }
    ];
  }

  render() {
    return this.state.user ? (
      <div>
        <Button onClick={this._logout}>Log out</Button>
        <p>Add Item</p>
        <Text
          id="date"
          label="Date"
          onChange={this._onChange}
          placeholder="YYYY-MM-DD"
          value={this.state.date}
        />
        <Text
          id="title"
          label="Title"
          onChange={this._onChange}
          value={this.state.title}
        />
        <Text
          id="timeStart"
          label="Start Time"
          onChange={this._onChange}
          placeholder="HH:MM am"
          value={this.state.timeStart}
        />
        <Text
          id="timeEnd"
          label="End Time"
          onChange={this._onChange}
          placeholder="HH:MM am"
          value={this.state.timeEnd}
        />
        <div>
          <Text
            columns={80}
            id="longDescription"
            label="Long Description"
            onChange={this._onChange}
            textArea
            value={this.state.longDescription}
          />
        </div>

        <Checklist
          checklistItems={this._getOptionsList()}
          id="options-checklist"
          label="Options"
          onChange={this._onChange}
        />

        <div>
          <Button onClick={this._submit}>Submit</Button>
        </div>
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
    ) : (
      <Button onClick={this._login}>Log in</Button>
    );
  }
}

export default Admin;
