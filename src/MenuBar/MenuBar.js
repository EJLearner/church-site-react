import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MenuBar extends Component {
  render() {
    return (
      <div id="menubar">
        <ul className="cfm">
          <li><Link to="/">Welcome</Link></li>
          <li><Link to="/who">Who We are</Link></li>
          <li><Link to="/why">Why We Are Here</Link></li>
          <li><Link to="/where">Where We Are Going</Link></li>
          <li className='second-to-last-menu-item'><Link to="/what">What's In Store</Link></li>
          <li className="lastmenuitem"><Link to="/ideaform">Tell Us What You Think</Link></li>
        </ul>
      </div>
    );
  }
}

export default MenuBar;
