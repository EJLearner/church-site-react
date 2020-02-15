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

  .compass {
    padding-left: 1em;
    padding-top: 1em;

    a {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
    }
  }

  .content-and-sides {
    border-top: 1px solid ${borderColor};
    display: flex;
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
