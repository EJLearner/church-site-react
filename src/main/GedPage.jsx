import React, {useState} from 'react';
import styled from 'styled-components';

import routePaths from '../routePaths';
import {LOGICAL_COLORS, FONT_FAMILIES, COLORS} from '../utils/styleVariables';

import GedPageContactForm from './GedPageContactForm';
import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import ContentAndSides from './commonComponents/ContentAndSides';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentRightSide from './commonComponents/ContentRightSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import SideMenu from './commonComponents/SideMenu';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';
import TopInfoBox from './commonComponents/TopInfoBox';
import TopInfoBoxWrapper from './commonComponents/TopInfoBoxWrapper';

const StyleWrapper = styled.div`
  h2 {
    margin-bottom: 0;
  }

  .subtitle {
    font-style: italic;
  }

  .info-block {
    line-height: 180%;
  }

  .info-title {
    font-weight: bold;
  }

  hr {
    border-top: 0px solid white;
    color: ${COLORS.GRAY180};
  }

  h3 {
    font-family: ${FONT_FAMILIES.ARIAL};
    font-weight: bold;
  }

  .ged-info-group {
    margin-bottom: 5.5em;
  }

  .ged-right-info {
    h3 {
      color: black;
    }

    hr {
      border-color: ${LOGICAL_COLORS.CT_PRIMARY};
    }

    p,
    li {
      line-height: 150%;
      font-size: 13px;
    }

    ul {
      padding-left: 0;
    }

    li {
      list-style: none;
      padding-left: 0;
    }
  }
`;
const IDS = {
  ABOUT: 'about',
  UPCOMING_CLASSES: 'upcoming-classes'
};

function getUpcomingClassesContent() {
  return (
    <>
      <h2>Free GED Preparation Classes</h2>
      <span className="subtitle">
        Sponsored by W.W. Payne Outreach Center in Partnership with Baltimore
        City Community College
      </span>
      <p className="info-block">
        <span className="info-title">
          Registration &amp; Testing for Winter 2020 GED Preparation Classes
        </span>
        <br />
        Wednesday, December 18, 2019
        <br />
        9 am - 12 pm City Temple of Baltimore (Baptist)
        <br />
        Rev. Dr. Grady A. Yeargin, Jr., Pastor W.W. Payne Outreach Center
        <br />
        317 Dolphin Street
        <br />
        Baltimore, MD 21217
      </p>
      <p className="info-block">
        <span className="info-title">GED Preparation Class Schedule</span>
        <br />
        January 13 - February 28, 2020
        <br />
        Every Monday, Wednesday, and Friday
        <br />9 am - 12 pm
      </p>
      <hr />
      <h3>Contact Us for Registration or More Info</h3>

      <GedPageContactForm />
    </>
  );
}

