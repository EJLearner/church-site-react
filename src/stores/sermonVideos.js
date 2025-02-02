import constants from '../utils/constants';
import {getNumberOfDaysAgo, isPast, parseISO} from '../utils/dateTimeUtils';

const {PREACHERS, BIBLE_VERSIONS} = constants;
const {D_HICKMAN, D_NELSON, L_FORD, T_CURLEY, MINISTERS, M_HAMIEL} = PREACHERS;
const {MSG, ESV, NRSV, NRSVUE, KJV, NIV, NKJV} = BIBLE_VERSIONS;

const sermonVideos = [
  {
    date: '2025-02-02',
    youtubeId: '8LFS_WDOLrw',
    title: 'Rejected by Man, But Perfected by God!',
    preacher: D_NELSON,
    scripture: 'Matthew 21:42-46',
  },
  {
    date: '2025-01-26',
    youtubeId: 'GeQ8h0-PP4M',
    title: 'Addicted to Righteousness!!!',
    preacher: D_HICKMAN,
    scripture: '1 Peter 5: 6-7',
  },
  {
    // No recording, service was over Zoom
    date: '2025-01-19',
  },
  {
    date: '2025-01-12',
    youtubeId: 'JMgtB3g6G-o',
    title: 'Cast All Your Cares...!!!',
    preacher: L_FORD,
    scripture: '1 Peter 5: 6-7',
  },
  {
    date: '2025-01-05',
    youtubeId: 'N2FxxUZBa6c',
    title: 'Untitled',
    preacher: D_NELSON,
  },
  {
    date: '2024-12-29',
    youtubeId: 't4Lsp7YG77M',
    title: 'Faith, Fight, Finish!!!',
    preacher: M_HAMIEL,
  },
  {
    date: '2024-12-22',
    youtubeId: '-w81JGGHrDU',
    title: 'Merry Christmas',
    // no sermon
    preacher: null,
  },
  {
    date: '2024-12-15',
    youtubeId: 'JVzSAswnvDg',
    title: 'No Vacancy: No room for the blessing!!!',
    preacher: D_NELSON,
    scripture: 'Luke 2:1 - 11',
    version: KJV,
  },
  {
    date: '2024-12-08',
    youtubeId: '2AwnxZe3SQA',
    title: 'The Glory At Daybreak!!!',
    preacher: L_FORD,
    scripture: 'Genesis 32:22 - 31',
  },
  {
    date: '2024-12-01',
    youtubeId: 'htWZu5yAxP0',
    title: 'Let’s Anchor Our Hearts In The Promised Hope!!!',
    preacher: D_HICKMAN,
    scripture: 'Matthew 24:36-44',
    version: MSG,
  },
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
    preacher: D_HICKMAN,
    scripture: 'Psalm 33:17-22',
  },
  {
    date: '2024-11-03',
    youtubeId: '2qri4J35V9M',
    title: 'How We Win The Civil, I Mean, The Spiritual War!',
    preacher: M_HAMIEL,
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
    preacher: D_NELSON,
    scripture: '2 Chronicles 7:11-15',
    version: KJV,
  },
  {
    date: '2024-10-13',
    youtubeId: 'LkfIFbLU0Nc',
    title: 'They Wont See You Coming!!!',
    preacher: L_FORD,
    scripture: '2 Kings 7:3-7',
  },
  {
    date: '2024-10-06',
    youtubeId: 'i5yUCzmh_Ms',
    title: 'God Gives Us Salt & Light IN The Darkness',
    preacher: D_HICKMAN,
    scripture: 'Matthew 5:13-16',
    version: MSG,
  },
  {
    date: '2024-09-22',
    youtubeId: 'uG3FQOosj2E',
    title: 'Joyful Expectations',
    preacher: T_CURLEY,
    scripture: 'Psalm 34: 6-7',
    version: NRSVUE,
  },
  {
    date: '2024-09-15',
    youtubeId: 'mkzQ9h6ntEc',
    title: 'Initiation Into Christianity!!!',
    preacher: D_NELSON,
    scripture: 'Matthew 16: 24-26',
  },
  {
    date: '2024-09-08',
    youtubeId: 'YJ6XPOmBEUY',
    title: 'Keep The Fire Burning!!!',
    preacher: L_FORD,
    scripture: 'Leviticus 6:12-13',
  },
  {
    date: '2024-09-01',
    youtubeId: 'LJh8IQ8N_ac',
    title: 'Victory is Ours',
    preacher: D_HICKMAN,
    scripture: '1 Corinthians 15:57-58',
    version: NRSV,
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
    version: NKJV,
  },
  {
    date: '2024-08-11',
    youtubeId: 'IfJvdbLeWAk',
    title: 'It’s Okay to Cry!',
    preacher: 'Pastor Jammie Pendleton',
    scripture: 'John 11:33-36',
    version: NRSV,
  },
  {
    date: '2024-08-04',
    youtubeId: 'YgNDEZT9oG4',
    title: 'The Same God is Unchanging in the Midst of Evil and Danger',
    preacher: D_HICKMAN,
    scripture: 'Psalm 102:25-27, Malachi 3:6, Hebrews 13:8',
    version: ESV,
  },
  {
    date: '2024-07-28',
    youtubeId: 'pN0xA-uXYyg',
    title: 'Stand Strong in the Lord’s Strength',
    preacher: T_CURLEY,
    scripture: 'John 14:27',
    version: NRSVUE,
  },
  {
    date: '2024-07-21',
    youtubeId: 'uOUYgclpLCs',
    title: 'Now Move, Like You Know God’s Got It!!!',
    preacher: L_FORD,
    scripture: 'Psalm 18:28-30',
  },
  {
    date: '2024-07-14',
    youtubeId: 'RikDfDloBWE ',
    title: 'I’m “Tard”',
    preacher: M_HAMIEL,
    scripture: 'John 4:6, 31, and 34',
  },
  {
    date: '2024-07-07',
    youtubeId: 'Go8g6HvF60Y',
    title: 'The Melody of Faith!!!',
    preacher: D_HICKMAN,
    scripture: 'Psalm 133:1, Ephesians 4:3, and Colossians 3:14',
    version: NRSVUE,
  },
  {
    date: '2024-06-30',
    youtubeId: '3X1EejJVl4o',
    title: 'Best Friend',
    preacher: M_HAMIEL,
    scripture: 'Joshua 1:9',
  },
  {
    date: '2024-06-23',
    youtubeId: 'xzK3mG64_uI',
    title: 'From Mount Zion to Juneteenth: A Journey of Liberation',
    preacher: D_HICKMAN,
    scripture: 'Isaiah 2:2-3',
  },
  {
    date: '2024-06-16',
    youtubeId: 'BDTH_mVvFqY',
    title: 'The Obedient Faithfulness of Sacrifice',
    preacher: D_NELSON,
    scripture: 'Genesis 22:1-12',
    version: KJV,
  },
  {
    date: '2024-06-09',
    youtubeId: 'ZTtbe2bFBiw',
    title: 'I Will Give You a Generous Heart',
    preacher: T_CURLEY,
    scripture: 'Luke 6:37-38',
  },
  {
    date: '2024-05-26',
    youtubeId: 'IUOVAfozBnY',
    title: 'Greatest Love',
    preacher: D_HICKMAN,
  },
  {
    date: '2024-05-19',
    youtubeId: 'pNBXpp4Xs-E',
    title: 'Who’s Managing The Temple!!!',
    preacher: M_HAMIEL,
  },
  {
    date: '2024-05-12',
    youtubeId: '1iUdYVIU27Y',
    title: 'Respect Your Elders As Spiritual Leaders!!!',
    preacher: T_CURLEY,
  },
  {
    date: '2024-05-05',
    youtubeId: 't_BktTl5h20',
    title: 'Love Your Enemies',
    preacher: D_HICKMAN,
  },
  {
    date: '2024-04-28',
    youtubeId: 'zEiduCUDZA8',
    title: 'The Breakthrough Power Of God',
    preacher: D_HICKMAN,
  },
  {
    date: '2024-04-21',
    youtubeId: 'cZP9pIlqzSs',
    title: 'Stay Ready',
    preacher: M_HAMIEL,
  },
  {
    date: '2024-04-14',
    youtubeId: 'M7saFa5niDQ',
    title: 'Our Representatives At The Atonement',
    preacher: D_NELSON,
    scripture: 'Matthew 27:15-26',
    version: KJV,
  },
  {
    date: '2024-04-07',
    youtubeId: 'RGmubJZr2IE',
    title: 'Coming In On Broken Pieces',
    preacher: T_CURLEY,
    scripture: 'Luke 22:19 - 20',
  },
  {
    date: '2024-03-31',
    youtubeId: 'stYTTkQiV48',
    title: 'Resurrection: The Key To Everything!!',
    preacher: D_HICKMAN,
    scripture: 'John 11:24-26, Ephesians 2:4-6',
  },
  {
    date: '2024-03-28',
    youtubeId: 'u3sr-MNkk2M',
    title: 'Maundy Thursday',
    preacher: MINISTERS,
  },
  {
    date: '2024-03-24',
    youtubeId: 'KSxCVspm-6g',
    title: 'The Setup For A Lifetime!',
    preacher: L_FORD,
    scripture: 'Matthew 21:1-11',
    version: NRSVUE,
  },
  {
    date: '2024-03-17',
    youtubeId: 'cZ45Hhj1Sz8',
    title: '"Living Above it!',
    preacher: T_CURLEY,
    scripture: 'Mark 10:17-22',
    version: NRSVUE,
  },
  {
    date: '2024-03-10',
    youtubeId: 'kKJQ0VnF3T8',
    title: 'The Light is Within You',
    preacher: T_CURLEY,
    scripture: 'John 3:16-21',
    version: KJV,
  },
  {
    date: '2024-03-03',
    youtubeId: 'qjZnCKnuUxU',
    title: 'Want to Be Made Whole?!!!',
    preacher: D_NELSON,
    scripture: '2 Chronicles 7:14',
    version: NIV,
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
