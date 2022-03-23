import React, {Component} from 'react';
import {Redirect} from 'react-router';

import routePaths from '../../../routePaths';
import ContactLine from '../Reusable/ContactLine';

import VolunteerSect from './Shared/VolunteerSect';

class ChildrensChurch extends Component {
  state = {};

  _setPageState(path) {
    this.setState({redirect: path});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }

    return (
      <div>
        <h2>Children’s Church</h2>
        <ContactLine address={ContactLine.ADDRESSES.AJONES} />
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
          Children’s Church meets every <strong>second</strong> and{' '}
          <strong>third</strong> Sunday beginning at 9 am downstairs in the
          undercroft.
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
          registerChildButtonOnClick={() =>
            this._setPageState(routePaths.CE_CC_REG_CHILD)
          }
          volunteerButtonOnClick={() =>
            this._setPageState(routePaths.CE_CC_REG_VOLUNTEER)
          }
        />
      </div>
    );
  }
}

export default ChildrensChurch;
