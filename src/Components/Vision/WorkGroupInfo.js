import React, {Component} from 'react';
import PropTypes from 'prop-types';

class WorkGroupInfo extends Component {
  _renderOutcomesList(outcomes) {
    const outcomesListItems = outcomes.map((outcome, index) => {
      return <li key={index}>{outcome}</li>;
    });

    return <ol>{outcomesListItems}</ol>;
  }

  render() {
    const {goal, name, outcomes, purpose} = this.props;

    return (
      <div>
        <h3>{name}</h3>
        Purpose: {purpose}
        <br />
        Outcomes: {this._renderOutcomesList(outcomes)}
        <br />
        Goal: {goal}
        <br />
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
