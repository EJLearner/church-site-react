import _ from 'lodash';
import React, {Component} from 'react';
import firebase from '../../../firebase';
import moment from 'moment';
import {Parser as HtmlToReactParser} from 'html-to-react';

import Button from '../Reusable/Button/Button';
import Checklist from '../Reusable/Checklist/Checklist';
import Text from '../../../common/components/Text';

const TIME_FORMAT = {
  SIMPLE_TIME: 'h:mm a',
  DATE_TIME: 'YYYY-MM-DDTHH:mm:ss',
  STD_DATE: 'YYYY-MM-DD'
};

class EventAdmin extends Component {
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
    this._getDateTimeFromSimple = this._getDateTimeFromSimple.bind(this);
    this._submit = this._submit.bind(this);
    this._editItem = this._editItem.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._removeItem = this._removeItem.bind(this);
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
  }

  _onChange(value, id) {
    this.setState({[id]: value});
  }

  _getDateTimeFromSimple(date, time) {
    if (time) {
      const timeMoment = time
        ? moment(time, TIME_FORMAT.SIMPLE_TIME, true)
        : null;

      if (timeMoment.isValid()) {
        const dateTimeMoment = moment(date, TIME_FORMAT.STD_DATE).set({
          hour: timeMoment.hour(),
          minute: timeMoment.minute()
        });

        return dateTimeMoment.format(TIME_FORMAT.DATE_TIME);
      }
    }

    return time ? false : null;
  }

  _getSimpleTimeFromDateTime(dateTimeString) {
    if (dateTimeString) {
      return moment(dateTimeString)
        .format(TIME_FORMAT.SIMPLE_TIME)
        .replace(/\./g, '');
    }

    return '';
  }

  _isValid(event) {
    const {title, timeStart, timeEnd} = event;

    return title && timeStart !== false && timeEnd !== false;
  }

  _submit(isNew, key) {
    // FBH get 'dates' reference from firebase
    const {
      originalDate,
      date,
      timeEnd,
      timeStart,
      title,
      longDescription,
      followsWorship,
      isAnnouncement
    } = this.state;

    const hasValidDate = moment(date, TIME_FORMAT.STD_DATE, true).isValid();

    // make new date object
    const event = {
      title: title,
      timeStart: this._getDateTimeFromSimple(date, timeStart),
      timeEnd: this._getDateTimeFromSimple(date, timeEnd),
      longDescription: longDescription || null,
      followsWorship: followsWorship || null,
      isAnnouncement: isAnnouncement || null
    };

    const dataIsValid = this._isValid(event) && hasValidDate;

    if (dataIsValid) {
      if (isNew) {
        const dateRef = firebase.database().ref(`dates/${date}/events`);

        // push date object into 'dates' reference

        dateRef.push(event);
        this._resetData();
        this.setState({currentEdit: null});
      } else {
        const sameDate = date === originalDate;

        const eventRef = this._getEventRef(originalDate, key);
        if (sameDate) {
          eventRef.set(event);
        } else {
          eventRef.set(null);

          const dateRef = firebase.database().ref(`dates/${date}/events`);
          dateRef.push(event);
        }
      }
    }
  }

  _resetData() {
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

  // FBH get specific date reference from firebase using key
  _getEventRef(dateString, key) {
    return firebase.database().ref(`/dates/${dateString}/events/${key}`);
  }

  _editItem(dateTitleKey, date, eventObject) {
    const {
      isAnnouncement,
      followsWorship,
      title,
      timeStart,
      timeEnd,
      shortDescription,
      longDescription
    } = eventObject;

    this.setState({
      currentEdit: dateTitleKey,
      originalDate: date,
      date,
      title,
      timeStart: this._getSimpleTimeFromDateTime(timeStart),
      timeEnd: this._getSimpleTimeFromDateTime(timeEnd),
      shortDescription,
      longDescription,
      isAnnouncement,
      followsWorship
    });
  }

  _cancelEdit() {
    this.setState({currentEdit: null});
    this._resetData();
  }

  _removeItem(dateString, key) {
    // FBH get specific date reference from firebase using key
    const eventRef = this._getEventRef(dateString, key);

    eventRef.once('value', snapshot => {
      const value = snapshot.val();
      const title = typeof value === 'string' ? value : value.title;
      const confirmMessage = `Are you sure you want to delete the event titled ${title}?`;

      if (window.confirm(confirmMessage)) {
        eventRef.remove();
      }
    });
  }

  _renderItems() {
    const rows = [];

    const getTime = dateTime => (dateTime ? dateTime.substring(11) : '');
    const listOptions = event => {
      const options = ['isAnnouncement', 'followsWorship'];
      const enabledOptions = options.filter(option => {
        return event[option];
      });

      return enabledOptions.join(', ');
    };

    _.forEach(this.state.dates, (date, dateString) => {
      _.forEach(date.events, (event, key) => {
        if (event) {
          const eventObject =
            typeof event === 'string' ? {title: event} : event;
          const {
            title,
            timeStart,
            timeEnd,
            shortDescription,
            longDescription
          } = eventObject;

          const dateTitleKey = dateString + title;
          const currentlyEditing = dateTitleKey === this.state.currentEdit;
          const htmlToReactParser = new HtmlToReactParser();
          const longDescriptionRender = htmlToReactParser.parse(
            longDescription
          );

          rows.push(
            <div className="event-item" key={dateTitleKey}>
              <strong>{title}</strong>
              <ul>
                <li>Date: {dateString}</li>
                <li>Start: {getTime(timeStart)}</li>
                <li>End: {getTime(timeEnd)}</li>
                <li>Short Description: {shortDescription}</li>
                <li>Long Description: {longDescription}</li>
                <li>Options: {listOptions(event)}</li>
              </ul>
              {longDescription ? (
                <div>
                  <p>Long description appearance</p>
                  {longDescriptionRender}
                </div>
              ) : null}
              {currentlyEditing ? (
                <div>{this._renderEditInput(false, key)} </div>
              ) : (
                <div>
                  <Button
                    onClick={() =>
                      this._editItem(dateTitleKey, dateString, eventObject)
                    }
                  >
                    Edit
                  </Button>{' '}
                  <Button onClick={() => this._removeItem(dateString, key)}>
                    Remove
                  </Button>
                </div>
              )}
            </div>
          );
        }
      });
    });

    return <div>{rows}</div>;
  }

  _getOptionsList({isAnnouncement, followsWorship}) {
    return [
      {
        checked: Boolean(isAnnouncement),
        label: 'Announcement',
        value: 'isAnnouncement'
      },
      {
        checked: Boolean(followsWorship),
        label: 'Immediately Follows Worship',
        value: 'followsWorship'
      }
    ];
  }

  _renderEditInput(isNew, key) {
    return (
      <div>
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
            value={this.state.longDescription || ''}
          />
        </div>
        <Checklist
          checklistItems={this._getOptionsList(this.state)}
          id="options-checklist"
          label="Options"
          onChange={this._onChange}
        />
        <div>
          <Button onClick={event => this._submit(isNew, key, event)}>
            Submit
          </Button>
          <Button onClick={this._cancelEdit}>Cancel</Button>
        </div>
      </div>
    );
  }

  render() {
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
}

export default EventAdmin;
