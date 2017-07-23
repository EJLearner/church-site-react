import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {

  render() {
    return (
      // TODO: See if I can make links out to other city temple sites relational

      <div id="footerbar">
        <div id="footer" className="cf">
          <div id="footerlinks">
            <div className="footlinklist cf">
              <h3>About Us</h3>
              <ul>
                <li><Link to="/who">Who We Are</Link></li>
                <li><Link to="/why">Why We Are Here</Link></li>
                <li><Link to="/where">Where Are We Going</Link></li>
              </ul>
            </div>
            <div className="footlinklist">
              <h3>Learn More</h3>
              <ul>
                <li><Link to="/what">What's In Store</Link></li>
                <li><a href="http://www.thecitytemple.org/blog/">Pastor's Blog</a></li>
                <li><a href="http://www.thecitytemple.org/aboutpage.php?p=membership">Join Our Church</a></li>
              </ul>
            </div>
            <div className="footlinklist">
              <h3>Participate</h3>
              <ul>
                <li><Link to="/ideaform">Tell Us What You Think</Link></li>
                <li><a href="http://www.thecitytemple.org/submenu.php?p=giving">Donate</a></li>
                <li><a href="http://www.thecitytemple.org/ministries.php">Join A Ministry</a></li>
              </ul>
            </div>
          </div>
          <div id="socialcopyright">
            <a href="https://www.facebook.com/thecitytemple"><i className="fa fa-facebook fa-2x" title="FaceBook Icon" /></a>
            <a href="https://twitter.com/thecitytemple"><i className="fa fa-twitter fa-2x" title="Twitter Icon" /></a>
            <a href="mailto:church@thecitytemple.org"><i className="fa fa-envelope fa-2x" title="Mail Us" /></a>
            <p>&copy; {new Date().getFullYear()} The City Temple (Baptist) Church</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
