import React, {Component} from 'react';
import ContactLine from '../Reusable/ContactLine';

class Trustees extends Component {
  render() {
    return (
      <div>
        <h2>Trustees</h2>
        <ContactLine address={ContactLine.ADDRESSES.JBT} />
        <p>
          Trustees function as Christian stewards of property God has entrusted
          to the congregation. This includes supervising and maintaining both
          the physical property of the congregation and gifts made to the
          congregation so that each ministry in the church can operate
          effectively. Trustees also make sure all legal requirements related to
          the property are satisfied. Our trustees aim to be transparent and
          make the congregation aware of the needs of the church. Spearheading
          fundraising efforts and maintaining the parsonage are also chief among
          their duties.
        </p>
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
