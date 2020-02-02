import React from 'react';
import GeneralPageTemplate from './commonComponents/GeneralPageTemplate';

const aidsMinistryContent = `
The mission statement of the HIV/AIDS Ministry is to be a spiritually-based resource and support for
the community and to heighten individual awareness of HIV/AIDS and STDs. The ministry is made up of
certified HIV/AIDS prevention counselors, lay counselors and certified Ora-Quick technicians. This
ministry also works with the Outreach Ministry to give free HIV testing monthly. Members of this
ministry network with community churches and organizations to educate others about HIV/AIDS.
  `;

const audioMinistryContent = `
Members of the Audio/Visual ministry record, advertise, sell and distribute audio and video of
worship services and special events.
  `;

const ceMinistryContent = (
  <div>
    <p>
      The Christian Education Ministry is responsible for organizing and
      implementing the teaching ministry of the church. The church’s educational
      task is to nurture and enrich individuals using Christian principles found
      in the Holy Scripture. The purpose of the ministry is to nurture and
      empower an active and focused Christian community in which the church
      family can unite in one body to provide quality education based on God’s
      word.
    </p>
    <p>
      Christian Education members uphold the mission and vision of the Christian
      Education Ministry through planning and implementing programs of study and
      education for all phases of Christian Education at City Temple.
    </p>
  </div>
);

const culturalMinistryContent = `
The Cultural and Fine Arts Ministry provides spiritual and cultural experiences that enlighten and
enrich our lives as we support our church in a broad appreciation of the arts, music, and dance.
`;

const danceMinistryContent = `
Members of this ministry have been consecrated to use their “bodies as living sacrifices, holy,
acceptable unto God which is their reasonable service” (Romans 12:1) to praise, worship, and glorify God through movement and dance. Their role in the worship experience at City Temple is to express God’s Word through dance and scriptural interpretation in movement in order to praise and worship the Lord, and in doing so, perhaps, inspire, uplift, heal, and deliver, God’s people through their anointing!
`;

const diaconateMinistryContent = `
Members are ordained church officers who may assist the Pastor with any responsibilities that
are not related to preaching. Members assist and support the Pastor in the furtherance of his
vision for the achievement of church mission. Diaconate members are spiritual leaders totally
committed to God, the church, and mankind. They are servants of the church and help
administer the ordinances of baptism and communion. They minister in times of crisis to the church.
`;

const hospitalityMinistryContent = `
Members of this ministry greet and recognize visitors during Sunday morning services.
`;

const justWeFewMinistryContent = `
The goal of the Just We Few Ministry is to serve the Lord and to stand by the Pastor with willing hearts and helping hands.
`;

const mensMinistryContent = (
  <div>
    <p>
      City Temple of Baltimore Baptist Church (CTBC) Men’s Ministry is a group
      of Christian men coming together as one to worship. Our Men’s Ministry is
      in active pursuit of men seeking a connection with God and His Word.
      Together we strive for the purpose of winning, growing and training in
      Christ. We remain committed to community outreach as that is our focus.
    </p>
    <p>
      We are determined to raise up leaders who will grow in vision and help
      lead a potential army of men into a deep relationship with the Lord. A
      variety of CTBC Men’s Ministry events are available that can help foster
      faith in God and promote fellowship at the same time.
    </p>
  </div>
);

const missionaryMinistryContent = `
Missionaries are responsible for missions both domestic and abroad in the church and community in order to meet the needs of others and to bring people to Christ. Anyone with the desire to serve is welcomed to join the Missionary Ministry.

The missionaries meet quarterly in the months of February, May, August, and November on the first Saturday of the month at 10:30 a.m.

To receive more information, please contact Maelena Holman at (410) 523-3774 or Lilly Traynham at (410) 265-5443.
`;

const musicMinistryContent = `
The purpose of Music Ministry is to win souls for Jesus Christ and to glorify God through music, fine arts, and dance. Through God’s abundant blessings, the Music Ministry will continue to grow and spread spiritual awareness through the singing of His Word.
`;

const nursesMinistryContent = `
Licensed nurses trained in first aid assist parishioners in the time of medical emergencies.
`;

const outreachMinistryContent = (
  <div>
    <p>
      The Outreach Ministry brings life to the teachings of God by helping to
      meet the basic needs of people in the community. Services provided are:
    </p>
    <ul>
      <li>Food pantry</li>
      <li>Clothes pantry</li>
      <li>
        Soup Kitchen - Monday, Wednesday, and Thursday, 11:30 a.m. - 12:30 a.m.
      </li>
      <li>
        Financial assistance for evictions, gas &amp; electric, prescriptions
        and funerals
      </li>
      <li>Substance abuse assistance &amp; referral</li>
      <li>Thanksgiving and Christmas meals as well as Christmas baskets</li>
    </ul>
  </div>
);

