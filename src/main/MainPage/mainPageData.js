import choirThumb from '../../assets/main/images/choir-thumb.jpg';
import dance from '../../assets/main/images/dance.jpg';
import christianEdPeopleThumb from '../../assets/main/images/christian-ed-people-thumb.jpg';
import shofarBlowers from '../../assets/main/images/shofar-blowers.jpg';

import JubileeContent from './BoxContent/JubileeContent';
import CultureAndFineArts from './BoxContent/CultureAndFineArts';
import ChristianEducation from './BoxContent/ChristianEducation';
import routePaths from '../../routePaths';
// import GedProgram from './BoxContent/GedProgram';
import WorshipExperience from './BoxContent/WorshipExperience';

const contentSelectInfo = [
  {
    linkPath: routePaths.MAIN_JUBILEE,
    render: JubileeContent,
    showUntil: '2021-01-01',
    title: '50th Anniversary Celebration',
    thumbnail: shofarBlowers
  },
  {
    linkPath: routePaths.MAIN_CULTURE_AND_ARTS,
    render: CultureAndFineArts,
    title: 'Culture & Fine Arts',
    thumbnail: dance
  },
  {
    linkPath: routePaths.MAIN_CONTACT,
    render: WorshipExperience,
    title: 'Worship Experience',
    thumbnail: choirThumb
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
