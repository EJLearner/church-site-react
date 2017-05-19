import React, {Component} from 'react';
import fbLogo from './smfbblack.png'
import twitterLogo from './smtwblack.png'
import envelope from './smmailblack.png'


class Footer extends Component {

  render() {
    const currentYear = new Date().getFullYear();

    return (
      <div id="footerbar">
        <div id="footer" className="cf">
          <div id="footerlinks">
          <div className="footlinklist cf">
          <h3>About Us</h3>
          <ul>
            <li><a href="christianedu.php?p=who">Who We Are</a></li>
            <li><a href="christianedu.php?p=why">Why We Are Here</a></li>
            <li><a href="christianedu.php?p=where">Where Are We Going</a></li>
          </ul>
          </div>
          <div className="footlinklist">
          <h3>Learn More</h3>
          <ul>
            <li><a href="christianedu.php?p=what">What's In Store</a></li>
            <li><a href="/blog/">Pastor's Blog</a></li>
            <li><a href="aboutpage.php?p=membership">Join Our Church</a></li>
          </ul>
          </div>
          <div className="footlinklist">
          <h3>Participate</h3>
          <ul>
            <li><a href="christianedu.php?p=ideaform">Tell Us What You Think</a></li>
            <li><a href="christianedu.php?p=welcome">Take Our Survey</a></li>
            <li><a href="submenu.php?p=giving">Donate</a></li>
            <li><a href="ministries.php">Join A Ministry</a></li>
          </ul>
          </div>
          </div>
          <div id="socialcopyright">
            <a href="https://www.facebook.com/thecitytemple"><img src={fbLogo} alt="FaceBook Icon" />></a>
            <a href="https://twitter.com/thecitytemple"><img src={twitterLogo} alt="Twitter Icon" />></a>
            <a href="mailto:church@thecitytemple.org"><img src={envelope} alt="Mail Us" />></a>
            <p>&copy; {currentYear} The City Temple (Baptist) Church</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
