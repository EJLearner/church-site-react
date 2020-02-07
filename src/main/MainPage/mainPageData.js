import eventContentTemplate from '../../assets/main/images/event-content-template.png';

import JubileeContent from './BoxContent/JubileeContent';
import CultureAndFineArts from './BoxContent/CultureAndFineArts';
import ChristianEducation from './BoxContent/ChristianEducation';
import routePaths from '../../routePaths';
import GedProgram from './BoxContent/GedProgram';
import WorshipExperience from './BoxContent/WorshipExperience';

const scrollingEventsTextInfo = [
  {date: '2025-11-28', title: 'Earl’s Birthday', path: 'https://earljones.dev'},
  {
    date: '2019-08-12',
    title: 'April’s Birthday',
    path: 'https://rainyaprilday.com'
  },
  {
    date: '2019-11-28',
    title: 'Earl’s Birthday 2',
    path: 'https://earljones.dev'
  },
  {
    date: '2019-11-28',
    title: 'Earl’s Birthday 3',
    path: 'https://earljones.dev'
  },
  {
    date: '2019-11-28',
    title: 'Earl’s Birthday 4',
    path: 'https://earljones.dev'
  },
  {
    date: '2019-11-28',
    title: 'Earl’s Birthday 5',
    path: 'https://earljones.dev'
  }
];

const contentSelectInfo = [
  {
    linkPath: routePaths.MAIN_JUBILEE,
    render: JubileeContent,
    showUntil: '2021-01-01',
    title: '50th Anniversary Celebration',
    thumbnail: eventContentTemplate
  },
  {
    linkPath: routePaths.MAIN_CULTURE_AND_ARTS,
    render: CultureAndFineArts,
    title: 'Culture & Fine Arts',
    thumbnail: eventContentTemplate
  },
  {
    linkPath: routePaths.MAIN_WORSHIP_EXPERIENCE,
    render: WorshipExperience,
    title: 'Worship Experience',
    thumbnail: eventContentTemplate
  },
  {
    linkPath: routePaths.CE_HOME,
    render: ChristianEducation,
    title: 'Christian Education',
    thumbnail: eventContentTemplate
  },
  {
    linkPath: routePaths.CE_HOME,
    render: GedProgram,
    title: 'GED Program',
    thumbnail: eventContentTemplate
  }
];

export {contentSelectInfo, scrollingEventsTextInfo};
