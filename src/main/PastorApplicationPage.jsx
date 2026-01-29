import {faFacebookF} from '@fortawesome/free-brands-svg-icons/faFacebookF';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import {faXTwitter} from '@fortawesome/free-brands-svg-icons/faXTwitter';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faShare} from '@fortawesome/free-solid-svg-icons/faShare';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useRef, useState} from 'react';
import {Popover} from 'react-tiny-popover';
import styled from 'styled-components';

import applicationPdf from '../assets/files/EmploymentApplicationSeniorPastor.pdf';
import circleCtLogo from '../assets/images/circlectlogo-black.png';

const StyledPastorApplicationPage = styled.div`
  --application-blue: rgb(0, 112, 192);
  --application-gray: rgb(229, 229, 229);

  background-color: var(--application-gray);
  color: var(--text-on-light-background);
  padding-bottom: var(--page-bottom-padding);
  min-height: 100%;
  font-size: 16px;

  h2 {
    line-height: 24px;
    margin-top: 0;
    text-transform: uppercase;
    font-family: var(--times);
  }

  h3 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-family: var(--times);
  }

  ul {
    margin-top: 0;
  }

  // more specific to override root style
  section {
    border-bottom: 2px solid grey;
    padding-bottom: 1em;
    margin-bottom: 1em;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    a {
      color: rgb(0, 0, 238);
      &:visited {
        color: #551a8b;
      }
    }

    p,
    ul,
    ol {
      // Let the section handle spacing unless it's not the last child
      margin-top: 0;
      padding-bottom: 0;
      margin-bottom: 0;

      &:not(:last-child) {
        margin-bottom: 0.5em;
      }
    }

    li {
      padding-bottom: 0.8em;
    }

    li:last-child {
      padding-bottom: 0;
    }
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

  .header-and-buttons {
    display: flex;
    justify-content: space-between;
  }

  .subtitle {
    font-size: 16px;
  }

  .share-and-apply-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    align-items: baseline;
    button {
      padding: 1em;
    }
  }

  .share-button {
    flex-shrink: 0;
    background-color: var(--application-gray);
    border: none;
    border-radius: 16px;
    font-weight: bold;
    box-shadow: none;
    min-width: 80px;
    min-height: 30px;
    max-height: 45px;
    transition: all 0.05s;

    svg {
      margin-right: 0.5em;
      color: var(--application-blue);
    }

    &:hover {
      cursor: pointer;
      scale: 1.05;

      @media (prefers-reduced-motion) {
        scale: none;
        filter: brightness(0.9);
      }
    }
  }

  .apply-button {
    // stuff necessary since I'm using the anchor tag
    display: inline-block;
    padding: 0.5em;
    transition: all 0.05s;
    white-space: nowrap;

    border-radius: 4px;
    background-color: var(--application-blue);
    color: var(--text-on-dark-background);
    font-weight: bold;

    &:hover {
      text-decoration: none;
      transform: scale(1.05);

      @media (prefers-reduced-motion) {
        transform: none;
        filter: brightness(0.9);
      }
    }
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

  a {
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
            <h2>
              Senior Pastor Position <br />
              <span className="subtitle">
                for the City Temple of Baltimore (Baptist)
              </span>
            </h2>
            <div className="share-and-apply-wrapper">
              <Popover
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
                          ref={emailAnchorRef}
                          tabIndex={2}
                          target="_blank"
                          title="Send email"
                        >
                          <FontAwesomeIcon icon={faEnvelope} size="lg" />
                          Email
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareSubject}`}
                          tabIndex={3}
                          target="_blank"
                          title="Share on Facebook"
                        >
                          <FontAwesomeIcon icon={faFacebookF} size="lg" />
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://x.com/intent/tweet?source=${shareUrl}&text=${shareSubject}:%20${shareUrl}`}
                          tabIndex={4}
                          target="_blank"
                          title="Post on X"
                        >
                          <FontAwesomeIcon icon={faXTwitter} size="lg" />X
                          (Formerly Twitter)
                        </a>
                      </li>
                      <li>
                        <a
                          href={`http://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareSubject}&summary=${shareDescription}&source=${shareUrl}`}
                          tabIndex={5}
                          target="_blank"
                          title="Share on LinkedIn"
                        >
                          <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                          LinkedIn
                        </a>
                      </li>
                    </StyledShareList>
                  </div>
                }
                isOpen={shouldShowShareItems}
                onBlurOutside={() => setShouldShowShareItems(false)}
                onClickOutside={() => setShouldShowShareItems(false)}
                padding={10}
                positions={['bottom', 'left', 'right', 'top']}
              >
                <button
                  className="share-button"
                  // tabindex 1 here and 2-5 in the share list are used to ensure that user tabs into the share list
                  // in an order that makes sense
                  onClick={() => {
                    return setShouldShowShareItems(!shouldShowShareItems);
                  }}
                  tabIndex={1}
                >
                  <FontAwesomeIcon icon={faShare} size="lg" />
                  Share
                </button>
              </Popover>
              <a
                className="apply-button"
                download="Application.pdf"
                href={applicationPdf}
              >
                Download Application
              </a>
            </div>
          </div>
          <section className="quick-info">
            <b>Position Title:</b> Senior Pastor
            <br />
            <b>Location:</b> Baltimore, MD
            <br />
            <b>Status:</b> Bivocational
            <br />
            <b>Salary Range:</b> $55,000 - $65,000/annually
          </section>
          <section>
            <h3>About The City Temple of Baltimore (Baptist)</h3>
            <p>
              The City Temple of Baltimore (Baptist) is located at the southeast
              corner of Eutaw and Dolphin Streets in Baltimore, MD. We currently
              hold one Sunday worship service, and our congregation consists of
              less than 100 active members. As a longstanding pillar in the
              Baltimore community, City Temple has a rich history of serving
              those in need—providing meals, clothing, and shelter assistance.
              We are entering an exciting new chapter and seek a leader to guide
              us forward.
            </p>
          </section>
          <section>
            <h3>Position Overview</h3>
            <p>
              The City Temple of Baltimore (Baptist) is seeking a{' '}
              <strong>bi-vocational Senior Pastor</strong> to serve as the
              spiritual leader of our congregation. This position is designed
              for a candidate who will balance pastoral responsibilities with
              another professional or vocational commitment outside the church.
              The Senior Pastor will cultivate our worship service, foster
              spiritual growth, revitalize our community outreach, and help
              create an environment where individuals of all ages and
              backgrounds can deepen their faith, build meaningful
              relationships, and contribute to the broader community.
            </p>
          </section>
          <section>
            <h3>Key Responsibilities</h3>
            <ul>
              <li>
                <b>Preaching & Teaching</b>: Deliver dynamic, engaging sermons
                each Sunday; lead Bible Study and Adult Sunday School Classes.
              </li>
              <li>
                <b>Worship Leadership</b>: Plan, organize, and facilitate
                meaningful worship experiences.
              </li>
              <li>
                <b>Pastoral Care</b>: Provide support and guidance to members
                through visitation, counseling, and prayer during times of joy,
                sorrow, and spiritual growth.
              </li>
              <li>
                <b>Ministry Development</b>: Collaborate with church leaders to
                develop and implement strategies for spiritual growth,
                discipleship, and outreach.
              </li>
              <li>
                <b>Leadership</b>: Model Christ-like character, integrity,
                humility, and servant leadership; recommend church officers for
                election by the congregation.
              </li>
              <li>
                <b>Community Engagement</b>: Serve as a visible and active
                presence in the community, building relationships and
                participating in local events and initiatives.
              </li>
            </ul>
          </section>
          <section>
            <h3>Qualifications</h3>
            <ul>
              <li>
                Licensed and ordained Baptist minister, with a demonstrated
                commitment to the call.
              </li>
              <li>
                Minimum of three years’ experience as a pastor, including
                congregational preaching and teaching.
              </li>
              <li>
                Master of Divinity degree from an accredited theological
                seminary, college, or university.
              </li>
              <li>
                Strong preaching and teaching skills; ability to communicate
                biblical truths in a relevant and engaging manner.
              </li>
              <li>
                Proven leadership experience in pastoral ministry, including
                pastoral care, worship planning, and community engagement.
              </li>
              <li>
                Excellent interpersonal, administrative, and communication
                skills; ability to connect with individuals of all ages and
                backgrounds.
              </li>
              <li>
                Heart for pastoral care and ability to support individuals and
                families in times of celebration and difficulty.
              </li>
              <li>
                Collaborative spirit; ability to work effectively with staff,
                volunteers, and church leaders.
              </li>
              <li>Proficient computer/technology skills.</li>
            </ul>
          </section>
          <section>
            <h3>Application Instructions</h3>
            <p>
              To apply, please complete the fillable PDF application form
              located <a href={applicationPdf}>here</a>. Submit the following
              materials{' '}
              <span style={{textDecoration: 'underline'}}>
                with your application
              </span>
              :
            </p>
            <ol>
              <li>
                <b>Cover Letter</b>: Express your interest in the position, why
                you are a good fit, and your qualifications.
              </li>
              <li>
                <b>Resume</b>: Detail your educational history, ministerial and
                pastoral experience, and accomplishments.
              </li>
              <li>
                <b>Certificate of License and Ordination</b>: Provide a copy of
                your certificate of license and ordination.
              </li>
              <li>
                <b>References</b>: Submit three written references, including
                one from a previous supervising pastor and two personal
                references.
              </li>
              <li>
                <b>Links to sermons</b>: Provide access to three{' '}
                <span style={{textDecoration: 'underline'}}>recently</span>{' '}
                recorded sermons or teachings.
              </li>
            </ol>
            <p>
              For more information about our church, visit{' '}
              <a className="church-site-link" href="https://thecitytemple.org/">
                https://thecitytemple.org/
              </a>
              .
            </p>
            <br />
            <p>
              <b>Submit applications and supporting materials to:</b>
              <br />
              <a href="mailto:search-committee@thecitytemple.org">
                search-committee@thecitytemple.org
              </a>
            </p>
            <p>
              <b>Application Deadlne:</b> Tuesday, March 3, 2026
            </p>
          </section>
        </main>
      </div>
    </StyledPastorApplicationPage>
  );
};

export default PastorApplicationPage;