const securityMinistryContent = (
  <p>
    The Security Ministry has been serving since September 2008. We consider our
    service to be an “outpost” of the community of City Temple. When our City
    Temple family members and visitors see us, we hope to give them a sense of
    comfort as they enter and exit our church home.
    <p>
      We count it as a blessing to be able to volunteer security services at our
      church. Those services include:
    </p>
    <ul>
      <li>
        Watch and report any suspicious activities around the church grounds
      </li>
      <li>Assist the trustees during the offering</li>
      <li>
        Parking control and maintain a safe environment around the church for
        its members and visitors
      </li>
    </ul>
  </p>
);

const trusteesMinistryContent = `
Trustees are officers responsible for the church’s financial and business matters. They are responsible for the maintenance of the church and all of its properties. They are responsible for all utilities.
`;

const ushersMinistryContent = `
We have several groups of ushers that span all age groups. The purpose of this ministry is to welcome all into God’s house graciously and warmly.
`;

const womensMinistryContent = (
  <div>
    The Women’s Ministry goal is to become more Christ-like, to share
    experiences that are particular to women, and to encourage and inspire one
    another. We want to practice a spirit-led, loving and intentional effort,
    which enables us to experience together the fellowship, love, power and joy,
    which is generated when women of all ages come together.
    <p>
      Women of all ages are welcome! Our meeting day is the third Saturday of
      every month from January to June. We break during the summer months of
      July through August. We then return to fellowship from September and
      continuing. For more information regarding our ministry, please contact
      Doris Hunter or Phyllis Day.
    </p>
  </div>
);

const yougAtHeartMinistryContent = (
  <p>
    As members of the congregation grow older, their needs change. Young At
    Heart provides an effective and fun way for the members of the church age 55
    years or older to come together for fellowship. The goal of this ministry is
    to administer to the spiritual, physical and personal needs of adults and
    provide a means of recreation and companionship.
    <p>
      If you would like to join this ministry, just come out the first and third
      Monday of each week at the church in W.W. Payne Center, or you may contact
      Shirley Lindsay at (410) 945-7474, Evelyn Wooley at (410) 922-7169 or
      Hallie Tucker at (410) 523-9664.
    </p>
  </p>
);

const bottomContentData = [
  {
    title: 'AIDS',
    id: 'aidsMinistry',
    content: aidsMinistryContent
  },
  {
    title: 'Audio/Visual',
    id: 'audioMinistry',
    content: audioMinistryContent
  },
  {
    title: 'Christian Education',
    id: 'ceMinistry',
    content: ceMinistryContent
  },
  {
    title: 'Cultural and Fine Arts',
    id: 'culturalMinistry',
    content: culturalMinistryContent
  },
  {
    title: 'Dance/Movement',
    id: 'danceMinistry',
    content: danceMinistryContent
  },
  {
    title: 'Diaconate',
    id: 'diaconateMinistry',
    content: diaconateMinistryContent
  },
  {
    title: 'Hospitality',
    id: 'hospitalityMinistry',
    content: hospitalityMinistryContent
  },
  {
    title: 'Just We Few',
    id: 'justWeFewMinistry',
    content: justWeFewMinistryContent
  },
  {
    title: 'Men’s',
    id: 'mensMinistry',
    content: mensMinistryContent
  },
  {
    title: 'Missionary',
    id: 'missionaryMinistry',
    content: missionaryMinistryContent
  },
  {
    title: 'Music',
    id: 'musicMinistry',
    content: musicMinistryContent
  },
  {
    title: 'Nurses',
    id: 'nursesMinistry',
    content: nursesMinistryContent
  },
  {
    title: 'Outreach',
    id: 'outreachMinistry',
    content: outreachMinistryContent
  },
  {
    title: 'Security',
    id: 'securityMinistry',
    content: securityMinistryContent
  },
  {
    title: 'Trustee',
    id: 'trusteesMinistry',
    content: trusteesMinistryContent
  },
  {
    title: 'Ushers',
    id: 'ushersMinistry',
    content: ushersMinistryContent
  },
  {
    title: 'Women’s',
    id: 'womensMinistry',
    content: womensMinistryContent
  },
  {
    title: 'Young At Heart',
    id: 'yougAtHeartMinistry',
    content: yougAtHeartMinistryContent
  }
];

const topBoxContent = (
  <div>
    <div>
      <h1>Ministries</h1>
    </div>
    <p>
      Ministry provides an effective way to offer tangible, practical help to
      those in our church and community; and contribute to kingdom building. We
      are inspired to minister in order to fulfill the Great Commandment of the
      Lord: “You shall love the Lord your God with all your heart, with all your
      soul, and with all your mind” and “You shall love your neighbor as
      yourself,” and fulfill the Great Commission.
    </p>
  </div>
);

const MinistriesPage = () => {
  return (
    <GeneralPageTemplate
      bottomContentData={bottomContentData}
      menuTitle="Ministries"
      topBoxContent={topBoxContent}
    />
  );
};

export default MinistriesPage;
