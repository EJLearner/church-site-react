import React, {Component} from 'react';

class MenuBar extends Component {
  render() {
    return (
      <div id="menubar">
        <ul className="cfm">
          <li><a href="christianedu.php?p=welcome">Welcome</a></li>
          <li><a href="christianedu.php?p=who">Who We are</a></li>
          <li><a href="christianedu.php?p=why">Why We Are Here</a></li>
          <li><a href="christianedu.php?p=where">Where We Are Going</a></li>
          <li className='second-to-last-menu-item'><a href="christianedu.php?p=what">What's In Store</a></li>
          <li className="lastmenuitem"><a href="christianedu.php?p=ideaform">Tell Us What You Think</a></li>
        </ul>
      </div>
    );
  }
}

export default MenuBar;