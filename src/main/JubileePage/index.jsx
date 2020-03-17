import React, {useEffect} from 'react';

import GeneralPageTemplate from '../commonComponents/GeneralPageTemplate';
import routePaths from '../../routePaths';
import backgroundStore from '../../stores/backgroundStore';
import UpcomingEvents from './UpcomingEvents';
import styled from 'styled-components';
import avisPicture from '../../assets/main/images/avis.jpg';

const JubileePageStyles = styled.div`
  .image-and-caption {
    display: inline-block;

    img {
      padding-top: 1em;
      width: 400px;
      height: auto;
    }

    figcaption {
      font-weight: bold;
      text-align: center;
    }
  }

  .members-list-wrapper {
    text-align: center;

    h3 {
      font-weight: bold;
      font-style: italic;
      margin-bottom: 1em;
    }

    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      font-weight: bold;
    }
  }
`;

const anniversaryContent = (
  <div>
    <h2>Join the Jubilee</h2>

    <h3>
      <i>A message from the 50th Anniversary Chairperson</i>
    </h3>
    <div className="image-and-caption">
      <img alt="Avis Anderson" className="avis-picture" src={avisPicture} />
      <figcaption>Avis Anderson, 50th Anniversary Chairperson</figcaption>
    </div>
    <p>
      <b>
        Then on the Day of Atonement in the fiftieth year, blow the ram’s horn
        loud and long throughout the land. &mdash; Leviticus 25:9
      </b>
    </p>
    <p>
      Greetings, church family, friends, Christian brothers and sisters.
      Hallelujah and To God Be the Glory! We are poised to celebrate 50
      triumphant years in history at The City Temple of Baltimore (Baptist). The
      Lord has blessed us to reach this milestone in the life of our church and
      we honor and thank him for his Grace, Mercy, Faith, and guidance that
      brought us this far. Throughout this year of Jubilee, we will recognize,
      honor, and celebrate the historic events in our past and formulate our
      vision for our future.
    </p>
    <p>
      This is an exciting time in the life of our church, a time for reflection
      and forward thinking. We are both grateful for the past and accepting of
      the challenge for the future. Please join us as we journey forward and
      rejoice in what God has done!
    </p>
    <p>Avis Anderson Chair, 50th Anniversary</p>

    <div className="members-list-wrapper">
      <div className="members list">
        <h3>50th Anniversary Committee</h3>
        <ul>
          <li>Avis Anderson</li>
          <li>DeVera Barnhill</li>
          <li>Lanette Davis</li>
          <li>Kenneth Dean</li>
          <li>Juanita Edgerton</li>
          <li>Iris Ford</li>
          <li>Lori Ford</li>
          <li>Gerry Grant</li>
          <li>Michelle Hamiel</li>
          <li>April Jones</li>
          <li>Rommie Richards</li>
          <li>Kim Smith</li>
          <li>Racquel Smith</li>
          <li>Emily Tilghman</li>
          <li>Patricia Ward</li>
          <li>Michele Williams</li>
        </ul>
      </div>
    </div>
  </div>
);

const orderedEvents = [
  {date: '2020-03-16', title: 'This is an event that you should come to'},
  {
    date: '2020-03-18',
    title: 'This is an event that you should come to',
    timeStart: '2020-03-18T09:00:00'
  },
  {
    date: '2020-04-18',
    title: 'This is an event that you should come to',
    timeStart: '2020-04-18T09:00:00'
  },
  {
    date: '2020-05-18',
    title: 'This is an event that you should come to',
    timeStart: '2020-05-18T09:00:00'
  },
  {
    date: '2020-05-20',
    title: 'This is an event that you should come to',
    timeStart: '2020-05-20T09:00:00'
  },
  {
    date: '2020-05-21',
    title: 'This is an event that you should come to',
    timeStart: '2020-05-21T09:00:00'
  },
  {
    date: '2020-05-25',
    title: 'This is an event that you should come to',
    timeStart: '2020-05-25T09:00:00'
  }
];

// eslint-disable-next-line no-unused-vars
const calendarContent = (
  <div>
    <h2>50th Anniversary Events</h2>
    <UpcomingEvents orderedEvents={orderedEvents} />
  </div>
);

// eslint-disable-next-line no-unused-vars
const storeContent = `
    Store, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  `;

const bottomContentData = [
  {
    title: '50th Anniversary Celebration',
    id: '50thAnniversary',
    content: anniversaryContent
  }
  // TODO: add these back
  // {title: 'Event Calendar', id: 'calendar', content: calendarContent}
  // {title: 'Store', id: 'store', content: storeContent}
];

const topBoxContent = (
  <div>
    <div>
      <h1>JUBILEE ANNIVERSARY</h1>
    </div>
    <p>
      2020 marks an important milestone in the life of our church. Join us each
      Sunday as we celebrate and thank God for 50 years of worship, outreach,
      and praise!
    </p>
  </div>
);

function JubileePage() {
  useEffect(() => {
    backgroundStore.setBackgroundSource(
      backgroundStore.backgroundSources.SHOFARBLOWER
    );

    return () => backgroundStore.resetBackground();
  }, []);

  return (
    <JubileePageStyles>
      <GeneralPageTemplate
        bottomContentData={bottomContentData}
        menuTitle="Anniversary"
        pagePath={routePaths.MAIN_JUBILEE}
        topBoxContent={topBoxContent}
      />
    </JubileePageStyles>
  );
}

export default JubileePage;
