import React from 'react';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';
import yearginFuneralYoutubeImgSrc from '../assets/images/yeargin-funeral-youtube.jpg';
// import routePaths from '../routePaths';

// import Anchor from './commonComponents/Anchor';
import MainMenubar from './commonComponents/MainMenubar';

const StyledHomePage = styled.div`
  background: var(--black);
  // TODO: temporary while funeral screen is up - replace afterwards
  /* background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(${choir}); */
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 2;
  }

  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100%;

    margin: 0 300px;
    text-align: center;
    font-size: 28px;
    color: var(--text-on-dark-background);
  }

  h1 {
    font-size: 46px;
    margin-top: 0;
  }

  .worship-time {
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0;
  }

  .anchor-wrapper {
    padding-bottom: 64px;
  }

  a.service-link {
    background-color: var(--accent-background);
    border-radius: 4px;
    color: var(--accent-content);
    display: block;
    font-size: 16px;
    letter-spacing: 2px;
    margin-top: 21px;
    padding: 8px 32px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
  }

  a.service-link:visited {
    color: var(--accent-content);
    font-weight: bold;
  }
`;

const ImageWrapperLink = styled.a`
  display: block;
  align-self: center;
`;

const StyledImage = styled.img`
  align-self: center;
  display: block;
  height: calc(90vh - 120px);
  margin: 0px 0 50px 0;
`;

const ScreenReaderText = styled.div`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

// TODO: temporary while funeral screen is up - replace afterwards
function HomePage() {
  return (
    <StyledHomePage>
      <MainMenubar />

      {/* <div className="content-wrapper">
        <div className="content">
          <h1>
            Welcome to the
            <br />
            City Temple of Baltimore (Baptist)
          </h1>
          <p className="worship-time">Worship and Live Stream Sunday at 9 am</p>
          <p>
            We shall become a spiritually mature Christian fellowship in order
            to provide an effective witness for Christ in this world!
          </p>
          <div className="anchor-wrapper">
            <Anchor className="service-link" path={routePaths.MAIN_WATCH}>
              Watch Our Latest Service
            </Anchor>
          </div>
        </div>
      </div> */}

      <div className="content-wrapper">
        <ImageWrapperLink
          href="https://youtube.com/live/kpxlj-G9IJU"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ScreenReaderText>
            <p>
              Family Hour and Musical Portion - Friday, November 10, 2023 5:00 -
              7:00 PM City Temple of Baltimore Baptist 317 Dolphin Street,
              Baltimore MD 21217.
            </p>
            <p>
              Friday, November 10th. Live stream of the musical portion of the
              service will begin at aproximately 6:30 pm.
            </p>
            <p>
              Memorial Service Saturday, November 11, 2023 11:00 AM City Temple
              of Baltimore Baptist 317 Dolphin Street, Baltimore MD 21217.
            </p>
            <p>
              Saturday, November 11th. Live stream of the memorial service will
              begin at aproximately 6:30 pm.
            </p>
            <p>
              Service can be accessed via the following youtube link
              https://www.youtube.com/@thecitytempleofbaltimore3605
            </p>
          </ScreenReaderText>
          <StyledImage
            alt="Family Hour and Memorial Service picture and information"
            src={yearginFuneralYoutubeImgSrc}
          />
        </ImageWrapperLink>
      </div>
    </StyledHomePage>
  );
}

export default HomePage;
