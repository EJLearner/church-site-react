import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import styled from 'styled-components';

import avisPicture from '../../assets/main/images/avis.jpg';
import routePaths from '../../routePaths';
import backgroundStore from '../../stores/backgroundStore';
import StoreContent from '../JubileeStore/StoreContent';
import MainMenubar from '../MainMenubar';
import AboveContentLinks from '../commonComponents/AboveContentLinks';
import ContentAndSides from '../commonComponents/ContentAndSides';
import ContentAndSubCompassWrapper from '../commonComponents/ContentAndSubCompassWrapper';
import ContentLeftSide from '../commonComponents/ContentLeftSide';
import ContentWrapper from '../commonComponents/ContentWrapper';
import SideMenu from '../commonComponents/SideMenu';
import StandardPageWrapper from '../commonComponents/StandardPageWrapper';
import TopInfoBox from '../commonComponents/TopInfoBox';
import TopInfoBoxWrapper from '../commonComponents/TopInfoBoxWrapper';

import UpcomingEvents from './UpcomingEvents';

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

const calendarContent = (
  <div>
    <h2>50th Anniversary Events</h2>
    <UpcomingEvents />
  </div>
);

const bottomContentData = [
  {
    title: 'Store',
    id: routePaths.MAIN_JUBILEE_STORE
  },
  {
    title: '50th Anniversary Celebration',
    id: routePaths.MAIN_JUBILEE_50TH_ANNIVERSARY
  },
  {
    title: 'Event Calendar',
    id: routePaths.MAIN_JUBILEE_EVENT_CALENDAR
  }
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

function JubileePage({history, location}) {
  const contentId = location.pathname;
  useEffect(() => {
    backgroundStore.setBackgroundSource(
      backgroundStore.backgroundSources.SHOFARBLOWER
    );

    return () => {
      backgroundStore.resetBackground();
    };
  }, []);

  const menuTitle = 'Anniversary';

  const {title} =
    bottomContentData.find(({id}) => id === contentId) || bottomContentData[0];

  const sideMenu = (
    <SideMenu
      currentId={contentId}
      menuData={bottomContentData}
      onClick={(id) => history.push(id)}
      title={menuTitle}
    />
  );

  return (
    <JubileePageStyles>
      <StandardPageWrapper>
        <MainMenubar />
        <TopInfoBoxWrapper>
          <TopInfoBox>{topBoxContent}</TopInfoBox>
        </TopInfoBoxWrapper>

        <ContentAndSubCompassWrapper>
          <AboveContentLinks
            pagePath={routePaths.MAIN_JUBILEE}
            pageTitle={menuTitle}
            subPageTitle={title}
          />
          <ContentAndSides>
            <ContentLeftSide>{sideMenu}</ContentLeftSide>
            <Switch>
              <Route path={routePaths.MAIN_JUBILEE_STORE}>
                <StoreContent />
              </Route>
              <Route path={routePaths.MAIN_JUBILEE_50TH_ANNIVERSARY}>
                <ContentWrapper fullWidth>{anniversaryContent}</ContentWrapper>
              </Route>
              <Route path={routePaths.MAIN_JUBILEE_EVENT_CALENDAR}>
                <ContentWrapper fullWidth>{calendarContent}</ContentWrapper>
              </Route>
              <Route exact path={routePaths.MAIN_JUBILEE}>
                <ContentWrapper fullWidth>
                  <StoreContent />
                </ContentWrapper>
              </Route>
            </Switch>
          </ContentAndSides>
        </ContentAndSubCompassWrapper>
      </StandardPageWrapper>
    </JubileePageStyles>
  );
}

JubileePage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(JubileePage);
