import React, {Component} from 'react';

class Why extends Component {
  render() {
    return (
      <div id="leftcontent">
        <h1>
          What's In <span>Store</span>
        </h1>
        <div id="instoretable">
          <div className="tableline">
            <p className="tableleft">
              Church-wide Institute<br />September 26
            </p>
            <p className="tableright">
              Registration is now open for the 2015 Church-wide Institute. This
              year's topic is Managing & Maintaining Intimate Relationships.
              Whether single, married or somewhere inbetween, you can benefit
              from this Institute! The Institute will cover common relationship
              killers and thrillers, how to manage your emotions and resolve
              conflict, managing household finances, learning your love
              language, how to problem solve common sexual roadblocks, and much,
              much more! Registration closes September 20!
            </p>
          </div>

          <div className="tableline">
            <p className="tableleft">
              The Jesus Connection<br />
              2nd & 4th Fridays<br />starting October 9
            </p>
            <p className="tableright">
              Bring your youth and teens out every 2nd & 4th Friday as we deepen
              our knowledge of God and His word through fun and interactive
              engagement. Parents, please plan to stay. We have plenty of
              discussion-provoking classes for you too! Come get connected!{' '}
            </p>
          </div>

          <div className="tableline">
            <p className="tableleft">
              Leadership Retreat<br />>March 25-26, 2016
            </p>
            <p className="tableright">
              Christian Education is planning a Leadership Retreat for all
              ministers, officers, and group leaders in order to support
              opportunities for leadership development. The retreat has several
              goals:
            </p>
            <ol className="tableright">
              <li>To rejuvenate and renew us so we may lead successfully;</li>
              <li>To offer training in how to communicate effectively;</li>
              <li>
                To help define our roles and the expectations that come with
                them; and
              </li>
              <li>To spend time together in prayer and fellowship.</li>
            </ol>
            <p className="tableright">
              Anyone serving in any capacity in the church is encouraged to
              attend.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Why;
