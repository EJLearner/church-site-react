import React, {Component} from 'react';
import retreatPicture from './retreat-picture.jpg';

class Handbook extends Component {
  render() {
    return (
      <div>
        <h2>Retreat Participants</h2>
        <img
          alt="retreat participants"
          src={retreatPicture}
          style={{width: '100%'}}
        />

        <ul id="ce-right-column-list">
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
        </ul>
      </div>
    );
  }
}

export default Handbook;
