import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const StyledMenuBar = styled.header`
  padding-top: 1px; // collapsing margin fix, otherwise, there's white space at the top
  background: ${(props) =>
    props.imageSource &&
    `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${props.imageSource});`};
  padding: 32px var(--gutter-space) 32px var(--gutter-space);

  .main-menu-bar {
    border-top: 1px solid var(--main-menu-border);
    border-bottom: 1px solid var(--main-menu-border);
    font-family: var(--serif);
    font-size: clamp(16px, 2vw, 20px);
    text-transform: uppercase;

    .main-menu-items-wrapper {
      display: flex;
      gap: 5px;
      justify-content: space-around;
    }
  }

  .main-menu-item {
    padding: 16px 4px;

    &.active a {
      color: var(--accent-background);
    }
  }

  @media (max-width: 700px) {
    padding-bottom: 1rem;

    .main-menu-bar {
      border-bottom: none;
      border-top: none;
    }

    .main-menu-item {
      padding: 0;
    }

    .main-menu-items-wrapper {
      align-items: center;
      flex-direction: column;
    }
  }
`;

const Menubar = ({imageSource, menuItems}) => {
  const {pathname} = useLocation();

  console.log(pathname);

  const renderedMenuItems = menuItems.map(({hash = '', text, path}) => {
    let className = 'main-menu-item';

    console.log({pathname, path});

    if (path === '/' && pathname === '/') {
      className += ' active';
    } else if (pathname.includes(path) && path !== '/') {
      className += ' active';
    }

    return (
      <div className={className} key={text}>
        <Link to={path + hash}>{text}</Link>
      </div>
    );
  });

  return (
    <StyledMenuBar imageSource={imageSource}>
      <div className="main-menu-bar">
        <div className="main-menu-items-wrapper">{renderedMenuItems}</div>
      </div>
    </StyledMenuBar>
  );
};

Menubar.propTypes = {
  imageSource: PropTypes.string,
  menuItems: PropTypes.array.isRequired,
};

export default Menubar;
