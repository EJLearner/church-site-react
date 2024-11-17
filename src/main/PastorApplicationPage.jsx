import {faFacebookF} from '@fortawesome/free-brands-svg-icons/faFacebookF';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import {faXTwitter} from '@fortawesome/free-brands-svg-icons/faXTwitter';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faShare} from '@fortawesome/free-solid-svg-icons/faShare';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useRef, useState} from 'react';
import {Popover} from 'react-tiny-popover';
import styled from 'styled-components';

import circleCtLogo from '../assets/images/circlectlogo-black.png';

import Button from './commonComponents/Button/Button';

const StyledPastorApplicationPage = styled.div`
  --application-blue: rgb(0, 112, 192);
  --application-gray: rgb(229, 229, 229);

  background-color: var(--application-gray);
  color: var(--text-on-light-background);
  padding-bottom: var(--page-bottom-padding);
  min-height: 100%;
  font-size: 14px;

  h2,
  h3 {
    font-family: var(--times);
  }

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

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: bold;
    padding: 1em;

    img {
      height: 3rem;
    }
  }

  main {
    margin-top: 6em;
    background-color: var(--light-background);
    padding: 1em;
    position: relative;
    width: clamp(500px, 50%, 800px);
    box-shadow: 3px -3px 10px rgba(0, 0, 0, 0.8);
  }

  section {
    margin-bottom: 1em;
  }

  .header-and-buttons {
    display: flex;
    justify-content: space-between;
  }

  .share-and-apply-wrapper {
    button {
      padding: 1em;
    }
  }

  .share-button {
    background-color: var(--application-gray);
    border: none;
    border-radius: 16px;
    font-weight: bold;
    box-shadow: none;
    min-width: 80px;
    min-height: 30px;
    transition: all 0.05s;

    svg {
      margin-right: 0.5em;
      color: var(--application-blue);
    }

    &:hover {
      cursor: pointer;
      scale: 1.05;
    }
  }

  .apply-button {
    border-radius: 4px;
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

// had to separate out because react-tiny-popover doesnt' render this
// within the parent context
const StyledShareList = styled.ul`
  background-color: var(--light-background);
  border: 1px solid var(--application-gray);
  border-radius: 6px;
  list-style-type: none;
  padding: 0.5em 1em;
  margin: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);

  svg {
    margin-right: 0.75rem;
    color: rgb(149, 161, 185);
  }

  li {
    padding: 0.5em;
  }

  li a {
    color: var(--text-on-light-background);
  }
`;

const PastorApplicationPage = () => {
  const emailAnchorRef = useRef(null);
  const [shouldShowShareItems, setShouldShowShareItems] = useState(false);

  // focus on email anchor when share items pop up
  useEffect(() => {
    if (shouldShowShareItems) {
      emailAnchorRef?.current?.focus?.();
    }
  }, [shouldShowShareItems]);

  const shareSubject = encodeURIComponent('The City Temple Pastor Application');

  const shareUrl = encodeURIComponent(
    'https://thecitytemple.org/pastor-application/',
  );

  const shareDescription = encodeURIComponent(
    'The City Temple is Searching for a Pastor. Apply or share if Interested: https://thecitytemple.org/pastor-application/',
  );

  return (
    <StyledPastorApplicationPage>
      <header>
        <img src={circleCtLogo} />
        The City Temple of Baltimore (Baptist)
      </header>
      <div className="main-wrapper">
        <main>
          <div className="header-and-buttons">
            <h2>Senior Pastor Position</h2>
            <div className="share-and-apply-wrapper">
              <Popover
                padding={10}
                isOpen={shouldShowShareItems}
                onClickOutside={() => setShouldShowShareItems(false)}
                onBlurOutside={() => setShouldShowShareItems(false)}
                positions={['bottom', 'left', 'right', 'top']}
                content={
                  <div>
                    <StyledShareList
                      onBlur={(event) => {
                        const blurDestination = event.relatedTarget;
                        // if ul does not contain the blur destination, close share popup
                        if (
                          !blurDestination ||
                          !blurDestination.closest('ul')
                        ) {
                          setShouldShowShareItems(false);
                        }
                      }}
                    >
                      <li>
                        <a
                          href={`mailto:?subject=${shareSubject}&body=${shareDescription}`}
                          target="_blank"
                          title="Send email"
                          ref={emailAnchorRef}
                          tabIndex={2}
                        >
                          <FontAwesomeIcon icon={faEnvelope} size="lg" />
                          Email
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareSubject}`}
                          title="Share on Facebook"
                          target="_blank"
                          tabIndex={3}
                        >
                          <FontAwesomeIcon icon={faFacebookF} size="lg" />
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://x.com/intent/tweet?source=${shareUrl}&text=${shareSubject}:%20${shareUrl}`}
                          target="_blank"
                          title="Post on X"
                          tabIndex={4}
                        >
                          <FontAwesomeIcon icon={faXTwitter} size="lg" />X
                          (Formerly Twitter)
                        </a>
                      </li>
                      <li>
                        <a
                          href={`http://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareSubject}&summary=${shareDescription}&source=${shareUrl}`}
                          target="_blank"
                          title="Share on LinkedIn"
                          tabIndex={5}
                        >
                          <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                          LinkedIn
                        </a>
                      </li>
                    </StyledShareList>
                  </div>
                }
              >
                <button
                  className="share-button"
                  // tabindex 1 here and 2-5 in the share list are used to ensure that user tabs into the share list
                  // in an order that makes sense
                  tabIndex={1}
                  onClick={() => {
                    return setShouldShowShareItems(!shouldShowShareItems);
                  }}
                >
                  <FontAwesomeIcon icon={faShare} size="lg" />
                  {''}
                  Share
                </button>
              </Popover>
              <Button className="apply-button" buttonShape={Button.SHAPES.RECT}>
                Apply
              </Button>
            </div>
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
