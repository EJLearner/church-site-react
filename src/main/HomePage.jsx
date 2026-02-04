import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';
import routePaths from '../routePaths';

import Anchor from './commonComponents/Anchor';
import MainMenubar from './commonComponents/MainMenubar';

// TODO: tweak margin further for better dynamic sizing
const StyledHomePage = styled.div`
  background: var(--black);
  background:
    linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${choir});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .actual-content {
    margin: 15px clamp(10px, 70vw - 400px, 250px);
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100%;

    text-align: center;
    font-size: var(--28-font-clamped);
    color: var(--text-on-dark-background);
  }

  h1 {
    font-size: var(--46-font-clamped);
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

function HomePage() {
  return (
    <StyledHomePage>
      <MainMenubar />
      <div className="content">
        <div className="actual-content">
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
      </div>
    </StyledHomePage>
  );
}

export default HomePage;
