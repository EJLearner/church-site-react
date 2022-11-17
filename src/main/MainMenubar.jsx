import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  padding-top: 1px; // collapsing margin fix, otherwise, there's white space at the top
`;

const StyledMainMenuBar = styled.nav`
  border-top: 1px solid var(--standard-border);
  border-bottom: 1px solid var(--standard-border);
  display: flex;
  font-family: var(--serif);
  font-size: 20px;
  justify-content: center;
  margin-top: 32px;
  text-transform: uppercase;

  & > div {
    margin: 0 16px;
    padding: 16px 8px;
  }
`;

const MainMenubar = ({menuItems}) => {
  const renderedMenuItems = menuItems.map(({hash = '', text, path}) => {
    return (
      <div className="main-menu-item" key={text}>
        <Link to={path + hash}>{text}</Link>
      </div>
    );
  });

  return (
    <StyledHeader>
      <StyledMainMenuBar className="main-menu-bar">
        {renderedMenuItems}
      </StyledMainMenuBar>
    </StyledHeader>
  );
};

MainMenubar.propTypes = {
  menuItems: PropTypes.array.isRequired
};

export default MainMenubar;
