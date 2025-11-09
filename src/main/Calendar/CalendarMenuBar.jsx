import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const CalendarMenuBarStyles = styled.div`
  &#calendar-menu {
    display: block;
    margin: 16px 0;
    padding: 0;
    position: relative;
    align-items: center;
    font-family: var(--sans-serif);
    font-size: 20px;
    justify-content: space-between;
    min-width: 800px;

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
      border: none;
      display: inline-block;
      margin-top: 0px;
      padding: 0 8px;
      text-align: center;
    }

    li a,
    li a:visited {
      color: black;
      padding: 0 12px;
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
      width: 5%;
    }
  }
`;

function CalendarMenuBar({links, id}) {
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
        <Link to={`../calendar/${  path}`}>{text}</Link>
      </li>
    );
  });

  return (
    <CalendarMenuBarStyles className="menu-bar" id={id}>
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
