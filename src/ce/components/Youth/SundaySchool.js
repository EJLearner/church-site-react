import React, {Component} from 'react';
import ContactLine from '../Reusable/ContactLine';

class SundaySchool extends Component {
  render() {
    return (
      <div>
        <h2>Sunday School</h2>
        <ContactLine address={ContactLine.ADDRESSES.LALEXANDER} />
        <p>
          The purpose of our Sunday School is to provide spiritual instruction
          for all ages. In addition to using a text, the Bible, we incorporate a
          standard curriculum that is used across all age groups. In addition to
          these resources, our teachers aim to model Christian life. Students
          learn from their examples how to live for Jesus. Since Sunday School
          is formatted into small groups, it also provides “a place to belong,”
          where students are surrounded by and bond with other like-minded
          individuals.
        </p>
      </div>
    );
  }
}

export default SundaySchool;
