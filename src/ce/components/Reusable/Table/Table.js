import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
  _renderRowCells(row) {
    return this.props.columns.map(column => {
      return <td key={row.id + column.name}>{row[column.name]}</td>;
    });
  }

  _renderTableRows() {
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
        <tbody>{this._renderTableRows()}</tbody>
      </table>
    );
  }
}

Table.defaultProps = {};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};

export default Table;
