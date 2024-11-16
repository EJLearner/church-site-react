import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faFacebookMessenger} from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons/faLinkedin';
import {faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import {Popover} from 'react-tiny-popover';
import styled from 'styled-components';

import Button from './commonComponents/Button/Button';

const StyledPastorApplicationPage = styled.div`
  background-color: var(--application-gray);
  color: var(--text-on-light-background);
  padding-bottom: var(--page-bottom-padding);
  min-height: 100%;
  font-size: 14px;

  .main-wrapper {
    background: linear-gradient(
      to bottom,
      var(--application-blue) 0px,
      var(--application-blue) 300px,
      var(--application-gray) 300px,
      var(--application-gray) 100%
    );
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  main {
    margin-top: 6em;
    background-color: var(--light-background);
    padding: 1em;
    position: relative;
    width: 40%;
  }

  section {
    margin-bottom: 1em;
  }

  .share-and-apply-wrapper {
    position: absolute;
    right: 3em;
    top: 3em;
  }

  .share-button {
    background-color: var(--application-gray);
    border: none;
    font-weight: bold;
    box-shadow: none;
    min-width: 80px;
    min-height: 30px;

    &:hover {
      cursor: pointer;
    }
  }

  .share-options {
    background-color: var(--light-background);
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .apply-button {
    background-color: var(--application-blue);
    color: var(--text-on-dark-background);
    font-weight: bold;
  }

  h2 {
    margin-top: 0;
    text-transform: uppercase;
  }

  h3 {
    margin: 0;
  }

  .quick-info {
    color: var(--application-blue);
    font-weight: bold;
  }
`;

const PastorApplicationPage = () => {
  const [shouldShowShareItems, setShouldShowShareItems] = useState(false);

  return (
    <StyledPastorApplicationPage>
      <header>
        {/* todo add logo */}
        {/* <img src={logo} /> */}
        The City Temple of Baltimore (Baptist)
      </header>
      <div className="main-wrapper">
        <main>
          <h2>Senior Pastor Position</h2>
          <div className="share-and-apply-wrapper">
            <Popover
              isOpen={shouldShowShareItems}
              positions={['bottom', 'left', 'right', 'top']}
              content={
                <div>
                  <ul className="share-options">
                    <li>
                      <FontAwesomeIcon icon={faEnvelope} /> Email
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faFacebookMessenger} /> Messenger
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faFacebook} /> Facebook
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faTwitter} /> Twitter
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
                    </li>
                  </ul>
                </div>
              }
            >
              <button
                className="share-button"
                onClick={() => {
                  return setShouldShowShareItems(!shouldShowShareItems);
                }}
              >
                Share
              </button>
            </Popover>
            <Button className="apply-button" buttonShape={Button.SHAPES.RECT}>
              Apply
            </Button>
          </div>
          <section className="quick-info">
            Position Title: Senior Pastor
            <br />
            Location: Baltimore, MD
            <br />
            Status: Bivocational
            <br />
            Salary Range: $55,000 - $65,000/annually
          </section>
          <section>
            <h3>Job Description:</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Praesent
              mauris. Fusce nec tellus sed augue semper porta.
            </p>
          </section>
          <section>
            <h3>Responsibilities:</h3>
            <ul>
              <li>Deliver sermons on Sundays and other special occasions</li>
              <li>
                Oversee all aspects of the church, including the Sunday school,
                youth ministry, and community outreach programs
              </li>
              <li>
                Provide spiritual guidance and support to the congregation,
                including counseling, prayer, and communion
              </li>
              <li>
                Develop and lead Bible studies, prayer meetings, and other
                spiritual growth opportunities
              </li>
              <li>
                Collaborate with other church leaders and committees to plan and
                implement church activities and programs
              </li>
              <li>
                Perform administrative tasks, such as writing reports, managing
                budgets, and overseeing maintenance of the church building
              </li>
              <li>Perform other duties as assigned by the church</li>
            </ul>
          </section>
        </main>
      </div>
    </StyledPastorApplicationPage>
  );
};

export default PastorApplicationPage;
