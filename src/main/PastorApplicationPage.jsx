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
    margin: 0;
    font-family: var(--times);
  }

  ul {
    margin-top: 0;
  }

  // more specific to override root style
  section {
    a {
      color: var(--text-on-light-background);
    }

    p,
    ul,
    ol {
      margin-top: 0;

      &:not(:last-child) {
        margin-bottom: 0.5em;
      }
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

  section {
    margin-bottom: 1em;
  }

  .header-and-buttons {
    display: flex;
    justify-content: space-between;
  }

  .subtitle {
    font-size: 16px;
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
    margin-left: 1em;
    transition: all 0.05s;

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
            Position Title: Senior Pastor
            <br />
            Location: Baltimore, MD
            <br />
            Status: Bivocational
            <br />
            Salary Range: $55,000 - $65,000/annually
          </section>
          <section>
            <h3>About The City Temple of Baltimore (Baptist)</h3>
            <p>
              The City Temple of Baltimore (Baptist) is located at the southeast
              corner of Eutaw and Dolphin Streets in Baltimore City, MD. Its
              membership currently consists of 175 members, predominantly
              female. The predominant age range, of 60 percent of our members,
              is 60-96. We currently have one Sunday Worship Service. As an
              integral part of the Baltimore City community, the City Temple of
              Baltimore (Baptist) has opened its doors to the sorrowful, served
              meals to the hungry, given clothing to the needy, and assisted the
              homeless in finding shelter. God’s faithfulness and grace have
              been seen throughout its history. The City Temple of Baltimore
              (Baptist) history is long, but it is also a church that is more
              recently being re-founded, in a new and exciting chapter in its
              journey.
            </p>
          </section>
          <section>
            <h3>Job Description</h3>
            <p>
              The City Temple of Baltimore (Baptist) is seeking a caring and
              dedicated Senior Pastor to lead our congregation in spiritual
              growth, community outreach, and service. As the God-sent spiritual
              leader of our church family, the Senior Pastor will play a vital
              role in developing an environment where individuals can deepen
              their faith, foster meaningful relationships, and contribute to
              our community.
            </p>
          </section>
          <section>
            <h3>Responsibilities</h3>
            <ul>
              <li>
                Provide dynamic and engaging preaching that inspires and
                challenges individuals to live out their faith in their daily
                lives.
              </li>
              <li>
                Lead and oversee all aspects of worship services, including
                planning, organizing, and facilitating meaningful worship
                experiences, preach each Sunday, teach Bible Study and Sunday
                School.
              </li>
              <li>
                Provide pastoral care and support to congregation members, such
                as visitation, offering guidance, counsel, and prayer during
                times of joy, sorrow, and spiritual growth.
              </li>
              <li>
                Collaborate with church leaders to develop and implement
                strategies for spiritual growth, discipleship, and outreach
                ministries that meet the diverse needs of our community.
              </li>
              <li>
                Recommend church officers to be elected by the congregation.
              </li>
              <li>
                Serve as a visible and active presence in the community,
                building relationships, fostering partnerships, and
                participating in local events and initiatives that promote
                compassion and general well-being.
              </li>
              <li>
                Lead by example, modeling Christ-like character, integrity,
                humility, and servant leadership in all interactions and
                relationships.
              </li>
            </ul>
          </section>
          <section>
            <h3>Qualifications</h3>
            <ul>
              <li>
                Must currently be a licensed and ordained Baptist minister,
                having received his/her divine calling and demonstrated a
                commitment to the call.
              </li>
              <li>
                Minimum three years as a pastor with congregational preaching
                and teaching experience. Additional years’ experience preferred,
                along with a demonstrated commitment to and knowledge of the
                doctrines of the Christian faith and the principles of the
                teaching of the Holy Bible.
              </li>
              <li>
                A Master of Divinity degree from an accredited theological
                seminary, college, or university is required.
              </li>
              <li>
                Strong preaching and teaching skills with the ability to
                communicate biblical truths in a relevant and engaging manner.
              </li>
              <li>
                Proven leadership experience in pastoral ministry, including
                pastoral care, worship planning, and community engagement.
              </li>
              <li>
                Excellent interpersonal and communication skills with the
                ability to connect with individuals of all ages, backgrounds,
                and walks of life.
              </li>
              <li>
                A heart for pastoral care and a desire to walk alongside
                individuals and families during both times of celebration and
                times of difficulty.
              </li>
              <li>
                A collaborative spirit with the ability to work effectively with
                staff, volunteers, and church leaders to achieve shared goals.
              </li>
              objectives.
              <li>Good computer/technology skills required.</li>
            </ul>
          </section>
          <section>
            <h3>HOW TO APPLY</h3>
            <p>
              To apply for the Senior Pastor position, please download and
              complete the fillable PDF application form. The following
              materials must be submitted with your application for
              consideration.
            </p>
            <ol>
              <li>
                <span className="how-to-item-heading">Cover Letter</span> - The
                cover letter should express your interest in the Senior Pastor
                position, why you believe you might be a good fit as the Senior
                Pastor of the City Temple of Baltimore (Baptist), your
                qualifications, and your salary requirements.
              </li>
              <li>
                <span className="how-to-item-heading">Resume</span> - Your
                current resume should detail your educational history,
                ministerial and pastoral experiences, and accomplishments.
              </li>
              <li>
                <span className="how-to-item-heading">Degrees</span> - Provide a
                copy of degrees attained and transcript.
              </li>
              <li>
                <span className="how-to-item-heading">
                  Certificate of License and Ordination
                </span>{' '}
                - Provide a copy of your certificate of license and ordination.
              </li>
              <li>
                <span className="how-to-item-heading">References</span> -
                Provide three written references, one from a previous pastor who
                has supervised you, and personal references.
              </li>
              <li>
                <span className="how-to-item-heading">Statement of Faith</span>{' '}
                - Provide a page or less overview of your Christian faith
                journey and theological beliefs.
              </li>
              <li>
                <span className="how-to-item-heading">Links to sermons</span> -
                Provide access to three to five recently recorded sermons and
                teachings you have delivered.
              </li>
            </ol>
            <p>
              Interested applicants should review the City Temple of Baltimore
              (Baptist) website at{' '}
              <a className="church-site-link" href="https://thecitytemple.org/">
                <nobr>https://thecitytemple.org/</nobr>
              </a>{' '}
              for information about the church. Applications and supporting
              materials should be emailed to{' '}
              <a href="mailto:search-committee@thecitytemple.org">
                search-committee@thecitytemple.org
              </a>
              .{' '}
              <strong>
                All applications and supporting materials are due by Thursday,
                April 3, 2025.
              </strong>
            </p>
            <p>
              Any questions regarding this posting should be directed to Racquel
              Smith or Carolyn Gaskins at{' '}
              <a href="mailto:search-committee@thecitytemple.org">
                search-committee@thecitytemple.org
              </a>
              .
            </p>
          </section>
        </main>
      </div>
    </StyledPastorApplicationPage>
  );
};

export default PastorApplicationPage;