const aboutContent = (
  <>
    <h2>About the GED Prep Program</h2>
    <p>
      The W.W. Payne Education and Community Center was built to support Rev.
      Dr. Grady A. Yeargin, Jr.’s vision to provide outreach services to the
      community. In July 2005, in a meeting with Rev. Dr. Yeargin, Gary Hamiel,
      Marlene Jones and Patricia Payne, staff from the Baltimore City Community
      College presented a proposal to initiate a free, daytime GED class for
      members and community of the City Temple of Baltimore Baptist Church.
    </p>
    <p>The first pre-GED class was introduced in January 2006.</p>
    <p>
      The class was held in the Payne Center on Mondays and Wednesdays from 9:00
      a.m. to 12:00 noon. BCCC provided the teacher and all instructional
      materials and supplies, while City Temple agreed to provide a classroom
      with a blackboard. In addition, City Temple also agreed to:
    </p>
    <ul>
      <li>Offer lunch to the students enrolled in the program.</li>
      <li>Provide duplicating privileges for the instructor’s use.</li>
      <li>Purchase a file cabinet for the instructor’s use.</li>
    </ul>
    <p>
      The largest commitment made by City Temple was the responsibility to
      recruit and retain 15-20 students for the class. Patricia A. Payne was
      asked to lead this charge.
    </p>
    <p>
      The City Temple family has willingly and lovingly adopted this project.
      They actively participate in the recruitment process. They provide
      duplicating paper/services, markers, erasers, money, and instructional
      materials for the program. Members have offered job opportunities, and
      pertinent information about preparing for the GED examination. When
      students are ready to take the actual GED examination, the Outreach
      Ministry has offered to defray the cost for those unable to afford it.
    </p>
    <p>
      With the support of the City Temple family and other external resources,
      included but not limited to the Department of Social Services, Social
      Security, Union Baptist Head Start, Dru-Mondawmin, and the University of
      Maryland, each semester we have had student participation ranging from 15
      to 50 students. There have been several teachers assigned to the program;
      however, beginning in 2009 when the same instructor was permanently
      assigned, student retention stabilized significantly. In addition, an
      average of 20% of the students is promoted to the advanced GED classes,
      and 100% of those students go on to receive their GED certification.
    </p>
    <p>
      The success of the day program motivated the administrators at BCCC to
      invite City Temple to initiate an evening program. Beginning in the fall
      2010, City Temple introduced an evening class held on Mondays and
      Wednesdays from 5:30 to 8:30 p.m. The population for this class satisfied
      the need to serve those who work during the daytime hours.
    </p>
    <p>
      Both classes maintain an average attendance rate of 20-30 students per
      class, with an increase of 10-15% of its students promoting to advanced
      GED classes each semester. This program has attracted students from4@yahoo
      Baltimore City, Baltimore County, Harford County and Anne Arundel County.
    </p>
    <p>
      Recognizing the success of this program, in 2011, BCCC expanded the
      pre-GED classes to three days a week, and introduced a year-round program
      so that classes would continue during the summer.
    </p>
    <p>
      Pre- and post-testing revealed the need for literacy classes. Many of
      those interested in obtaining their GED technically did not qualify for
      the pre-GED class. Therefore, in January 2012, BCCC introduced two BRIDGE
      classes: one for the morning session and the other for the evening. The
      BRIDGE classes are currently two days a week. The class size for the
      BRIDGE class is generally 10-15 students.
    </p>
    <p>
      With this expansion, coupled with the love and support provided by the
      City Temple family, the program has the potential to reach even greater
      heights.
    </p>
    <p>
      For more information, please contact{' '}
      <a href="mailto:carolyn.gaskins@thecitytemple.org?Subject=GED Program">
        <b>Carolyn Gaskins</b>
      </a>
      .
    </p>
  </>
);

const allContentData = [
  {
    getContent: getUpcomingClassesContent,
    id: IDS.UPCOMING_CLASSES,
    title: 'Upcoming Classes & Registration'
  },
  {
    getContent: () => aboutContent,
    id: IDS.ABOUT,
    title: 'About the GED Prep Program'
  }
];

export default function GedPage() {
  const [contentId, setContentId] = useState(allContentData[0].id);
  const [formInfo, setFormInfo] = useState({email: '', message: '', name: ''});

  const {getContent} = allContentData.find(({id}) => id === contentId);

  const content = getContent(formInfo, setFormInfo);

  return (
    <StyleWrapper>
      <StandardPageWrapper>
        <MainMenubar />
        <TopInfoBoxWrapper>
          <TopInfoBox>
            <h1>Reach Your Potential</h1>
            <p>
              GED® test preparation includes classroom instruction, textbook,
              calculator, test taking strategies, GED® Ready Practice Test, and
              participation in transition activities. City Temple is proud to be
              one of many locations throughout the city offering these free
              preparation courses.
            </p>
          </TopInfoBox>
          <ContentAndSubCompassWrapper>
            <AboveContentLinks
              pagePath={routePaths.MAIN_GED}
              pageTitle="Ged Program"
            />
            <ContentAndSides>
              <ContentLeftSide>
                <SideMenu
                  currentId={contentId}
                  menuData={allContentData}
                  onClick={id => setContentId(id)}
                  title="Ged Program"
                />
              </ContentLeftSide>
              <ContentWrapper>{content}</ContentWrapper>
              <ContentRightSide>
                <div className="ged-right-info">
                  <div className="ged-info-group">
                    <h3>Contact</h3>
                    <hr />
                    <p>443-800-9231</p>
                  </div>
                  <div className="ged-info-group">
                    <h3>
                      GED® Test Preparation Classes Offered at No Cost to You
                    </h3>
                    <hr />
                    <p>
                      Preparation classes provide instruction in the skill areas
                      of reading and math. These no cost classes are offered
                      three times per week at the following times:
                    </p>
                    <ul>
                      <li>Monday: 9 am - noon</li>
                      <li>Wednesday: 9 am - noon</li>
                      <li>Friday: 9 am - noon</li>
                    </ul>
                  </div>
                </div>
              </ContentRightSide>
            </ContentAndSides>
          </ContentAndSubCompassWrapper>
        </TopInfoBoxWrapper>
      </StandardPageWrapper>
    </StyleWrapper>
  );
}
