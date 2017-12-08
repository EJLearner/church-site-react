import React, {Component} from 'react';
import ContactLine from '../Reusable/ContactLine';

class Diaconate extends Component {
  render() {
    return (
      <div>
        <h2>Deacons</h2>
        <ContactLine address={ContactLine.ADDRESSES.RSMITH} />
        <p>
          Add this blurb beneath the contact line: The biblical role of deacons
          is to take care of the physical and logistical needs of the church, so
          that the Pastor can focus on his primary calling. The deacons set the
          tone for the congregation for worship by opening Sunday morning
          worship service with devotions. They are also tasked with preparing
          and distributing the communion elements on every first Sunday.
        </p>
        <p>
          Maintaining our church membership is a large portion of the
          responsibility of the deacons. Our deacons visit the sick and shut in
          among our congregation and commune them. They inform the pastor of
          members of the congregation who are sick, who have passed away, and
          need a visit from him for other reasons. They also mentor and assist
          those who have decided to join our congregation until they receive the
          right hand of fellowship.
        </p>
        <ul className="ce-list-half">
          <li>
            Deacon Racquel B. Smith<span className="title">Chairperson</span>
          </li>
          <li>
            Deacon Lilly Traynham<span className="title">Co-Chairperson</span>
          </li>
          <li>Deacon Patricia Bonaparte</li>
          <li>Deacon Gloria Brown</li>
          <li>Deacon Jonathan Brown</li>
          <li>Deacon Maelena Holman</li>
          <li>Deacon Doris Hunter</li>
          <li>Deacon Martha Ivey</li>
        </ul>
        <ul className="ce-list-half">
          <li>Deacon Cathy Neely-Hurst</li>
          <li>Deacon Gregory Reed</li>
          <li>Deacon Vonda Reed</li>
          <li>Deacon Larry Revell</li>
          <li>Deacon Willie Simmons</li>
          <li>Deacon Lucille Townsend</li>
          <li>Deacon a Patricia Ward</li>
          <li>Deacon Henry Womack</li>
        </ul>
      </div>
    );
  }
}

export default Diaconate;
