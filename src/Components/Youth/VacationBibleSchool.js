import React, {Component} from 'react';
import {Redirect} from 'react-router';

import Button from '../Reusable/Button/Button';

class VacationBibleSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._setPageState = this._setPageState.bind(this);
  }

  _setPageState(path) {
    this.setState({redirect: path});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={'/' + this.state.redirect} />;
    }

    return (
      <div>
        <h2>Vacation Bible School</h2>
        <p>
          We hold our week-long Vacation Bible School during the first full week
          after the fourth of July. At City Temple, students enjoy an
          interactive, engaging, Bible-based good time as they begin their
          journey to spiritual maturity. After a high-energy opening assembly,
          the students separate into groups by age to go to their classrooms.
          Throughout the week, students learn bible verses, songs, and how to
          apply their lessons to their everyday lives. Each class also prepares
          a special activity to perform or display during our closing assembly
          held on Friday evening. We use themed curriculum programs to keep our
          kids engaged and give organizers inspiration in planning
          biblically-based games, arts and crafts, songs, dramatic play, and
          outdoor activities.
        </p>
        <p>
          We offer training to our VBS staff to stay current on the best ways to
          educate our children. Our Security and Transition Team assists the
          teachers and aides with moving the children throughout the church,
          ensuring a safe and secure environment.
        </p>
        <p>
          All of our meals are wholesome and healthy and include a protein and a
          veggie. Whether your child is home-grown at City Temple, a returning
          VBS kid, or a brand new student, we are sure they will find something
          new and exciting at City Temple’s VBS!
        </p>
        <h2>Volunteer</h2>
        <p>
          Our VBS volunteer staff enable us to provide the best safety, energy,
          entertainment, and education in Baltimore City.
        </p>
        <h3 className="list-desc">
          Please consider volunteering in any of the areas below:
        </h3>
        <ul>
          <li>Teaching</li>
          <li>Assisting the Teacher</li>
          <li>Registration</li>
          <li>Meal Preparation</li>
          <li>Security/Transitioning Team</li>
          <li>Leading devotions</li>
        </ul>
        <h3 className="list-desc">You can also support us by donating:</h3>
        <ul>
          <li>Pencils, notebook paper, crayons, etc.</li>
          <li>Craft kits</li>
          <li>Healthy snacks</li>
        </ul>
        <div className="volunt-reg-buttons">
          <Button
            className="left-button vbs"
            onClick={this._setPageState.bind(
              null,
              'vbs-registration-volunteer'
            )}
            style={Button.STYLES.RECT}
          >
            Volunteer
          </Button>
          <Button
            className="right-button vbs"
            onClick={this._setPageState.bind(null, 'vbs-registration-child')}
            style={Button.STYLES.RECT}
          >
            Register
          </Button>
        </div>
      </div>
    );
  }
}

export default VacationBibleSchool;
