import React, {Component} from 'react';

class ChristianEdStaff extends Component {
  render() {
    return (
      <div>
        <h2>Christian Education Staff</h2>
        <ul className="ce-list-half">
          <li>
            April S. Jones<span className="title">Co-chair</span>
          </li>
          <li>
            Davina Morton<span className="title">Co-chair</span>
          </li>
          <li>
            Linda Alexander<span className="title">Treasurer</span>
          </li>
          <li>Violet Churn</li>
          <li>Iris Ford</li>
        </ul>
        <ul className="ce-list-half">
          <li>Tyres Jones, Sr.</li>
          <li>Janet Stewart</li>
          <li>Emily Tilghman</li>
          <li>Min. Patricia A. Yeargin</li>
        </ul>
      </div>
    );
  }
}

export default ChristianEdStaff;
