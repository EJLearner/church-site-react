import React from 'react';
import {Link} from 'react-router-dom';
import routePaths from '../../src/routePaths';

import logo from '../assets/main/images/logo-ct-circle-white-cropped.png';

import './MainFooter.css';

const footerLinks1 = [
  {text: 'Youth', path: routePaths.MAIN_HOME},
  {text: 'Adults', path: routePaths.MAIN_HOME},
  {text: 'Staff', path: routePaths.MAIN_HOME},
  {text: 'Parents', path: routePaths.MAIN_HOME},
  {text: 'Visit', path: routePaths.MAIN_HOME}
];

const footerLinks2 = [
  {text: 'Directions', path: routePaths.MAIN_HOME},
  {text: 'Map', path: routePaths.MAIN_HOME},
  {text: 'Make a Gift', path: routePaths.MAIN_HOME}
];

const footerLinks3 = [
  {text: 'Job Opportunities', path: routePaths.MAIN_HOME},
  {text: 'Faith Statement', path: routePaths.MAIN_HOME}
];

function renderFooterLinks(footerLinksInfo) {
  const linksRender = footerLinksInfo.map(({text, path}) => {
    return (
      <Link key={text} to={path}>
        {text}
      </Link>
    );
  });

  return <div>{linksRender}</div>;
}

function renderAddress() {
  return (
    <div>
      The City Temple of Baltimore (Baptist)
      <br />
      317 Dolphin Street
      <br />
      Baltimore, Maryland 21217
      <br />
      410.462.4800
      <br />
      <a href="mailto:church@thecitytemple.org">Contact Us</a>
    </div>
  );
}

class MainFooter extends React.Component {
  render() {
    return (
      <div className="main-footer">
        {renderFooterLinks(footerLinks1)}
        {renderFooterLinks(footerLinks2)}
        <div>
          <Link to={routePaths.MAIN_HOME}>
            <img alt="City Temple Church Logo" height="115px" src={logo} />
          </Link>
        </div>
        {renderFooterLinks(footerLinks3)}
        {renderAddress()}
      </div>
    );
  }
}

export default MainFooter;
