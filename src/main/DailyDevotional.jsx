import React, {useState, useEffect} from 'react';
import getVerseInfo from '../stores/getVerseInfo';

import './DailyDevotional.css';

function DailyDevotional() {
  const [passageInfo, setPassageInfo] = useState('');

  useEffect(() => {
    getVerseInfo('Isaiah 39.8-40.5', response => {
      setPassageInfo(response);
    });
  }, []);

  return (
    <div className="daily-devotional-section">
      <h3>Daily Devotional</h3>
      <span>{passageInfo.reference}</span>
      <div
        className="verses"
        dangerouslySetInnerHTML={{__html: passageInfo.content}}
      />
    </div>
  );
}

export default DailyDevotional;
