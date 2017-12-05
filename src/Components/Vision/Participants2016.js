import React, {Component} from 'react';
import retreatPicture from './retreat-picture.jpg';

class Participants2016 extends Component {
  render() {
    return (
      <div>
        <h2>Retreat Participants</h2>
        <img
          alt="retreat participants"
          src={retreatPicture}
          style={{width: '100%'}}
        />

        <ul className="ce-list-half">
          <li>Linda Alexander</li>
          <li>Delores Allen</li>
          <li>Debbie Bates</li>
          <li>Patricia Bonaparte</li>
          <li>Irene Brown</li>
          <li>Violet Churn</li>
          <li>Gloria Cook</li>
          <li>John Davenport</li>
          <li>Lanette Davis</li>
          <li>Iris Ford</li>
          <li>Lori Ford</li>
          <li>Cora Gordon</li>
          <li>Gary Hamiel</li>
          <li>Michele Hamiel</li>
          <li>Jackie Hamilton</li>
          <li>Ellen Harvey</li>
          <li>Deborah Hickman</li>
          <li>Edward Holden</li>
          <li>Nadena Holden</li>
          <li>Maelena Holman</li>
          <li>Cathy Hurst</li>
          <li>Alan James</li>
          <li>Marshell Jenkins</li>
          <li>April Jones</li>
          <li>Earl Jones</li>
          <li>Marlene Jones</li>
        </ul>
        <ul className="ce-list-half">
          <li>Tyres Jones</li>
          <li>Candace McNeal</li>
          <li>Davina Morton</li>
          <li>Elaine Rather</li>
          <li>Bernice Reed</li>
          <li>Greg Reed</li>
          <li>Vonda Reed</li>
          <li>Larry Revell</li>
          <li>Trudy Revell</li>
          <li>Irma Riddick</li>
          <li>Willie Simmons</li>
          <li>Bernadine Smiley</li>
          <li>Racquel Smith</li>
          <li>Susan Spears</li>
          <li>Janet Stewart</li>
          <li>William Stewart</li>
          <li>Joyce Thompson</li>
          <li>Emily Tilghman</li>
          <li>Randy Tilghman</li>
          <li>Lilly Traynham</li>
          <li>Patricia Ward</li>
          <li>Michele Williams</li>
          <li>Henry Womack</li>
          <li>Grady Yeargin</li>
          <li>Patricia Yeargin</li>
        </ul>
      </div>
    );
  }
}

export default Participants2016;
