import constants from '../utils/constants';
import {isPast, parseISO} from '../utils/dateTimeUtils';

const {PREACHERS} = constants;

const allVideoData = [
  {
    date: '2021-01-31T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'I John 3:1-3',
    title: 'Getting The Who Right!',
    videoLink: 'https://www.youtube.com/embed/QOQIOSqlNWE'
  },
  {
    date: '2021-01-24T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Ephesians 3:14​-19',
    title: 'The Perfect Prayer For Spiritual Perfection',
    videoLink: 'https://www.youtube.com/embed/u_a6RdGl0yA'
  },
  {
    date: '2021-01-17T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Amos 5:18​-24',
    title: 'Remembering Our Drum Major For Justice',
    videoLink: 'https://www.youtube.com/embed/yLsCm8gaTME'
  },
  {
    date: '2021-01-10T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 9:14-27',
    title: 'Caught Between Belief And Unbelief',
    videoLink: 'https://www.youtube.com/embed/dHjOF_DXj9I'
  },
  {
    date: '2021-01-03T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Philippians 4:4-7',
    title: 'A Portrait For Handling The New Year!',
    videoLink: 'https://www.youtube.com/embed/2BdjN0_Vl1A'
  },
  {
    date: '2020-12-27T09:00:00',
    preacher: PREACHERS.L_FORD,
    scripture: 'Isaiah 43:16-21',
    title: 'Fresh Water for The New Thing!',
    videoLink: 'https://www.youtube.com/embed/q9oBsM30OLs'
  },
  {
    date: '2020-12-25T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'A Christmas Meditation',
    videoLink: 'https://www.youtube.com/embed/5UuBSeEK0Fk'
  },
  {
    date: '2020-12-20T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 2:8-15',
    title: 'Glory to God in the Highest',
    videoLink: 'https://www.youtube.com/embed/5LMjYM3jTGc'
  },
  {
    date: '2020-12-13T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 1:26-38',
    title: 'The Favor Of The Lord',
    videoLink: 'https://www.youtube.com/embed/jVq3TsR8Vf4'
  },
  {
    date: '2020-12-06T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 10:10',
    title: 'Why We Need Christmas',
    videoLink: 'https://www.youtube.com/embed/TKYTWWRzPY4'
  },
  {
    date: '2020-11-29T09:00:00',
    description:
      'Today is the beginning of the Advent season for all Christians. It is the season when we are called to ' +
      'prepare the way for the coming of the glory of God. However, preparing for the coming of the glory of God ' +
      'requires us to let go of those things in our lives that impedes us from experiencing God’s glory. It ' +
      'is a matter of letting go and letting God.',
    preacher: PREACHERS.G_YEARGIN,
    title: 'Preparing The Way For The Glory of the Lord',
    videoLink: 'https://www.youtube.com/embed/l6L6QomNGzY'
  },
  {
    date: '2020-11-26T10:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'Thanksgiving Reflection',
    videoLink: 'https://www.youtube.com/embed/mfhFol-eJyM'
  },
  {
    date: '2020-11-22',
    description:
      'Romans 8:28 - Have you ever wondered what God does with our mistakes and mess ups with our faults and flaws; ' +
      'even with our troubles and trials? I used to think that God takes them away to give us a chance to be the ' +
      'best we can be. However, life has taught me that God does not take away our mistakes and flaws, our ' +
      'troubles and trials. Actually, God uses them to help us become better persons. It is called the Divine ' +
      'Grace of Recycling!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Romans 8:28',
    title: 'The Divine Grace of Recycling',
    videoLink: 'https://www.youtube.com/embed/OxFZzjqWhbw'
  },
  {
    date: '2020-11-15',
    description:
      'Over the past four years,  I have always believed that God has had His hand in the direction of ' +
      'this nation. In spite of that belief, many of us lived with fear, anxiety and despair. However, on ' +
      'November 7, 2020 God revealed His hand for this nation when we heard the news that Joe Biden had become ' +
      'the president elect. Therefore, I extend an invitation to you to join with me in “Praising the Lord!”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 100',
    title: 'An Invitation To Praise',
    videoLink: 'https://www.youtube.com/embed/Du1f-JmR8wE'
  },
  {
    date: '2020-11-08',
    description:
      'Isaiah 40: 27-31 - For the past four years, we have experienced being anxious and unsettled. We have been ' +
      'ill at ease and weary. However we have come to that moment when that reality can be changed. That change ' +
      'will happen by waiting on the Lord!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Isaiah 40: 27-31',
    title: 'Waiting On The Lord!!',
    videoLink: 'https://www.youtube.com/embed/SEjRichM4uo'
  },
  {
    date: '2020-11-01',
    description:
      'Anxiety, seems to have become a part of our daily lives. It has become even more so as we face ' +
      'this upcoming presidential election. According to the wisdom teachings, in the book of Proverbs, there is a ' +
      'remedy that brings an end to our anxious fears. The remedy is “A matter of trusting in the Lord!”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Proverbs  3:5-6',
    title: 'It’s A Matter of Trust',
    videoLink: 'https://www.youtube.com/embed/dh8nvLZhrug'
  },
  {
    date: '2020-10-25',
    description:
      'Matthew 5:6. We live in a world that suggests that our living can be fulfilling if we buy into what ' +
      'the world has to offer. However, with the passing of time we discover that this is not the case. For ' +
      'there is within all of us a hunger and thirst that only God can provide.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 5:6',
    title: 'From Dire Need To Delightful Fulfillment!',
    videoLink: 'https://www.youtube.com/embed/sNBj4u-sVPk'
  },
  {
    date: '2020-10-18',
    description:
      'Luke:12:22-23; 29-32 - We are living in a time of great anxiety, worry and fear. There are those  ' +
      'who have discovered that anxiety, worry and fear will not resolve our concerns. The message of Jesus, to  ' +
      'all of us is “Seek the Kingdom of God above all else and He will give you everything you need.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 12:22-23; 29-32',
    title: 'God’s Greatest Delight',
    videoLink: 'https://www.youtube.com/embed/Vq00x6UyVJo'
  },
  {
    date: '2020-10-11',
    description:
      'Several weeks ago, I preached a sermon entitled, “Why Prayer Is Essential.” Prayer is essential because ' +
      'troubles that we cannot handle on our own are woven into the fabric of our life and living. ' +
      'Therefore, we need to ask Jesus, “Lord, teach us to pray.” Then we will discover that the power of prayer' +
      ' is grounded and founded in the make-up  and nature of our relationship with God!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 11:1-4',
    title: 'Lord Teach Us To Pray!',
    videoLink: 'https://www.youtube.com/embed/LVmzLU2d-OE'
  },
  {
    date: '2020-10-04',
    description:
      'John 16:29-33 - There is no denying that we are living in rather troubling times. Jesus acknowledged ' +
      'that reality when he said, “Here on earth you will have many trials and sorrows.” In essence, He is ' +
      'saying “It is what it is!” However, the Master does not end with that reality. He then makes an ' +
      'incredible affirmation by declaring, “But take heart, because I have overcome the world!”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 16:29-33',
    title: 'An Incredible Affirmation',
    videoLink: 'https://www.youtube.com/embed/YCxLUylQCZo'
  },
  {
    date: '2020-10-03',
    preacher: PREACHERS.G_YEARGIN,
    title: 'A Prayer For Our Nation',
    videoLink: 'https://www.youtube.com/embed/z7kWNgr4z5c'
  },
  {
    date: '2020-09-27',
    description:
      'Genesis 28:10-22. There are occasions in our lives when we would rather avoid having an encounter with God. ' +
      'We have not lived as best we should; we have done things we thought we would never do; we are haunted by the ' +
      'hurt that we have caused others. However, these situations may well be the best time to meet God in ' +
      'unexpected places!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Genesis 28:10-22',
    title: 'Meeting God In Unexpected Places!!',
    videoLink: 'https://www.youtube.com/embed/tvavUdqnyxw'
  },
  {
    date: '2020-09-20',
    description:
      'Matthew 6:7-8; Luke 11:1 During ordinary times prayer is essential. We are now living in extraordinary ' +
      'times which present some realities that we cannot handle alone. In times such as these, we have a God to ' +
      'whom we can turn to for He knows all of our needs. That makes prayer even more essential.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 6:7-8; Luke 11:1',
    title: 'Why Prayer Is Essential',
    videoLink: 'https://www.youtube.com/embed/nr53AhF0-qg'
  },
  {
    date: '2020-09-13',
    description:
      'John 12:20-28 In this life we experience defining moments: moments that reveal who we are and why we ' +
      'are here. Not even Jesus could avoid such a moment. As a result, because He could not, we are given the gift ' +
      'of eternal life.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 12:20-28',
    title: 'The Master’s Defining Moment',
    videoLink: 'https://www.youtube.com/embed/F5MDLBccokw'
  },
  {
    date: '2020-09-06',
    description:
      'Ephesians 6:10-13 In 59 days we will elect the President of the United States of America. This is ' +
      'the most crucial election in the history of this nation.It is crucial because it will decide the moral ' +
      'character of our nation. Therefore It is imperative that we seek God’s guidance and direction in our decision ' +
      'that we make.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Ephesians 6:10-13',
    title: 'Don’t Get It Twisted',
    videoLink: 'https://www.youtube.com/embed/-_CiQ9Vz6UU'
  },
  {
    date: '2020-08-30',
    description: 'Job 1:6-8',
    preacher: PREACHERS.M_HAMIEL,
    scripture: 'Job 1:6-8',
    title: 'Will You Make Your Daddy Proud?',
    videoLink: 'https://www.youtube.com/embed/VIqIHw4w20o'
  },
  {
    date: '2020-08-23',
    description: 'Amos 5: 1-7',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Amos 5: 1-7',
    title: 'Injustice and Bitterness Rots The Soul',
    videoLink: 'https://www.youtube.com/embed/qCaD6d7zmtk'
  },
  {
    date: '2020-08-16',
    description: 'Exodus 14: 13-14',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Exodus 14: 13-14',
    title: 'God Will Fight Our Battles',
    videoLink: 'https://www.youtube.com/embed/JO_mKPqa4sg'
  },
  {
    date: '2020-08-09',
    description: 'Genesis 6:5-8 and Rev. 13: 5-8',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Genesis 6:5-8 and Rev. 13: 5-8',
    title: 'Everybody’s Going Through Something',
    videoLink: 'https://www.youtube.com/embed/5I1Pe8hyV8Q'
  },
  {
    date: '2020-08-02',
    description:
      'Mark 9:2-10  We are living in a time of chaos and confusion. Therefore, it is necessary that we lift ' +
      'up our heads and open our eyes to experience the glory that God’s and God’s alone. Today’s message ' +
      'encourages us to do so!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Genesis 28:10-17',
    title: 'A Glimpse of Glory',
    videoLink: 'https://www.youtube.com/embed/G-IWmeMJf3s'
  },
  {
    date: '2020-07-26',
    description:
      'Genesis 28:10-17.  God’s ways are not our ways. We are not always aware that God is with us, however, ' +
      'when we least expect it, know that God is with us!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Genesis 28:10-17',
    title: 'When You Least Expect It, Expect It',
    videoLink: 'https://www.youtube.com/embed/fDaeW4mmVIE'
  },
  {
    date: '2020-07-19',
    description:
      'John 11:30-35 - All of us have experienced being moved to tears. These are not tears of joy, rather they ' +
      'are tears of pain and suffering. The good news is, we never cry alone because God through Jesus weeps with us!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 11:30-35',
    title: 'A Peek Into The Heart Of God',
    videoLink: 'https://www.youtube.com/embed/pdZxkWcG1Ho'
  },
  {
    date: '2020-07-12',
    description:
      'John16:25-33 -  We are living in chaotic times and it may feel as if all will be lost. However,  the Good ' +
      'News is that Jesus has overcome the world which gives us reason to rejoice!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 16:25-33',
    title: 'Overcoming The World',
    videoLink: 'https://www.youtube.com/embed/LpT1uHrFf7U'
  },
  {
    date: '2020-06-28',
    description:
      'Matthew 25:14-30  This is a service in recognition of all graduates. You were all born with ' +
      'specific gifts and talents. Today’s message encourages you to use your gifts and talents to make a ' +
      'difference in this world. When you fail to use your gifts and talents, you run the risk of losing them, and ' +
      'as a result the world also suffers a great loss.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 25:14-30',
    title: 'Use It Or Lose It',
    videoLink: 'https://www.youtube.com/embed/fwFj22DGuw4'
  },
  {
    date: '2020-06-21',
    description:
      'Psalm 23 - The prevailing opinion of psychologists is that fathers play an essential role in ' +
      'the lives of their children. Through the examination of the 23rd Psalm, this message speaks of the ' +
      'importance of a father’s role.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 23',
    title: 'Father’s Day - “A Reflection On The 23rd Psalm”',
    videoLink: 'https://www.youtube.com/embed/LPeZCzH7ca0'
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
  .filter(({date}) => {
    return isPast(parseISO(date));
  })
  .sort((a, b) => a.date < b.date);

export {currentVideoData, allVideoData};
