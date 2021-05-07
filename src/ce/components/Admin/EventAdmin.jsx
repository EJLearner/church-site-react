import {Parser as HtmlToReactParser} from 'html-to-react';
import moment from 'moment';
import React, {Component} from 'react';

import Select from '../../../common/components/Select';
import Textarea from '../../../common/components/Textarea';
import Textbox from '../../../common/components/Textbox';
import firebase from '../../../firebase';
import commonUtils from '../../../utils/commonUtils';
import constants from '../../../utils/constants';
import {format, parse} from '../../../utils/dateTimeUtils';
import Button from '../Reusable/Button/Button';
import Checklist from '../Reusable/Checklist/Checklist';

const TIME_FORMAT = {
  SIMPLE_TIME: 'h:mm a',
  DATE_TIME: 'YYYY-MM-DDTHH:mm:ss',
  STD_DATE: 'YYYY-MM-DD'
};

const MODES = {
  SINGLE_EVENT: 'SINGLE_EVENT',
  RECURRING: 'RECURRING'
};

class EventAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: constants.daysOfWeek.SUNDAY,
      isAnnouncement: false,
      followsWorship: false,
      name: '',
      date: '',
      dates: {},
      longDescription: '',
      recurrence: 'weekly',
      removeKey: '',
      timeEnd: '',
      timeStart: '',
      title: '',
      user: null
    };

    this.onChange = this.onChange.bind(this);
    this.getDateTimeFromSimple = this.getDateTimeFromSimple.bind(this);
    this.submit = this.submitSingleEvent.bind(this);
    this.editItem = this.editItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    // FBH get a reference for the 'dates' top level prop of the data
    const datesRef = firebase.database().ref('dates');

    // FBH add a listener to the dates object, update on value change (guessing)
    // listener gets the dates object using snapshot.val();
    // then pushes the udpated date object into the state
    datesRef.on('value', (snapshot) => {
      const dates = snapshot.val();

      this.setState({
        dates
      });
    });
  }

  onChange(value, id) {
    this.setState({[id]: value});
  }

  getDateTimeFromSimple(date, time) {
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

  getSimpleTimeFromDateTime(dateTimeString) {
    if (dateTimeString) {
      return moment(dateTimeString)
        .format(TIME_FORMAT.SIMPLE_TIME)
        .replace(/\./g, '');
    }

    return '';
  }

  isValid(event) {
    const {title, timeStart, timeEnd} = event;

    return title && timeStart !== false && timeEnd !== false;
  }

  submitSingleEvent(isNew, key) {
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
      timeStart: this.getDateTimeFromSimple(date, timeStart),
      timeEnd: this.getDateTimeFromSimple(date, timeEnd),
      longDescription: longDescription || null,
      followsWorship: followsWorship || null,
      isAnnouncement: isAnnouncement || null
    };

    const dataIsValid = this.isValid(event) && hasValidDate;

    if (dataIsValid) {
      const dateRef = firebase.database().ref(`dates/${date}/events`);
      if (isNew) {
        // push date object into 'dates' reference
        dateRef.push(event);
        this.resetData();
        this.setState({currentEdit: null});
      } else {
        const sameDate = date === originalDate;

        const eventRef = this.getEventRef(originalDate, key);
        if (sameDate) {
          eventRef.set(event);
        } else {
          eventRef.set(null);
          dateRef.push(event);
        }
      }
    } else {
      alert('Data invalid: Enter valid date and title.');
    }
  }

  submitRecurringEvent(isNew, key) {
    // FBH get 'dates' reference from firebase
    const {
      originalDate,
      day,
      date,
      recurrence,
      timeEnd,
      timeStart,
      title,
      longDescription,
      followsWorship,
      isAnnouncement
    } = this.state;

    const startDateObject =
      timeStart && parse(timeStart, 'hh:mm a', new Date());
    const endDateObject = timeEnd && parse(timeEnd, 'hh:mm a', new Date());
    // make new date object
    const event = {
      title: title,
      timeStart: timeStart ? format(startDateObject, 'HH:mm') : null,
      timeEnd: timeEnd ? format(endDateObject, 'HH:mm') : null,
      recurrence: {day: day, frequency: recurrence},
      longDescription: longDescription || null,
      followsWorship: followsWorship || null,
      isAnnouncement: isAnnouncement || null
    };

    if (this.isValid(event)) {
      const dateRef = firebase.database().ref(constants.FB_REC_EVENTS);
      if (isNew) {
        // push date object into 'dates' reference
        dateRef.push(event);
        this.resetData();
        this.setState({currentEdit: null});
      } else {
        const sameDate = date === originalDate;

        const eventRef = this.getEventRef(originalDate, key);
        if (sameDate) {
          eventRef.set(event);
        } else {
          eventRef.set(null);
          dateRef.push(event);
        }
      }
    } else {
      alert('Data invalid: Enter valid date and title.');
    }
  }

  resetData() {
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
  getEventRef(dateString, key) {
    return firebase.database().ref(`/dates/${dateString}/events/${key}`);
  }

  editItem(dateTitleKey, date, eventObject) {
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
      timeStart: this.getSimpleTimeFromDateTime(timeStart),
      timeEnd: this.getSimpleTimeFromDateTime(timeEnd),
      shortDescription,
      longDescription,
      isAnnouncement,
      followsWorship
    });
  }

  cancelEdit() {
    this.setState({currentEdit: null});
    this.resetData();
  }

  removeItem(dateString, key) {
    // FBH get specific date reference from firebase using key
    const eventRef = this.getEventRef(dateString, key);

    eventRef.once('value', (snapshot) => {
      const value = snapshot.val();
      const title = typeof value === 'string' ? value : value.title;
      const confirmMessage = `Are you sure you want to delete the event titled ${title}?`;

      if (window.confirm(confirmMessage)) {
        eventRef.remove();
      }
    });
  }

  renderItems() {
    const rows = [];

    const getTime = (dateTime) => (dateTime ? dateTime.substring(11) : '');
    const listOptions = (event) => {
      const options = ['isAnnouncement', 'followsWorship'];
      const enabledOptions = options.filter((option) => {
        return event[option];
      });

      return enabledOptions.join(', ');
    };

    commonUtils.lodashForEach(this.state.dates, (date, dateString) => {
      commonUtils.lodashForEach(date.events, (event, key) => {
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

          const dateTitleKey = dateString + title + timeStart;
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
                <div>{this.renderEditInputSingle(false, key)} </div>
              ) : (
                <div>
                  <Button
                    onClick={() =>
                      this.editItem(dateTitleKey, dateString, eventObject)
                    }
                  >
                    Edit
                  </Button>{' '}
                  <Button onClick={() => this.removeItem(dateString, key)}>
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

  getOptionsList({isAnnouncement, followsWorship}) {
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

  renderEditInputSingle(isNew, key) {
    return (
      <div>
        <Textbox
          id="date"
          label="Date"
          onChange={this.onChange}
          placeholder="YYYY-MM-DD"
          required
          value={this.state.date}
        />
        <Textbox
          id="title"
          label="Title"
          onChange={this.onChange}
          required
          value={this.state.title}
        />
        <Textbox
          id="timeStart"
          label="Start Time"
          onChange={this.onChange}
          placeholder="HH:MM am"
          value={this.state.timeStart}
        />
        <Textbox
          id="timeEnd"
          label="End Time"
          onChange={this.onChange}
          placeholder="HH:MM am"
          value={this.state.timeEnd}
        />
        <div>
          <Textarea
            columns={80}
            id="longDescription"
            label="Long Description"
            onChange={this.onChange}
            textArea
            value={this.state.longDescription || ''}
          />
        </div>
        <Checklist
          checklistItems={this.getOptionsList(this.state)}
          id="options-checklist"
          label="Options"
          onChange={this.onChange}
        />
        <div>
          <Button onClick={() => this.submitSingleEvent(isNew, key)}>
            Submit
          </Button>
          <Button onClick={this.cancelEdit}>Cancel</Button>
        </div>
      </div>
    );
  }

  renderEditInputRecurring(isNew, key) {
    return (
      <div>
        <Textbox
          id="title"
          label="Title"
          onChange={this.onChange}
          required
          value={this.state.title}
        />
        <Select
          id="day"
          label="Weekday"
          onChange={this.onChange}
          options={Object.entries(constants.daysOfWeek).map(
            ([dayOfWeek, value]) => ({
              label: commonUtils.titleCase(dayOfWeek),
              value
            })
          )}
          required
          value={this.state.day}
        />
        Occurs weekly&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {/* TODO: allow more options for frecurrence */}
        {/* <Select
          id="recurrence"
          label="Recurrence"
          onChange={this.onChange}
          options={[{label: 'Weekly', value: 'weekly'}]}
          required
          value={this.state.recurrence}
        /> */}
        <Textbox
          id="timeStart"
          label="Start Time"
          onChange={this.onChange}
          placeholder="HH:MM am"
          value={this.state.timeStart}
        />
        <Textbox
          id="timeEnd"
          label="End Time"
          onChange={this.onChange}
          placeholder="HH:MM am"
          value={this.state.timeEnd}
        />
        <div>
          <Textarea
            columns={80}
            id="longDescription"
            label="Long Description"
            onChange={this.onChange}
            textArea
            value={this.state.longDescription || ''}
          />
        </div>
        <Checklist
          checklistItems={this.getOptionsList(this.state)}
          id="options-checklist"
          label="Options"
          onChange={this.onChange}
        />
        <div>
          <Button onClick={() => this.submitRecurringEvent(isNew, key)}>
            Submit
          </Button>
          <Button onClick={this.cancelEdit}>Cancel</Button>
        </div>
      </div>
    );
  }

  render() {
    const {currentEdit} = this.state;

    const addingSingleEvent = currentEdit === MODES.SINGLE_EVENT;
    const addingRecurringEvent = currentEdit === MODES.RECURRING;

    return (
      <div>
        <div>
          <Button
            onClick={() => {
              this.setState({currentEdit: MODES.SINGLE_EVENT});
            }}
          >
            Add One Time Event
          </Button>
          <Button
            onClick={() => {
              this.setState({currentEdit: MODES.RECURRING});
            }}
          >
            Add Recurring Event
          </Button>
        </div>
        {addingSingleEvent && this.renderEditInputSingle(true)}
        {addingRecurringEvent && this.renderEditInputRecurring(true)}
        <div>{this.renderItems()}</div>
      </div>
    );
  }
}

export default EventAdmin;
