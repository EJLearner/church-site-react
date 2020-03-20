import choirThumb from '../../assets/main/images/choir-thumb.jpg';
import christianEdPeopleThumb from '../../assets/main/images/christian-ed-people-thumb.jpg';
import coronavirus from '../../assets/main/images/coronavirus-thumb.png';
import dance from '../../assets/main/images/dance.jpg';
import shofarBlower from '../../assets/main/images/shofar-blower-thumb.png';
import routePaths from '../../routePaths';

import ChristianEducation from './BoxContent/ChristianEducation';
import CultureAndFineArts from './BoxContent/CultureAndFineArts';
import JubileeContent from './BoxContent/JubileeContent';


// import GedProgram from './BoxContent/GedProgram';
import WorshipExperience from './BoxContent/WorshipExperience';
import CoronaVirusContent from './CoronaVirusContent';

const contentSelectInfo = [
  {
    linkPath: routePaths.MAIN_CONTACT,
    render: WorshipExperience,
    title: 'Worship Experience',
    thumbnail: choirThumb
  },
  {
    linkPath: routePaths.MAIN_JUBILEE,
    render: JubileeContent,
    showUntil: '2021-01-01',
    title: '50th Anniversary Celebration',
    thumbnail: shofarBlower
  },
  {
    linkPath: routePaths.MAIN_CORONAVIRUS,
    render: CoronaVirusContent,
    title: 'Coronavirus Update',
    thumbnail: coronavirus
  },
  {
    linkPath: routePaths.MAIN_CULTURE_AND_ARTS,
    render: CultureAndFineArts,
    title: 'Culture & Fine Arts',
    thumbnail: dance
  },
  {
    linkPath: routePaths.CE_HOME,
    render: ChristianEducation,
    title: 'Christian Education',
    thumbnail: christianEdPeopleThumb
  }

  // TODO: add this back later
  // {
  //   linkPath: routePaths.CE_HOME,
  //   render: GedProgram,
  //   title: 'GED Program',
  //   thumbnail: eventContentTemplate
  // }
];

export {contentSelectInfo};
