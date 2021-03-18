import {CovidQAndA} from './CovidQAndA';
import {LiveSistersConversation} from './LiveSistersConversation';

const getAnnouncementsContentArray = () => {
  return [CovidQAndA(), LiveSistersConversation()].filter(Boolean);
};

export default getAnnouncementsContentArray;
