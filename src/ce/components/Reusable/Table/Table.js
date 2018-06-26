import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import commonUtils from '../../../../utils/commonUtils';

class Table extends Component {
  _renderRowCells(row) {
    return this.props.columns.map(column => {
      return <td key={row.id + column.name}>{row[column.name]}</td>;
    });
  }

  _renderVolunteersTableRows(keys) {
    return this.props.rows.map(row => {
      return <tr key={row.id}>{this._renderRowCells(row)}</tr>;
    });
  }

  _renderHeaderCells() {
    return this.props.columns.map(column => {
      return <th key={column.name}>{column.label}</th>;
    });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>{this._renderHeaderCells()}</tr>
        </thead>
        <tbody>{this._renderVolunteersTableRows()}</tbody>
      </table>
    );
  }
}

Table.defaultProps = {};

Table.propTypes = {
  column: PropTypes.array,
  rows: PropTypes.array,
  className: PropTypes.string
};

export default Table;
