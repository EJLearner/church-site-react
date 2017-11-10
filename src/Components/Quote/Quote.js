import React, {Component} from 'react';
import random from 'lodash/random';

import './Quote.css';

class Quote extends Component {
  getQuote() {
    const quotes = [
      '“But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To Him be the glory both now and to the day of eternity. Amen.”',
      '“An intelligent heart acquires knowledge, and the ear of the wise seeks knowledge. Proverbs 18:15”',
      '“Give instruction to a wise man, and he will be still wiser; teach a righteous man, and he will increase in learning. Proverbs 9:9”',
      '“Everyone who goes on ahead and does not abide in the teaching of Christ, does not have God. Whoever abides in the teaching has both the Father and the Son. 2 John 1:9”',
      '“Apply your heart to instruction and your ear to words of knowledge. Proverbs 23:12”',
      '“And these words that I command you today shall be on your heart. You shall teach them diligently to your children, and shall talk of them when you sit in your house, and when you walk by the way, and when you lie down, and when you rise. You shall bind them as a sign on your hand, and they shall be as frontlets between your eyes. You shall write them on the doorposts of your house and on your gates. Deuteronomy 6:6-9”',
      '“Things that we have heard and known, that our fathers have told us. We will not hide them from their children, but tell to the coming generation the glorious deeds of the Lord, and his might, and the wonders that he has done. He established a testimony in Jacob and appointed a law in Israel, which he commanded our fathers to teach to their children, that the next generation might know them, the children yet unborn, and arise and tell them to their children, so that they should set their hope in God and not forget the works of God, but keep his commandments... Psalm 78: 3-8”',
      '“Whoever walks with the wise becomes wise, but the companion of fools will suffer harm. Proverbs 13:20”',
      '“Iron sharpens iron, and one man sharpens another. Proverbs 27:17”'
    ];

    return quotes[random(0, quotes.length - 1)];
  }

  render() {
    return <p id="bottomquote">{this.getQuote()}</p>;
  }
}

export default Quote;
