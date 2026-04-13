import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getDatabase, onValue, ref} from 'firebase/database';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

import '../../firebaseApp';
import routePaths from '../../routePaths';
import constants from '../../utils/constants';
import Menubar from '../Menubar';

const baseMenuItems = [
  {text: 'Home', path: '/'},
  {text: 'Profile', path: `/${routePaths.MAIN_PROFILE}`},
  {text: 'Meditations', path: `/${routePaths.MAIN_MEDITATIONS}`},
  {text: 'Giving', path: `/${routePaths.MAIN_GIVING}`},
  {text: 'Bible Study', path: `/${routePaths.BIBLE_STUDY}`},
  {text: 'Calendar', path: `/${routePaths.MAIN_CALENDAR}`},
  {text: 'Watch', path: `/${routePaths.MAIN_WATCH}`},
  {text: 'Contact', path: `/${routePaths.MAIN_CONTACT}`},
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- may want this later
const StyledAnnouncementBar = styled.div`
  padding: 0.1em;
  background-color: var(--accent-background);
  color: var(--accent-content);
  font-size: 24px;
  text-align: center;

  .funeral-popout-link,
  .funeral-popout-link:visited {
    cursor: pointer;
    color: var(--accent-content);
  }
`;

function MainMenubar({imageSource}) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    const unsubscribeDb = {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      Object.values(unsubscribeDb).forEach((fn) => fn());

      if (!user) {
        setIsAdmin(false);
        return;
      }

      const {GROUP_PAGES} = constants;
      const accessiblePages = new Set();

      Object.keys(GROUP_PAGES).forEach((groupKey) => {
        unsubscribeDb[groupKey] = onValue(
          ref(db, `user_groups/${groupKey}`),
          (snapshot) => {
            const members = snapshot.val();
            if (members?.[user.uid]) {
              GROUP_PAGES[groupKey]?.forEach((page) =>
                accessiblePages.add(page),
              );
            }
            setIsAdmin(accessiblePages.size > 0);
          },
        );
      });
    });

    return () => {
      unsubscribeAuth();
      Object.values(unsubscribeDb).forEach((fn) => fn());
    };
  }, []);

  const menuItems = [
    ...baseMenuItems,
    ...(isAdmin ? [{text: 'Admin', path: '/admin/'}] : []),
  ];

  return <Menubar imageSource={imageSource} menuItems={menuItems} />;
}

MainMenubar.propTypes = {
  imageSource: PropTypes.string,
};

export default MainMenubar;
