import constants from '../utils/constants';
import {getNumberOfDaysAgo, isPast, parseISO} from '../utils/dateTimeUtils';

const {PREACHERS, BIBLE_VERSIONS} = constants;

const sermonVideos = [
  {
    date: '2024-11-24',
    youtubeId: 'M8t2tMVvxWM',
    title: 'Fighting A Faltering Faith',
    preacher: 'Rev. Dr. Douglas E. Summers',
    scripture: 'Psalm 73:1-14; 2 Corinthians 5:7',
  },
  {
    date: '2024-11-17',
    youtubeId: 'mTL7rA99dpo',
    title: 'Put God First',
    preacher: 'Rev. Carmi Washington-Flood',
    scripture: 'Matthew 6:33',
  },
  {
    date: '2024-11-10',
    youtubeId: 'TSPtlYEeo0w',
    title: 'In God We Trust and Have Victory!',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Psalm 33:17-22',
  },
  {
    date: '2024-11-03',
    youtubeId: '2qri4J35V9M',
    title: 'How We Win The Civil, I Mean, The Spiritual War!',
    preacher: PREACHERS.M_HAMIEL,
    scripture: 'Matthew 26:20 - 29',
  },
  {
    date: '2024-10-27',
    youtubeId: '8FlVEnP6Qlw',
    title: 'Trusting in the Slow Work of God',
    preacher: 'Rev. Pamula Yerby Hammack',
    scripture: 'Isaiah 40:31',
  },
  {
    date: '2024-10-20',
    youtubeId: 'iux6ZZEs-14',
    title: 'Lost....Then Found!!!',
    preacher: PREACHERS.D_NELSON,
    scripture: '2 Chronicles 7:11-15',
    version: BIBLE_VERSIONS.KJV,
  },
  {
    date: '2024-10-13',
    youtubeId: 'LkfIFbLU0Nc',
    title: 'They Wont See You Coming!!!',
    preacher: PREACHERS.L_FORD,
    scripture: '2 Kings 7:3-7',
  },
  {
    date: '2024-10-06',
    youtubeId: 'i5yUCzmh_Ms',
    title: 'God Gives Us Salt & Light IN The Darkness',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Matthew 5:13-16',
    version: BIBLE_VERSIONS.MSG,
  },
  {
    date: '2024-09-22',
    youtubeId: 'uG3FQOosj2E',
    title: 'Joyful Expectations',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Psalm 34: 6-7',
    version: BIBLE_VERSIONS.NRSVUE,
  },
  {
    date: '2024-09-15',
    youtubeId: 'mkzQ9h6ntEc',
    title: 'Initiation Into Christianity!!!',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Matthew 16: 24-26',
  },
  {
    date: '2024-09-08',
    youtubeId: 'YJ6XPOmBEUY',
    title: 'Keep The Fire Burning!!!',
    preacher: PREACHERS.L_FORD,
    scripture: 'Leviticus 6:12-13',
  },
  {
    date: '2024-09-01',
    youtubeId: 'LJh8IQ8N_ac',
    title: 'Victory is Ours',
    preacher: PREACHERS.D_HICKMAN,
    scripture: '1 Corinthians 15:57-58',
    version: BIBLE_VERSIONS.NRSV,
  },
  {
    date: '2024-08-25',
    youtubeId: 'WrImBvH0xl8',
    title: 'I’m Expecting Great Things!!!!',
    preacher: 'Min. Sequoia Wright',
    scripture: 'Isiah 43:18-19',
  },
  {
    date: '2024-08-18',
    youtubeId: '6ZT_E-SO9rc',
    title: 'Don’t Let Go!!!',
    preacher: 'Rev. Donald L Wright, Jr',
    scripture: 'Psalm 27:1 - 3',
    version: BIBLE_VERSIONS.NKJV,
  },
  {
    date: '2024-08-11',
    youtubeId: 'IfJvdbLeWAk',
    title: 'It’s Okay to Cry!',
    preacher: 'Pastor Jammie Pendleton',
    scripture: 'John 11:33-36',
    version: BIBLE_VERSIONS.NRSV,
  },
  {
    date: '2024-08-04',
    youtubeId: 'YgNDEZT9oG4',
    title: 'The Same God is Unchanging in the Midst of Evil and Danger',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Psalm 102:25-27, Malachi 3:6, Hebrews 13:8',
    version: BIBLE_VERSIONS.ESV,
  },
  {
    date: '2024-07-28',
    youtubeId: 'pN0xA-uXYyg',
    title: 'Stand Strong in the Lord’s Strength',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'John 14:27',
    version: BIBLE_VERSIONS.NRSVUE,
  },
  {
    date: '2024-07-21',
    youtubeId: 'uOUYgclpLCs',
    title: 'Now Move, Like You Know God’s Got It!!!',
    preacher: PREACHERS.L_FORD,
    scripture: 'Psalm 18:28-30',
  },
  {
    date: '2024-07-14',
    youtubeId: 'RikDfDloBWE ',
    title: 'I’m “Tard”',
    preacher: PREACHERS.M_HAMIEL,
    scripture: 'John 4:6, 31, and 34',
  },
  {
    date: '2024-07-07',
    youtubeId: 'Go8g6HvF60Y',
    title: 'The Melody of Faith!!!',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Psalm 133:1, Ephesians 4:3, and Colossians 3:14',
    version: BIBLE_VERSIONS.NRSVUE,
  },
  {
    date: '2024-06-30',
    youtubeId: '3X1EejJVl4o',
    title: 'Best Friend',
    preacher: PREACHERS.M_HAMIEL,
    scripture: 'Joshua 1:9',
  },
  {
    date: '2024-06-23',
    youtubeId: 'xzK3mG64_uI',
    title: 'From Mount Zion to Juneteenth: A Journey of Liberation',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Isaiah 2:2-3',
  },
  {
    date: '2024-06-16',
    youtubeId: 'BDTH_mVvFqY',
    title: 'The Obedient Faithfulness of Sacrifice',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Genesis 22:1-12',
    version: BIBLE_VERSIONS.KJV,
  },
  {
    date: '2024-06-09',
    youtubeId: 'ZTtbe2bFBiw',
    title: 'I Will Give You a Generous Heart',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Luke 6:37-38',
  },
  {
    date: '2024-05-26',
    youtubeId: 'IUOVAfozBnY',
    title: 'Greatest Love',
    preacher: PREACHERS.D_HICKMAN,
  },
  {
    date: '2024-05-19',
    youtubeId: 'pNBXpp4Xs-E',
    title: 'Who’s Managing The Temple!!!',
    preacher: PREACHERS.M_HAMIEL,
  },
  {
    date: '2024-05-12',
    youtubeId: '1iUdYVIU27Y',
    title: 'Respect Your Elders As Spiritual Leaders!!!',
    preacher: PREACHERS.T_CURLEY,
  },
  {
    date: '2024-05-05',
    youtubeId: 't_BktTl5h20',
    title: 'Love Your Enemies',
    preacher: PREACHERS.D_HICKMAN,
  },
  {
    date: '2024-04-28',
    youtubeId: 'zEiduCUDZA8',
    title: 'The Breakthrough Power Of God',
    preacher: PREACHERS.D_HICKMAN,
  },
  {
    date: '2024-04-21',
    youtubeId: 'cZP9pIlqzSs',
    title: 'Stay Ready',
    preacher: PREACHERS.M_HAMIEL,
  },
  {
    date: '2024-04-14',
    youtubeId: 'M7saFa5niDQ',
    title: 'Our Representatives At The Atonement',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Matthew 27:15-26',
    version: BIBLE_VERSIONS.KJV,
  },
  {
    date: '2024-04-07',
    youtubeId: 'RGmubJZr2IE',
    title: 'Coming In On Broken Pieces',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Luke 22:19 - 20',
  },
  {
    date: '2024-03-31',
    youtubeId: 'stYTTkQiV48',
    title: 'Resurrection: The Key To Everything!!',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'John 11:24-26, Ephesians 2:4-6',
  },
  {
    date: '2024-03-28',
    youtubeId: 'u3sr-MNkk2M',
    title: 'Maundy Thursday',
    preacher: PREACHERS.MINISTERS,
  },
  {
    date: '2024-03-24',
    youtubeId: 'KSxCVspm-6g',
    title: 'The Setup For A Lifetime!',
    preacher: PREACHERS.L_FORD,
    scripture: 'Matthew 21:1-11',
    version: BIBLE_VERSIONS.NRSVUE,
  },
  {
    date: '2024-03-17',
    youtubeId: 'cZ45Hhj1Sz8',
    title: '"Living Above it!',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Mark 10:17-22',
    version: BIBLE_VERSIONS.NRSVUE,
  },
  {
    date: '2024-03-10',
    youtubeId: 'kKJQ0VnF3T8',
    title: 'The Light is Within You',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'John 3:16-21',
    version: BIBLE_VERSIONS.KJV,
  },
  {
    date: '2024-03-03',
    youtubeId: 'qjZnCKnuUxU',
    title: 'Want to Be Made Whole?!!!',
    preacher: PREACHERS.D_NELSON,
    scripture: '2 Chronicles 7:14',
    version: BIBLE_VERSIONS.NIV,
  },
]
  .reduce((videosToShow, videoData) => {
    const {
      date,
      expires = true,
      videoMissingMessage = 'No video for this date',
    } = videoData;

    // was told that videos up to 6 months ago would be available but they aren't
    // so I'm doing 5 months
    const withinFiveMonths = getNumberOfDaysAgo(date) < 150;
    if (isPast(parseISO(date)) && (withinFiveMonths || !expires)) {
      videosToShow.push({...videoData, videoMissingMessage});
    }

    return videosToShow;
  }, [])
  .sort((a, b) => a.date < b.date);

export default sermonVideos;
