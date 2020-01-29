import React from 'react';
import GeneralPageTemplate from './commonComponents/GeneralPageTemplate';

const pastorContent = (
  <p>
    <p>
      The Rev. Dr. Grady Andrew Yeargin, Jr. was born on November 7, 1949 in
      Greenville, South Carolina. He attended Sterling High School and was
      admitted to Morehouse College in 1966 on an early admission scholarship.
      In 1970, he graduated from Morehouse with a B.A. Degree in Philosophy and
      Religion, he graduated from Colgate-Rochester Divinity School with a
      Master of Divinity Degree in 1973, and he graduated from Wesley
      Theological Seminary in 2005 with a Doctor of Ministry Degree.
    </p>
    <p>
      Dr. Yeargin began his ministerial career in 1973 as the Associate Minister
      of the Mount Zion Baptist Church in Newark, NJ under the pastorate of the
      Rev. Dr. Granville A. Seward. Along with his responsibilities in the areas
      of Youth Ministry, Christian Education and Neighborhood Ministry, Dr.
      Yeargin was also responsible for assuming the pastoral responsibilities in
      the absence of the Pastor.
    </p>
    <p>
      During his tenure at Mount Zion, Dr. Yeargin served as a board member of
      the Campus Christian Foundation, the Youth Council of the American Baptist
      Churches of New Jersey and of the Metropolitan Ecumenical Ministries
      Committee on Neighborhood and Youth Ministry.
    </p>
    <p>
      In 1976, Dr. Yeargin was called to pastor the Mount Prospect Church in
      Rock Hill, South Carolina. Along with providing a new dimension in the
      area of teaching ministry in the church and in the local Bible College,
      Dr. Yeargin held positions in both the local and state conventions along
      with serving on several civic committees.
    </p>
    <p>
      After serving Mount Prospect for nine years, Dr. Yeargin was called to
      pastor the City Temple of Baltimore (Baptist) on September 10, 1985. He
      began his pastorate in January 1986. Dr. Yeargin has brought a new
      dimension of spiritual nourishment and growth to City Temple through
      worship, study, and action. Under his direction several new ministries
      have been established in City Temple that include: the Shelter Ministry,
      the Dance Ministry, the New Members Counselors Ministry, the Christian
      Education Ministry, the Courtesy Guild, the Tape Ministry as well as the
      re-establishment of the Cultural and Fine Arts Ministry and the Building
      Ministry.
    </p>
    <p>
      Dr. Yeargin has been socially involved in the life of the community
      through his participation in Baltimoreans United in Leadership Development
      (B.U.I.L.D.) as well as serving for two years as a clergy co-chairperson,
      the Interdenominational Ministerial Alliance, the Institute for Christian
      and Jewish Studies, The United Missionary Baptist Convention of Maryland,
      and was the previous co-chairperson of the Baltimore affiliate of the
      National Black Leadership Commission on AIDS.
    </p>
    <p>
      Dr. Yeargin is married to Patricia Ann Yeargin and they share two
      daughters, Adia Joy and Candace. He also continues to maintain his sense
      of fatherhood to his beloved daughter, Kimberly Rei, who is deceased.
    </p>
  </p>
);

const membershipContent = (
  <p>
    <p>
      City Temple membership consists of baptized believers who have professed
      faith in Christ and a willingness to be directed by the Holy Spirit. Any
      person who wishes, regardless of his race, gender, sexual preference, or
      religion, will be welcomed into church membership upon profession of faith
      in Christ.
    </p>
    <p>
      To make the transition to joining our church fluid and comfortable, we
      offer a New Membership Training Class. The training includes assigning a
      prayer partner to each new member, receiving detailed information
      regarding the many ministries, fellowship groups, and partnerships at the
      church, and accepting the Right Hand of Fellowship during the worship
      service.
    </p>
    <p>
      To receive more information, please call or email the church office. See
      you in service!
    </p>
    <p>New Members’ Training</p>
    <p>
      One of the entities of The Christian Education Ministry is the New
      Members’ class. All persons joining City Temple of Baltimore Baptist
      Church are invited to participate in this program. This six-week course,
      which meets each Sunday following worship service, is designed to provide
      an orientation for all who are new to the Baptist faith, in addition to
      being new to City Temple.
    </p>
    <p>This spiritually based course will cover subjects including:</p>
    <ol>
      <li>The Meaning of Church Membership</li>
      <li>The Nature and Mission of the Church</li>
      <li>Baptist Beliefs and Practices</li>
      <li>The Organization of The Baptist Church</li>
      <li>The Life of City Temple</li>
      <li>Spiritual Gifts and Talents</li>
    </ol>
  </p>
);

const historyContent = `
    History, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  `;

const bottomContentData = [
  {
    title: 'The Pastor',
    id: 'thePastor',
    content: pastorContent
  },
  {title: 'Membership', id: 'membership', content: membershipContent},
  {title: 'History', id: 'history', content: historyContent}
];

const topBoxContent = (
  <div>
    <div>
      <h1>Something About Us</h1>
    </div>
    <p>
      City Temple’s goal from inception has been to open its doors to the
      sorrowful, serve meals to the hungry, provide clothing for the needy,
      shelter the homeless, and visit the hopeless in jails and hospitals. We
      place a strong emphasis on worship, study, soul winning, tithing, and
      giving service to those in need.
    </p>
  </div>
);

const MainAboutUs = () => {
  return (
    <GeneralPageTemplate
      bottomContentData={bottomContentData}
      menuTitle="About Us"
      topBoxContent={topBoxContent}
    />
  );
};

export default MainAboutUs;
