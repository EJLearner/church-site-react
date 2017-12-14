import React, {Component} from 'react';
import ContactLine from '../Reusable/ContactLine';

class GodsGifts extends Component {
  render() {
    return (
      <div>
        <h2>God’s Gifts</h2>
        <ContactLine address={ContactLine.ADDRESSES.MJENKINS} />
        <p>
          God’s Gift liturgical dance ministry is dedicated to teaching children
          as young as age 3 how to worship and praise the the Lord through
          movement. We seek to glorify God in all aspects of our lives and
          praise dancing is another means we offer to serve the Lord.
        </p>
        <p>
          We minister on every 5th Sunday and rehearse for five-six weeks in
          advance of the 5th Sunday. During rehearsals, participants learn the
          meaning of each movement choreographed in the dance and how it is an
          honor to dance before God. Psalm 150:4 Praise Him with the timbrel and
          dance. The ministry also emphasizes keeping our bodies holy and being
          comfortable praying and sharing with others.
        </p>
      </div>
    );
  }
}

export default GodsGifts;
