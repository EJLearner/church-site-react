import React from 'react';
import styled from 'styled-components';
import churchExteriorTallPicture from '../assets/main/images/church-exterior-tall.png';

import MainMenubar from './MainMenubar';
import {WIDTHS} from '../utils/styleVariables';

const PictureAndContacts = styled.div`
  margin: 0 ${WIDTHS.SIDE_CONTENT_PADDING}
  display: flex;
`;

const ChurchAndOfficePhone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2em;
`;
const ContactList = styled.div``;
const Contact = styled.section``;

const ContactPage = props => {
  return (
    <>
      <MainMenubar />
      <PictureAndContacts>
        <ChurchAndOfficePhone>
          <img alt="Church" src={churchExteriorTallPicture} />
          <div>
            <b>Main Office Phone:</b>
            <br />
            (410) 462-4800
          </div>
        </ChurchAndOfficePhone>
        <ContactList>
          <Contact>
            <h3>Send your inquiry to the Pastor to:</h3>
            <div className="contactinfo">
              City Temple of Baltimore (Baptist)
              <br />
              c/o Rev. Dr. Grady A. Yeargin, Jr.
              <br />
              317 Dolphin Street
              <br />
              Baltimore, MD 21217
              <br />
              (410) 462-4802
              <br />
            </div>
          </Contact>
          <Contact>
            <h3>Send your inquiry to the Outreach Department to:</h3>
            <div className="contactinfo">
              City Temple of Baltimore (Baptist)
              <br />
              c/o Gary Hamiel
              <br />
              317 Dolphin Street
              <br />
              Baltimore, MD 21217
              <br />
              (410) 383-8040
              <br />
            </div>
          </Contact>
          <Contact>
            <h3>Send your inquiry to the Music Department to:</h3>
            <div className="contactinfo">
              City Temple of Baltimore (Baptist)
              <br />
              c/o Dr. Kenneth Dean, Jr.
              <br />
              317 Dolphin Street
              <br />
              Baltimore, MD 21217
              <br />
              (410) 462-4801
              <br />
            </div>
          </Contact>
        </ContactList>
      </PictureAndContacts>
    </>
  );
};

export default ContactPage;
