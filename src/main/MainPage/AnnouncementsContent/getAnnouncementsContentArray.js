import {CovidQAndA} from './CovidQAndA';

const getAnnouncementsContentArray = () => {
  return [CovidQAndA()].filter(Boolean);
};

export default getAnnouncementsContentArray;
