import React, {Component} from 'react';
import LeftLinks from '../Reusable/LeftLinks/LeftLinks';

class What extends Component {
  render() {
    return (
      <div id="ce-page">
        <h1>
          Where We Are <span>Going</span>
        </h1>
        <div className="ce-page-links-content">
          <div className="ce-page-left-content">
            <LeftLinks />
          </div>
          <div className="ce-page-right-content">
            <p>
              Our vision is to provide continual opportunities for spiritual
              growth to support the church&rsquo;s vision of &ldquo;becoming a
              spiritually mature Christian fellowship in order to provide an
              effective witness for Christ in this world.&rdquo;
            </p>
            <p>Our goals are to:</p>
            <ul>
              <li>
                Expand attendance of the Church-wide Institute and seminars to
                our community members.
              </li>
              <li>Host at least one workshop or class each quarter.</li>
              <li>
                Offer more training classes and seminars for youth and teens.
              </li>
              <li>
                Support any educational enterprise (spiritual or otherwise) of
                every ministry in the church.
              </li>
            </ul>
            <p>
              We have a very dedicated Sunday School and Vacation Bible School
              (VBS) staff. The Board of Christian Education hopes to continue to
              attract and train even more committed persons to support the
              increased demand of these endeavors. In the past, City Temple
              operated &ldquo;Children&rsquo;s Church.&rdquo; Children&rsquo;s
              Church provided a safe and fun environment for children to learn
              about the bible and their faith on their level, while offering an
              opportunity for parents to engage in the worship service free of
              distractions.
            </p>
            <p>
              Christian Education plans to design a new Children&rsquo;s Church
              model to determine if we can support bringing this program back to
              City Temple.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default What;
