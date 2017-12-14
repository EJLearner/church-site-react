import React, {Component} from 'react';

import ContactLine from '../Reusable/ContactLine';

class Ushers extends Component {
  render() {
    return (
      <div>
        <h2>Ushers</h2>
        <ContactLine address={ContactLine.ADDRESSES.PWARD} />
        <p>
          The purpose of the Youth and Junior Usher Ministry of The City Temple
          of Baltimore (Baptist) Church is to edify the body of Christ by
          welcoming, assisting and showing hospitality to our members, visitors,
          and friends. The Youth Usher Advisor and members of the church
          spiritually nurtures and elevates our youth interested in working in
          the Ushers Minister, and help prepare them for the responsibilities of
          the Senior Usher Ministry.
        </p>
        <p>
          As doorkeepers of the church, City Temple’s Youth Ushers provide a
          footprint for upcoming youth to follow the teachings of our Lord and
          Savior Jesus Christ.
        </p>
        <p>The Youth Usher Advisor: Deacon Patricia Ward</p>
        <p>Youth Leader: Joshua Lindsey</p>
        <ul className="ce-list-half">
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
          <li>Deacon Racquel Smith</li>
        </ul>
        <ul className="ce-list-half">
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

export default Ushers;
