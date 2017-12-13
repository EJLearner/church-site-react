import React, {Component} from 'react';
import {Redirect} from 'react-router';

import VolunteerSect from './Shared/VolunteerSect';

class ChildrensChurch extends Component {
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
        <h2>Children’s Church</h2>
        <p>
          Children’s Church provides an opportunity for children between the
          ages of 2-12 to learn about prayer, worship, and the word of God in an
          environment structured for them. Children’s Church takes place during
          the worship service, so parents have an opportunity to engage in the
          service free of distraction while the children get to learn about the
          bible and their faith on their level. Our curriculum is highly
          interactive and incorporates art, science, dance and music to bring
          the message of the Word to life. Students will also receive a meal
          after class is completed and before Sunday School begins.
        </p>
        <p>
          Children’s Church meets every <strong>second</strong> Sunday beginning
          at 9 am downstairs in the undercroft.
        </p>
        <p>
          <span className="bold">
            Scripture Focus: “I have no greater joy than to hear that my
            children are walking in the truth.”
          </span>
        </p>
        <VolunteerSect
          buttonClass="childrens-church"
          name="Children’s Church"
          registerButtonOnClick={this._setPageState.bind(
            null,
            'cc-registration-child'
          )}
          volunteerButtonOnClick={this._setPageState.bind(
            null,
            'cc-registration-volunteer'
          )}
        />
      </div>
    );
  }
}

export default ChildrensChurch;
