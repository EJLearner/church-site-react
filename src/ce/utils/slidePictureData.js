import moment from 'moment';

const getNextSaturdayBeforeFirstSunday = () => {
  const selectedSunday = moment().day(0);

  while (
    selectedSunday.isBefore(moment(), 'day') ||
    selectedSunday.isSame(moment(), 'month')
  ) {
    selectedSunday.add(7, 'days');
  }

  return selectedSunday.subtract(1, 'days').format('YYYY-MM-DD');
};

const allPictures = [
  {
    altTag:
      'Christian Education Sunday 9/23/2018. Reception to follow after worship service',
    displayBeg: '2018-06-01',
    displayEnd: '2018-09-23',
    source: require('../../assets/ce/images/slides/christian-ed-home-ce-sunday.png')
  },
  {
    altTag: 'Christmas Eve Service: Sunday 24th December at 9am',
    displayBeg: '2017-11-25',
    displayEnd: '2017-12-25',
    source: require('../../assets/ce/images/slides/christian-ed-home-christmas-eve.png')
  },
  {
    altTag:
      'Celebrate Holy week with us: Psalm Sunday March 25, 2018 at 9am, ' +
      'Maunday Thursday March 29, 2018 at 7pm, Easter Service APril 1, 2018 at 9am',
    displayBeg: '2018-02-25',
    displayEnd: '2018-05-01',
    source: require('../../assets/ce/images/slides/christian-ed-home-holy-week.png')
  },
  {
    altTag: 'Christ Is Risen: Celebrate the Savior',
    annual: true,
    displayBeg: '2018-03-01',
    displayEnd: '2018-05-01',
    source: require('../../assets/ce/images/slides/christian-ed-home-christ-risen.png')
  },
  {
    altTag: 'Leadership prayer serviec: Every saturday before the first sunday',
    linkPath: {
      pathname: '/calendar/day',
      state: {selectedDay: getNextSaturdayBeforeFirstSunday()}
    },
    source: require('../../assets/ce/images/slides/christian-ed-home-leadership-prayer.png')
  },
  {
    altTag:
      'o be a good father and mother requires that the parents defer many of ' +
      'their own needs and desires in favor of the needs of their children. As a ' +
      'consequence of this sacrifice, conscientious parents develop a nobility of ' +
      'character and learn to put into practice the selfless truths taught by the Savior Himself. Quote from Robert Faust' +
      'Mother’s Day Service May 13' +
      'Father’s Day Service June 17',
    displayBeg: '2018-05-01',
    displayEnd: '2018-06-20',
    source: require('../../assets/ce/images/slides/christian-ed-home-mothers-fathers.png')
  },
  {
    altTag: 'City Temple 2020 Vision',
    linkPath: '/vision/thevision',
    source: require('../../assets/ce/images/slides/christian-ed-home-banner-2020.png')
  },
  {
    altTag: 'Bible Study - Every Tuesday at 7:30 PM and Every Saturday at Noon',
    source: require('../../assets/ce/images/slides/christian-ed-home-bible-study.png')
  }
];

const _filterAndLimit = function(pictures, maxPics) {
  return allPictures
    .filter(picture => {
      let {annual, displayBeg, displayEnd} = picture;

      if (annual) {
        const currentYear = moment().year();
        if (displayBeg) {
          displayBeg = moment(displayBeg).year(currentYear);
        }

        if (displayEnd) {
          displayEnd = moment(displayEnd).year(currentYear);
        }
      }

      if (moment().isBefore(displayBeg)) {
        return false;
      }

      if (moment().isAfter(displayEnd)) {
        return false;
      }

      return true;
    })
    .slice(0, maxPics);
};

const slidePictureData = {
  getPictures: () => _filterAndLimit(allPictures, 4)
};

export default slidePictureData;
