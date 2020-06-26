import React from 'react';
import styled from 'styled-components';

import powerPointFile from '../../assets/main/2020-graduates.pptx';
import GedThumb from '../../assets/main/images/GED-thumbnail.png';
import choirThumb from '../../assets/main/images/choir-thumb.jpg';
import christianEdPeopleThumb from '../../assets/main/images/christian-ed-people-thumb.jpg';
import coronavirus from '../../assets/main/images/coronavirus-thumb.png';
import dance from '../../assets/main/images/dance.jpg';
import shofarBlower from '../../assets/main/images/shofar-blower-thumb.png';
import slideshowThumb from '../../assets/main/images/slideshow-thumb.png';
import slideshow from '../../assets/main/images/slideshow.png';
import routePaths from '../../routePaths';
import {endOfYesterday, isAfter, parseISO} from '../../utils/dateTimeUtils';
import {LOGICAL_COLORS} from '../../utils/styleVariables';

import ChristianEducation from './BoxContent/ChristianEducation';
import CultureAndFineArts from './BoxContent/CultureAndFineArts';
import GedProgram from './BoxContent/GedProgram';
import JubileeContent from './BoxContent/JubileeContent';
import WorshipExperience from './BoxContent/WorshipExperience';
import CoronaVirusContent from './CoronaVirusContent';

const StyleWrapper = styled.div`
  text-align: center;

  img {
    width 95%;
    height: auto;
  }

  em {
    color: ${LOGICAL_COLORS.CT_ACCENT};
    font-weight: bold;
    font-style: normal;
    text-transform: uppercase;
  }
`;

// TODO remove this after it stops showing
function SlideShow() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <StyleWrapper>
      <h1>Congratulations Graduates!</h1>

      <a href={powerPointFile}>
        <img alt="Graduates Slideshow" src={slideshow} />
      </a>
    </StyleWrapper>
  );
}

const contentSelectInfo = [
  {
    expirationDate: '2020-07-01',
    externalLink: true,
    learnMoreText: 'Watch Slideshow',
    linkPath: powerPointFile,
    Component: SlideShow,
    thumbnail: slideshowThumb,
    title: 'Congrats Graduates!!'
  },
  {
    learnMoreText: 'Watch Sermon',
    linkPath: routePaths.MAIN_WATCH,
    Component: WorshipExperience,
    thumbnail: choirThumb,
    title: 'Watch Sunday’s Sermon'
  },
  {
    linkPath: routePaths.MAIN_JUBILEE,
    Component: JubileeContent,
    showUntil: '2021-01-01',
    thumbnail: shofarBlower,
    title: '50th Anniversary Celebration'
  },
  {
    linkPath: routePaths.MAIN_CORONAVIRUS,
    Component: CoronaVirusContent,
    thumbnail: coronavirus,
    title: 'Coronavirus Update'
  },
  {
    linkPath: routePaths.MAIN_CULTURE_AND_ARTS,
    Component: CultureAndFineArts,
    thumbnail: dance,
    title: 'Culture & Fine Arts'
  },
  {
    linkPath: routePaths.CE_HOME,
    Component: ChristianEducation,
    thumbnail: christianEdPeopleThumb,
    title: 'Christian Education'
  },
  {
    linkPath: routePaths.MAIN_GED,
    Component: GedProgram,
    render: GedProgram,
    title: 'GED Program',
    thumbnail: GedThumb
  }
].filter(
  ({expirationDate}) =>
    !expirationDate || isAfter(parseISO(expirationDate), endOfYesterday())
);

export {contentSelectInfo};
