import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Droplist.css';

class Droplist extends Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    this.props.onChange(event.target.value, this.props.id, event);
  }

  _renderedOptions(options) {
    return options.map(option => {
      const {label, value} = option;

      return (
        <option key={value} value={value}>
          {label}
        </option>
      );
    });
  }

  render() {
    const {options, value, title} = this.props;

    return (
      <div className="select-outer-div">
        {title && <div>{title}</div>}
        <select onChange={this._onChange} value={value}>
          {this._renderedOptions(options)}
        </select>
      </div>
    );
  }
}

Droplist.propTypes = {
  id: PropTypes.string,
  // is called onChange with value, id, event as arguments
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  title: PropTypes.string,
  value: PropTypes.string
};

export default Droplist;
