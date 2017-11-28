import React, {Component} from 'react';
import workGroupData from '../../utils/visionWorkgroupData';

class TheVision extends Component {
  _renderWorkGroupListItems() {
    return workGroupData.getWorkGroupNames().map((name, index) => {
      return (
        <li key={index} type="a">
          {name}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Church Vision Statement</h2>
        <br />
        <div className="vision-quote">
          “We shall become a spiritually mature Christian fellowship in order to
          provide an effective witness for Christ in this world.”
        </div>
        <p>
          2020 Vision was born out of a desire to fulfill our church’s vision
          statement in a practical and tangible way. In a community where more
          youths are subjected to violence, substance abuse, and detention on a
          daily basis than attend Sunday School on a Sunday morning, City Temple
          wants to act. We want to reach a generation that at times seems
          unreachable in order to teach them about a God whose love is
          unfathomable. We need to teach hope to the hopeless and shine a light
          to those who do not see a way out of darkness. We cannot win souls
          with words, but by taking action and by producing leaders that
          produce.
        </p>
        <p>
          2020 Vision is City Temple’s commitment to realizing our church’s
          vision statement by the year 2020. We used a two-pronged approach to
          fulfilling this vision:
        </p>

        <ol>
          <li>Train our leaders to be disciples who make disciples.</li>
          <ol>
            <li type="a">
              We remind our leaders of the commitment they have made to our God,
              our church, and our members; and reaffirm this commitment on a
              regular basis.
            </li>
          </ol>
          <li>
            Commit to strategic planning and goals that will allow us to realize
            our vision.
          </li>
          <ol>{this._renderWorkGroupListItems()}</ol>
        </ol>
        <p>
          In April 2016, we held a Leadership Retreat at the Embassy Suites
          hotel in Hunt Valley, MD. The purpose of the retreat was to provide
          training on the 2020 Vision. We also held a workshop on becoming
          better leaders and understanding the biblical and practical
          applications of fruitful leadership. We strategized on how we could
          make the words of our vision a reality and defined outputs and
          outcomes that would help us measure the success of our efforts moving
          forward.
        </p>
      </div>
    );
  }
}

export default TheVision;
