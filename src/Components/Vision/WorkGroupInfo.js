import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './WorkGroupInfo.css';

class WorkGroupInfo extends Component {
  _renderOutcomesList(outcomes) {
    const outcomesListItems = outcomes.map((outcome, index) => {
      return <li key={index}>{outcome}</li>;
    });

    return <ul className="outcomes-list">{outcomesListItems}</ul>;
  }

  render() {
    const {goal, name, outcomes, purpose} = this.props;

    return (
      <div>
        <h3>{name}</h3>
        <div>
          <span className="type">Purpose:</span> {purpose}
        </div>
        <div>
          <span className="type">Outcomes:</span>{' '}
          {this._renderOutcomesList(outcomes)}
        </div>
        <div className="goal">
          <span className="type">Goal:</span> {goal}
        </div>
      </div>
    );
  }
}

WorkGroupInfo.propTypes = {
  goal: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  outcomes: PropTypes.arrayOf(PropTypes.string).isRequired,
  purpose: PropTypes.string.isRequired
};

export default WorkGroupInfo;
