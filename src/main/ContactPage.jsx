import React from 'react';
import styled from 'styled-components';

import {WIDTHS, COLORS, LOGICAL_COLORS} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';

const borderColor = 'gray';

const StyledDiv = styled.div`
  .top-info-box-wrapper {
    display: flex;
    justify-content: space-between;
    margin: ${WIDTHS.SIDE_CONTENT_PADDING};

    .top-info-box {
      min-width: 50%;
    }

    .more-content {
      margin-left: 1em;
    }
  }

  .content-and-sub-compass {
    background-color: white;
    border: 1px solid ${borderColor};
    margin: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
    padding: 0 1em;
  }

  .content-and-sides {
    border-top: 1px solid ${borderColor};
    display: flex;
  }

  .side-times {
    flex-shrink: 0;
    font-size: 13.33px;
    padding: 1em;

    h2 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      margin-top: 0;
      font-size: 110%;
    }

    ul {
      padding-left: 0;
    }

    li {
      list-style-type: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .menu-and-content {
    display: flex;
  }

  .side-content-wrapper {
    border-left: 1px solid ${borderColor};
    display: flex;
    flex-direction: column;
    min-width: 20%;
    max-width: 25%;
    padding: 1em 2em 0 2em;
  }

  .content {
    background-color: ${COLORS.WHITE};
    border-left: 1px solid ${borderColor};
    padding: 1em;
    width: 70%;

    h1,
    h2 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      text-transform: uppercase;
    }
  }
`;

const ContactPage = props => {
  return (
    <StyledDiv>
      <MainMenubar />

      <div className="content-and-sub-compass">
        <div className="compass">
          <AboveContentLinks pageTitle="Worship Experience" />
        </div>
        <div className="content-and-sides">
          <div className="side-times">
            <h2>City Temple Baltimore (Baptist)</h2>
            <ul>
              <li>
                <h2>Sunday Worship</h2>9 am
              </li>
              <li>
                <h2>Holy Communion &amp; Baptism</h2>First Sunday of each month
              </li>
              <li>
                <h2>Youth Church</h2>(second Sundays)
                <br />
                9am
              </li>
              <li>
                <h2>Sunday School</h2>11:30 am
              </li>
              <li>
                <h2>Prayer Meeting</h2>Saturday before first Sunday
              </li>
              <li>
                <h2>Bible Study</h2>Tuesday, 12 pm &amp; 7 pm
                <br />
                Saturday, 12 pm
              </li>
            </ul>

            <p className="address-and-contanct-info">
              317 Dolphin Street
              <br />
              Baltimore, MD 21217
              <br />
              Phone: 410.462.4800
              <br />
              Email: connect@thecitytemple.org
              <br />
            </p>
          </div>
          <div className="menu-and-content">
            <div className="content">Main Content Here</div>
          </div>
          <div className="side-content-wrapper">Side Content</div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default ContactPage;
