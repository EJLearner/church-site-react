import React from 'react';
import styled from 'styled-components';

import {COLORS, LOGICAL_COLORS} from '../../utils/styleVariables';

import PropTypes from 'prop-types';
import PlainButton from './PlainButton';

const LeftSide = styled.div`
  background-color: ${COLORS.WHITE};
  font-size: 13.33px;
  border: 1px solid gray;
  padding: 1em;

  h2 {
    margin-top: 0;
  }

  ul {
    padding-left: 0;
  }

  ul ul {
    padding-left: 1em;
  }

  li {
    list-style-type: none;

    &:hover {
      text-decoration: underline;
    }
  }

  li.selected {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }
`;

const ContentButton = styled(PlainButton)`
  display: block;
  line-height: 150%;
`;

const MenuTitle = styled.h2`
  font-size: 110%;
  text-transform: uppercase;
`;

const subMenu = subLinks => {
  return (
    <ul>
      {subLinks.map(({elementId, title}) => (
        <li key={title}>
          <a href={`#${elementId}`}>{title}</a>
        </li>
      ))}
    </ul>
  );
};

const renderMenuItem = menuItemData => {
  const {id, isSelected, onClick, subLinks, title} = menuItemData;

  return (
    <React.Fragment key={id}>
      <li
        className={isSelected ? 'selected' : null}
        onClick={() => onClick(id)}
      >
        <ContentButton>{title}</ContentButton>
      </li>
      {subLinks && isSelected && subMenu(subLinks)}
    </React.Fragment>
  );
};

const SideMenu = ({currentId, onClick, menuData, title}) => {
  return (
    <LeftSide>
      <MenuTitle>{title}</MenuTitle>
      <ul>
        {menuData.map(menuItemInfo =>
          renderMenuItem({
            ...menuItemInfo,
            onClick,
            isSelected: menuItemInfo.id === currentId
          })
        )}
      </ul>
    </LeftSide>
  );
};

SideMenu.propTypes = {
  currentId: PropTypes.string.isRequired,
  menuData: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default SideMenu;
