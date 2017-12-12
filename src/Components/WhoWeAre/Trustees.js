import React, {Component} from 'react';
import ContactLine from '../Reusable/ContactLine';

class Trustees extends Component {
  render() {
    return (
      <div>
        <h2>Trustees</h2>
        <ContactLine address={ContactLine.ADDRESSES.JBT} />
        <ul className="ce-list-half">
          <li>
            Joyce Baylor-Thompson<span className="title">Chairperson</span>
          </li>
          <li>
            Cora Gordon<span className="title">Co-chair</span>
          </li>
          <li>Delores Allen</li>
          <li>Willis Christian</li>
          <li>Joyce Hall</li>
          <li>Gary Hamiel</li>
        </ul>
        <ul className="ce-list-half">
          <li>
            Edward Holden<span className="title">Retired</span>
          </li>
          <li>
            Juanita Morton<span className="title">Retired</span>
          </li>
          <li>Charles Payne</li>
          <li>Gilbert Richards</li>
          <li>Jerome Richards</li>
          <li>
            Gladys Smith<span className="title">Retired</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Trustees;
