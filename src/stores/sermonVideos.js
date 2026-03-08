import constants from '../utils/constants';
import {getNumberOfDaysAgo, isPast, parseISO} from '../utils/dateTimeUtils';

const {PREACHERS, BIBLE_VERSIONS} = constants;
const {
  D_HICKMAN,
  D_SUMMERS,
  D_WRIGHT,
  L_FORD,
  L_PIERCE,
  K_SLAYTON,
  M_HAMIEL,
  R_HAMMOCK,
  S_THOMAS,
  W_BURGESS,
} = PREACHERS;
const {MSG, ESV, NRSV, KJV, NIV} = BIBLE_VERSIONS;

const sermonVideos = [
  {
    date: '2026-03-08',
    youtubeId: 'algk38coGWY',
    preacher: W_BURGESS,
    title: 'The Best Is Yet To Come!!!',
  },
  {
    date: '2026-03-01',
    youtubeId: 'oDPoDC6RIwE',
    preacher: M_HAMIEL,
    title: null,
    scripture: null,
    version: null,
  },
  {
    date: '2026-02-22',
    youtubeId: '2QQ4wREc4Ng',
    preacher: R_HAMMOCK,
    title: 'Sunday Service!!!',
    scripture: null,
    version: null,
  },
  {
    date: '2026-02-15',
    youtubeId: 'jfXWDAfmW3E',
    preacher: M_HAMIEL,
    title: 'Sunday Service!!!',
    scripture: null,
    version: null,
  },
  {
    date: '2026-02-08',
    youtubeId: 'Lp1-MFeSvwI',
    preacher: R_HAMMOCK,
    title: 'Fix My Life!!!',
    scripture: 'Luke 17:11-19',
    version: NRSV,
  },
  // 2026-02-01 wasn't recorded. It was a zoom service due to snow
  // 2026-01-25 wasn't recorded. It was a zoom service due to snow
  {
    date: '2026-01-18',
    youtubeId: 'QKkghznuRi0',
    preacher: D_WRIGHT,
    title: 'Keep Dreaming!!!',
    scripture: 'Genesis 37:5 - 11',
    version: null,
  },
  {
    date: '2026-01-11',
    youtubeId: 'sSAaHEtzQZw',
    preacher: S_THOMAS,
    title: 'A Blindsided Blessing!!!',
    scripture: null,
    version: null,
  },
  {
    date: '2026-01-04',
    youtubeId: 'Hw9mVkL2t5M',
    preacher: D_HICKMAN,
    title: 'The Manifestations of God’s Promises!!!',
    scripture: 'Ezekiel 36:26-27; 2 Corinthians 1:20',
    version: null,
  },
  {
    date: '2025-12-28',
    youtubeId: 'gaDXVtv9P6I',
    preacher: W_BURGESS,
    title: 'Baggage!',
    scripture: 'Philippians 4:4-7',
  },
  {
    date: '2025-12-21',
    youtubeId: 'EjjOWU7n0-I',
    preacher: M_HAMIEL,
    title: undefined,
    scripture: 'Philippians 4:1-9; John 14:27',
  },
  // 2025-12-14 - Missing, no service due to weather
  // 2025-12-07 - Missing, service might not have been recorded
  {
    date: '2025-11-30',
    youtubeId: 'xpDnlzCdNjI',
    preacher: K_SLAYTON,
    title: undefined,
    scripture: undefined,
  },
  {
    date: '2025-11-23',
    youtubeId: 'DRABtKMorrg',
    preacher: D_SUMMERS,
    title: 'Gossiping about God’s Goodness',
    scripture: 'Psalm 145:1-21',
  },
  {
    date: '2025-11-16',
    youtubeId: '_dIz6FdpN0g',
    preacher: M_HAMIEL,
    title: 'Keep Hope Alive!!!',
    scripture: 'Amos 8:1-2; 9:11-15',
    version: MSG,
  },
  {
    date: '2025-11-09',
    youtubeId: 'LLzgrDGt-7U',
    preacher: S_THOMAS,
    title: 'Healing is coming to your house!',
    scripture: 'Amos 8:1-2; 9:11-15',
    version: MSG,
  },
  {
    date: '2025-11-02',
    youtubeId: 'Oa9IL59h_CA',
    preacher: D_HICKMAN,
    title: 'Ripe for the Gathering!!!',
    scripture: 'Amos 8:1-2; 9:11-15',
    version: MSG,
  },
  {
    date: '2025-10-26',
    youtubeId: 'NSbxQzJmgAA',
    preacher: 'Rev. Arnold Howard',
    scripture: '2 Kings 6:8-23',
    version: KJV,
  },
  {
    date: '2025-10-19',
    youtubeId: 'F-viqheqMCg',
    preacher: L_FORD,
    scripture: 'Isaiah 54:16-17',
    version: KJV,
  },
  {
    date: '2025-10-12',
    youtubeId: 'UUny_Ni_LJM',
    preacher: D_HICKMAN,
    title: 'Trust God!!!',
  },
  {
    date: '2025-10-05',
    youtubeId: 'Q4ZV99zIPZM',
    preacher: M_HAMIEL,
    title: 'Just Wait!',
  },
  {
    date: '2025-09-28',
    youtubeId: '5n0p3YBWoNk',
    preacher: W_BURGESS,
    title: 'Hit by God!',
    scripture: 'Acts 9:1-9; 17-19',
  },
  {
    date: '2025-09-21',
    youtubeId: 'n-fOVVXE8fM',
    preacher: R_HAMMOCK,
    title: 'How To Make It Through!!!',
    scripture: 'Jeremiah 29:4 - 14',
    version: ESV,
  },
  {
    date: '2025-09-14',
    youtubeId: 'V39yo7FV4I4',
    preacher: 'Rev. Donald Wright',
    title: 'Strength for the Journey',
  },
  {
    date: '2025-09-07',
    youtubeId: 'Uq2CTL50dRY',
    preacher: D_HICKMAN,
    title: 'Communion in Divisive Times',
    scripture: '1 Corinthians 11: 17-32',
  },
  {
    date: '2025-08-31',
    youtubeId: 'xWrZPbi9eXc',
    preacher: R_HAMMOCK,
    title: 'Put it in the Lord’s Hands',
    scripture: 'John 6:1-11',
  },
  {
    date: '2025-08-24',
    youtubeId: '3iVXV1pl8S8',
    preacher: L_PIERCE,
  },
  {
    date: '2025-08-17',
    youtubeId: '0gcJCa0JAYcqIYzv',
    preacher: M_HAMIEL,
    title: 'Let’s Get Rooted',
    scripture: 'Luke 22:18-19',
  },
  {
    date: '2025-08-10',
    youtubeId: '-C4IvtslYis',
    preacher: L_PIERCE,
  },
  {
    date: '2025-08-03',
    youtubeId: 'YK6WKwgTyg4',
    preacher: M_HAMIEL,
    scripture: 'Luke 22:18-19',
  },
  {
    date: '2025-07-27',
    youtubeId: '0vycUN4m_Qg',
    title: 'Give God Your Best!',
    preacher: R_HAMMOCK,
    scripture: 'Mark 14:3-9',
  },
  {
    date: '2025-07-20',
    youtubeId: 'bYE9dGJvFpQ',
    title: 'We are the Ones!',
    preacher: M_HAMIEL,
    scripture: 'Matthew 5:13 - 16',
  },
  {
    date: '2025-07-13',
    youtubeId: 'rxW4710tbVw',
    preacher: W_BURGESS,
    scripture: 'Jeremiah 29:10-14',
  },
  {
    date: '2025-07-06',
    youtubeId: '_a8wG1XFPKE',
    title: 'Servants of Righteousness!!!',
    preacher: D_HICKMAN,
    scripture: 'Romans 6:15-18',
    version: ESV,
  },
  {
    date: '2025-06-29',
    youtubeId: 'op7K4HlY1Vw',
    title: 'Walking into a New Season…Embracing Change and Renewal!!!',
    scripture: 'Joel 2:1 - 13',
    preacher: R_HAMMOCK,
    version: NIV,
  },
  {
    date: '2025-06-22',
    youtubeId: 'BNqaADb5WDE',
    title: 'Busting Out!',
    preacher: M_HAMIEL,
    scripture: 'Isaiah 43:18 - 19',
  },
  {
    date: '2025-06-15',
    youtubeId: 'kGIy01Odu6I',
    title: 'Happy Father’s Day',
  },
  {
    date: '2025-06-08',
    youtubeId: 'UNH_YpMftzA',
    title: 'Signed, Sealed, Delivered!',
    preacher: M_HAMIEL,
    scripture: 'Ephesians 1:13-14',
  },
  {
    date: '2025-06-01',
    youtubeId: 'rx8310nWngc',
    title: 'The Ascension of Our Lord & Its Meaning & The Importance',
    preacher: D_HICKMAN,
    scripture: 'Acts 1:1-11; Ephesians 1:17-23',
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
