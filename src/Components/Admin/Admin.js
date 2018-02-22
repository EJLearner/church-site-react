import _ from 'lodash';
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

  _removeItem(dateString, key) {
    // FBH get specific date reference from firebase using key
    const dateRef = firebase
      .database()
      .ref(`/dates/${dateString}/events/${key}`);

    dateRef.once('value', snapshot => {
      const value = snapshot.val();

      const title = typeof value === 'string' ? value : value.title;

      if (
        window.confirm(
          `Are you sure you want to delete the event titled ${title}?`
        )
      ) {
        dateRef.remove();
      }
    });
  }

  _renderItems() {
    const rows = [];

    const getTime = dateTime => (dateTime ? dateTime.substring(11) : '');

    _.forEach(this.state.dates, (date, dateString) => {
      _.forEach(date.events, (event, key) => {
        const eventObject = typeof event === 'string' ? {title: event} : event;
        const {
          title,
          timeStart,
          timeEnd,
          shortDescription,
          longDescription
        } = eventObject;

        rows.push(
          <div className="event-item" key={dateString + title}>
            <strong>{title}</strong>
            <ul>
              <li>Date: {dateString}</li>
              <li>Start: {getTime(timeStart)}</li>
              <li>End: {getTime(timeEnd)}</li>
              <li>Short Description: {shortDescription}</li>
              <li>Long Description: {longDescription}</li>
            </ul>
            <Button onClick={_.partial(this._removeItem, dateString, key)}>
              Remove
            </Button>
          </div>
        );
      });
    });

    return <div>{rows}</div>;
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
      <div className="admin-page">
        Logged in as {this.state.user.displayName}{' '}
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
        <div>{this._renderItems()}</div>
      </div>
    ) : (
      <div className="admin-page">
        <Button onClick={this._login}>Log in</Button>
      </div>
    );
  }
}

export default Admin;
