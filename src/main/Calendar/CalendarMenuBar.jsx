import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const CalendarMenuBarStyles = styled.div`
  &#calendar-menu {
    margin: 16px 0;
    display: flex;
    justify-content: center;
    // TODO: under 500px, the menu bar should go vertical or something
    min-width: 500px;

    ul {
      box-sizing: border-box;
      display: inline-block;
      justify-content: flex-start;
      min-width: initial;
      margin-bottom: 0;
      padding: 0;
      width: initial;
      list-style-type: none;
      text-align: left;
    }

    li {
      font-size: var(--19-font-clamped);
      border: none;
      display: inline-block;
      margin-top: 0px;
      padding: 0 clamp(6px, calc(-2.909px + 0.909vw), 8px);
      text-align: center;
    }

    li a,
    li a:visited {
      color: black;
      padding: 0 clamp(0px, calc(-4.364px + 1.364vw), 12px);
      text-align: center;
      text-decoration: none;
    }

    li a:hover {
      text-decoration: underline;
    }

    li.current-page-link {
      border: 1px solid gray;
      border-bottom: none;
    }

    li:not(.current-page-link) {
      border-bottom: 1px solid gray;
    }

    li.current-page-link a,
    li.current-page-link a:visited {
      color: black;
    }

    // causes line to extend further past the last link
    .empty-space {
      bottom: 0;
      border-bottom: 1px solid gray;
      display: inline-block;
      width: clamp(0px, calc(-14.545px + 4.545vw), 40px);
    }
  }
`;

function CalendarMenuBar({links}) {
  const {pathname} = useLocation();
  const renderedLinks = links.map(({path, text}) => {
    let className =
      path !== '/' && pathname.indexOf(path) > -1 ? 'current-page-link' : null;

    const isHomePage =
      !pathname || pathname === '/christianedu.html' || pathname === '/';

    if (path === '/' && isHomePage) {
      className = 'current-page-link';
    }

    return (
      <li className={className} key={path}>
        <Link to={`../calendar/${path}`}>{text}</Link>
      </li>
    );
  });

  return (
    <CalendarMenuBarStyles className="menu-bar" id="calendar-menu">
      <div className="empty-space">&nbsp;</div>
      <ul>{renderedLinks}</ul>
      <div className="empty-space">&nbsp;</div>
    </CalendarMenuBarStyles>
  );
}

CalendarMenuBar.propTypes = {
  id: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
};

CalendarMenuBar.defaultProps = {
  showLogo: true,
};

export default CalendarMenuBar;
