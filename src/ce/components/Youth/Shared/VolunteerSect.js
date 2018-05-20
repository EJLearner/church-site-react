import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '../../Reusable/Button/Button';

class VolunteerSect extends Component {
  render() {
    const {
      buttonClass,
      name,
      registerButtonOnClick,
      volunteerButtonOnClick
    } = this.props;

    return (
      <div>
        <h2>Volunteer</h2>
        <p>
          Our {name} volunteer staff enable us to provide the best safety,
          energy, entertainment, and education in Baltimore City.
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
            buttonShape={Button.STYLES.RECT}
            className={`left-button ${buttonClass}`}
            onClick={volunteerButtonOnClick}
          >
            Volunteer
          </Button>
          <Button
            buttonShape={Button.STYLES.RECT}
            className={`right-button ${buttonClass}`}
            onClick={registerButtonOnClick}
          >
            Register
          </Button>
        </div>
      </div>
    );
  }
}

VolunteerSect.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  registerButtonOnClick: PropTypes.func.isRequired,
  volunteerButtonOnClick: PropTypes.func.isRequired
};

export default VolunteerSect;
