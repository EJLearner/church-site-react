import constants from '../utils/constants';
import {isBefore, startOfTomorrow, parseISO} from '../utils/dateTimeUtils';

const {PREACHERS} = constants;

const allVideoData = [
  {
    date: '2020-06-19',
    title: 'Sermon in Solidarity Coming Soon',
    videoLink: 'https://www.youtube.com/embed/uBRcxBm2600'
  },
  {
    date: '2020-06-14',
    description:
      'II Kings 4:8-37  By all evidence our children face many challenges. As parents and caregivers, we must ' +
      'remember that their first impressions about the world, their values, and life itself comes from us. ' +
      'Therefore, “ Start children off on the way they should go, and even when they are old they will not ' +
      'leave it.” (Proverbs 22:6)',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'II Kings 4:8-37',
    title: 'Is It Well With the Children?',
    videoLink: 'https://www.youtube.com/embed/NxJywh2f_DM'
  },
  {
    date: '2020-06-07',
    description:
      'Psalm 100 - This Psalm expresses praise to God. We are living in a culture which is self-centered and ' +
      'self-directed. Praising God is a means of shifting our lives from self to centering ourselves on God. In so ' +
      'doing we become concerned about justice, freedom and equality for all.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 100',
    title: 'The Protest of Praise',
    videoLink: 'https://www.youtube.com/embed/9pPt5yafh0I'
  },
  {
    date: '2020-05-30',
    description:
      'Acts 2: 1-13 - Jesus informed the disciples that without Him they could do nothing. Therefore, ' +
      'He promised them that God would send them another advocate. That advocate is the “Holy Spirit.”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Acts 2: 1-13',
    title: 'Pentecost',
    videoLink: 'https://www.youtube.com/embed/hHIaxONs6v4'
  },
  {
    date: '2020-05-24',
    description:
      'John 14: 15-21  When the disciples were told that Jesus was leaving them, they were heartbroken ' +
      'and shattered. However, Jesus promised them that they would not be alone. They would comforted and ' +
      'empowered by “The Holy Spirit.”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 14: 15-21',
    title: 'The Promise of The Holy Spirit',
    videoLink: 'https://www.youtube.com/embed/toTpl05RCXY'
  },
  {
    date: '2020-05-17',
    description:
      'Philippians 4:15-20 - We are living in times of scarcity due to Covid19. However we serve a God who is able ' +
      'to supply all our needs according to His riches in glory.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Philippians 4:15-20',
    title: 'Supplying Our Every Need',
    videoLink: 'https://www.youtube.com/embed/3Q1VfZfuf-w'
  },
  {
    date: '2020-05-10',
    description:
      'II Kings: 4: 1-7 - “MOTHER’S DAY SERMON” - A mother is defined as a female who has borne offspring and ' +
      'exercises protective care. That protective care is essential in determining how her children will ' +
      'live out their lives.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'II Kings: 4: 1-7',
    title: 'The Importance of A Mother’s Oil',
    videoLink: 'https://www.youtube.com/embed/GDDqCBlu7_k'
  },
  {
    date: '2020-05-03',
    description:
      'Mark 11: 12-14; 20-25 - We were taught that there is power in prayer. However, we need to know how to approach' +
      ' prayer. This message teaches how to engage the power of prayer.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 11: 12-14; 20-25',
    title: 'Engaging The Power of Prayer',
    videoLink: 'https://www.youtube.com/embed/lHLcCaL33A8'
  },
  {
    date: '2020-04-26',
    description:
      '1st John 3: 1-2 There are times when life becomes complicated. We wrestle with a variety of influences ' +
      'which causes us to forget who we are. When this happens, God calls us to “be still and remember who we are!”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: '1st John 3: 1-2',
    title: 'Remembering Who We Are',
    videoLink: 'https://www.youtube.com/embed/FflhfJyEce4'
  },
  {
    date: '2020-04-19',
    description:
      'We are living in a time of great fear. This pandemic has disrupted our lifestyle and way of ' +
      'living. However there is One who speaks to us and can move us from fear to faith. Mark 6:45-51',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 6:45-51',
    title: 'Spoken Beyond Fear',
    videoLink: 'https://www.youtube.com/embed/XQLNReiATwo'
  },
  {
    date: '2020-04-12',
    description:
      'Biblical scholars are in agreement that Mark’s Gospel ends with the women in fear because of what an angel ' +
      'told them when they reached the empty tomb. According to Mark out of fear, they told no one. This message ' +
      'tells the rest of the story!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 16:1-8',
    title: 'Finishing The Unfinished Gospel',
    videoLink: 'https://www.youtube.com/embed/-qk8yNI1XIs'
  },
  {
    date: '2020-04-09',
    description:
      'A Message for Maundy Thursday: All of us will know failure in our faith. But we have the assurance that ' +
      'when we fail, Christ has prayed for us.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 27:31-34',
    title: 'But I Have Prayed For You',
    videoLink: 'https://www.youtube.com/embed/oYi8THK6f44'
  },
  {
    date: '2020-04-05',
    description:
      'This sermon is about Jesus’ riding into Jerusalem on Palm Sunday.  He rides in as if He were a king. When in ' +
      'truth He is THE KING OF GLORY!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 19:28-40',
    title: 'The Triumphant Entry of Jesus Into Jerusalem',
    videoLink: 'https://www.youtube.com/embed/aO-U_Zh9of4'
  },
  {
    date: '2020-03-29',
    description:
      'A message from Psalms 27 that tells us what to do when we are fearful. Facing our fears requires waiting ' +
      'on the Lord.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 27:1; 13-14',
    title: 'Alleviating Our Anxious Fears',
    videoLink: 'https://www.youtube.com/embed/-bsGGeVUInM'
  },
  {
    date: '2020-03-22',
    description:
      'Given that we are facing a pandemic in these times, there is hope. And not just hope, but an indestructible ' +
      'hope. It is indestructible because it is grounded and founded in our God.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 16:29-33',
    title: 'An Indestructible Hope',
    videoLink: 'https://www.youtube.com/embed/3sgm_bRfXuw'
  }
];

const currentVideoData = allVideoData
  .filter(({date}) => isBefore(parseISO(date), startOfTomorrow()))
  .sort((a, b) => a.date < b.date);

export {currentVideoData, allVideoData};
