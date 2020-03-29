import React, {useState} from 'react';
import styled from 'styled-components';

import anniversaryChoirPicture from '../assets/main/images/30th-anniversary-choir.jpg';
import congregationPicture from '../assets/main/images/congregation.jpg';
import yearginPicture from '../assets/main/images/grady-yeargin.jpg';
import organPicture from '../assets/main/images/organ-close.jpg';
import revPaynePicture from '../assets/main/images/rev-payne.jpg';
import routePaths from '../routePaths';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import ContentAndSides from './commonComponents/ContentAndSides';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentRightSide from './commonComponents/ContentRightSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import SideMenu from './commonComponents/SideMenu';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';
import TopInfoBox from './commonComponents/TopInfoBox';
import TopInfoBoxWrapper from './commonComponents/TopInfoBoxWrapper';

const StyleWrapper = styled.div`
  .yeargin-picture {
    float: left;
    width: 200px;
    height: auto;
    margin: 0 1em 1em 0;
  }

  .above-header-picture {
    display: inline-block;
    width: 100%;
    height: auto;
    margin: 0 1em 1em 0;
  }

  .mid-content-picture {
    display: inline-block;
    width: 100%;
    height: auto;
    margin: 0 1em 1em 0;
  }

  .rev-payne-picture-and-caption {
    float: left;
    font-weight: bold;
    width: 200px;
    margin: 0 1em 1em 0;
    text-align: center;

    img {
      width: 100%;
      height: auto;
    }
  }

  .multi-pictures {
    display: flex;
    align-items: flex-start;

    .img {
      display: block;
      height: auto;
    }
  }
  .header {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
  }
`;

const pastorContent = (
  <div>
    <h2>The Pastor</h2>
    <img alt="Grady Yeargin" className="yeargin-picture" src={yearginPicture} />
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
  </div>
);

const membershipContent = (
  <div>
    <img
      alt="Congregation"
      className="above-header-picture"
      src={congregationPicture}
    />
    <h2>Membership</h2>
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
  </div>
);

const historyContent = (
  <div>
    <div className="multi-pictures" />
    <h2>History</h2>
    <div className="rev-payne-picture-and-caption">
      <img alt="Rev. Payne" className="payne-picture" src={revPaynePicture} />
      <figcaption>Rev. Payne</figcaption>
    </div>
    <p>
      The City Temple of Baltimore (Baptist) is a historic landmark and should
      be preserved. The church was built in 1868 - 1871 and is the only
      structure in Baltimore designed by Thomas U. Walter, architect of the Dome
      and the House and Senate wings of the United States Capitol, and a founder
      of the American Institute of Architects.
    </p>
    <p>
      Declared one of the 13 landmark buildings in Baltimore City, the Temple’s
      majestic Gothic structure and its spire does much to add attractiveness
      and historic value to the neighborhood. As an integral part of the
      Baltimore City community, the Temple has provided an array of services
      through its Inner City Ministry program. The doors of the Temple were
      opened to the sorrowful; thousands of meals have been served to the
      hungry, clothing has been given to the needy, the homeless have been
      assisted in finding shelter, visitations have been made to hospitals and
      jails.
    </p>
    <p>The Impossible Dream (1970-1981)</p>
    <p>
      Reverend William W. Payne, led by the Holy Spirit on June 20, 1970,
      announced his intent to resign from a congregation of twenty-three years
      to inaugurate a ministry to show spiritual and social concern for the
      rejected and neglected of the Inner City. In this “Impossible Dream”
      Pastor Payne envisioned a ministry in which the hungry would be fed, the
      naked would be clothed, the homeless would be sheltered, and the
      alcoholics and the drug addicts would be served and loved.
    </p>
    <p>
      Several members of the former congregation expressed their desire to share
      this ministry of love and concern, and met with the pastor to pledge their
      support in the pursuit of this “Impossible Dream” in a meeting in the home
      of Pastor William Payne.
    </p>
    <p>
      A temporary place of worship was secured by Mrs. Elizabeth Logan, which
      became known as the Upper Room, at 745 W. Baltimore Street. At a meeting
      held on September 29, 1970, Pastor Payne suggested, and it was agreed,
      that the name of the congregation would be The City Temple of Baltimore
      (Baptist). The congregation suggested that the pastor would be the
      Reverend William W. Payne. It was also stated at this meeting that strong
      emphasis would be placed on Worship, Study, Soul Winning, Tithing and
      Giving Service to Those In Need. All members in this ministry were urged
      to enroll in Sunday School.
    </p>

    <p>
      Reverend Payne stated that part of this dream was a settlement house. The
      settlement house would be called “A House of Hope” where all people could
      come. The House would be a separate entity from the church. Mrs. Zadie
      Simon proceeded to look for a place to begin the clothing distribution.
      She was instrumental in securing the vacant Summers Norwood Florist Shop,
      where Mr. Carl Norwood, a Deacon at Faith Baptist Church, donated the
      florist shop for the clothing ministry free of charge.
    </p>
    <p>
      In the meantime worship services were held at the Old University Hall. The
      first officers were: (Deacons) Mr. William Boyd, Mr. Clifton White, Mr.
      David Rather, Mr. Royster Gant, Mr. William Taylor, Mr. Reginald Trusty
      and Mr. William Coleman; (Trustees) Mr. George D. Brown, Mr. Felix Hughey,
      Mr. Elmore Bowler, Mr. Samuel Washington, Mr. Walter McCants, Mr. Viller
      Brown, Mr. Herman C. Johnson and Mr. Jim Ivey.
    </p>
    <p>
      After much time, energy and prayer, the impossible became possible. The
      Lord touched not only the hearts of this small fellowship, but people from
      all walks of life who literally poured money into this new venture and
      within ninety days more than $30,000 was raised.
    </p>
    <p>
      The pulpit furniture was completely decayed; Mr. William Johnson, assisted
      by his son, Mr. Herman Johnson, restored and upholstered each chair with
      hobnails and trimmings. Mrs. Marjorie Roberson made all of the cushions
      for the pews. Shortly thereafter, The City Temple of Baltimore (Baptist)
      was incorporated. The corporation included: Rev. William W. Payne,
      President; William H. Boyd, Secretary; Walter B. McCants, Treasurer; David
      Rather, Director; Royster Gant, Director. The newly formed congregation
      was duly chartered and incorporated as a body corporate under the laws of
      the State of Maryland.
    </p>
    <p>
      On Thanksgiving Day, November 26, 1970, the congregation of The City
      Temple of Baltimore (Baptist) made its triumphant entry into the current
      house of worship at Eutaw Place and Dolphin Street. Upon the invitation to
      Christian discipleship, more than 50 persons came forth. Within a few
      months, the Sunday School had an enrollment of 350 and the Sunday worship
      service averaged 700. The House of Hope at 1900 Eutaw Place was purchased
      from the Mitchell Funeral Home. The House of Hope relocated at 20th and
      Wolfe Streets on July 11, 1983.
    </p>
    <p>
      By 1981, 1,638+ souls had been added to our numbers and 750 candidates had
      been baptized. The doors of the Temple had been opened to the sorrowful to
      be given the comfort of the gospel without regard to race or creed.
      Thousands of meals had been given to the hungry by Mrs. Phyllis Womack,
      Mrs. Florine Trusty, Mr. John Segal, Mrs. Shirley Rice and Mr. William
      Boyd. Clothing had been given to the needy, initiated by Mrs. Zadie Simon
      and continued by Mrs. Mary Rich. The homeless were assisted in finding
      shelter; visitations were made to hospitals and jails; the addicts, the
      alcoholics and the emotionally disturbed were embraced in our Christian
      fellowship. The Eutaw Place Day Nursery was set up by Mrs. Elizabeth D.
      Logan and large numbers of children were enrolled as a courtesy to working
      mothers employed by the State and other agencies. Mrs. Logan also used her
      expertise in getting much of the legal litigation of the corporation done
      free of charge.
    </p>
    <img
      alt="50th Anniversary Choir"
      className="mid-content-picture"
      src={anniversaryChoirPicture}
    />
    <p>
      Mid-week, mid-city, mid-day worship services were held at the City Temple
      of Baltimore (Baptist) each Wednesday at 12:05 PM for all people who
      desired to unite with God and enjoy the fellowship of others who found
      these services uplifting, both spiritually and emotionally. The Lord
      blessed the Temple materially, also. The lot next door to the building was
      purchased from the City at a cost of $2,100. Necessary repairs were made
      to the roof and the ladies restroom was renovated. The funds were raised
      by Just We Few, with Mrs. Dora Hardee as Group Leader. Our mortgage was
      completely liquidated on December 14, 1981.
    </p>
    <p>The Dream Continues (1982-1984)</p>
    <p>
      A Restoration and Planning Corporation was formed in 1983 to meet the
      requirements of the State. The City Temple of Baltimore (Baptist) is a
      historical landmark and the church was blessed materially with a matching
      fund grant from the State of Maryland of $100,000 for the restoration of
      the exterior of the building. Because the Constitution states that
      churches cannot use State money for religious purposes, Pastor Payne
      appointed the following persons to work with the Corporation: Mr. William
      Harrington, Mrs. Lorena Branch, Mrs. Christine Moore, Mr. Viller Brown,
      Mr. Edward Holden, Mr. Charles Davenport, Mr. Herman C. Johnson and Mr.
      Francis White (President).
    </p>
    <p>
      On March 15, 1983, due to failing health, our Pastor and Founder of the
      “Impossible Dream” rendered his resignation as Pastor of the City Temple
      of Baltimore (Baptist). In this meeting, requested by Reverend William W.
      Payne, he became Pastor Emeritus; and, on June 26, 1983, a tribute was
      given in his honor.
    </p>
    <p>
      Following the retirement of Pastor William W. Payne, the “Impossible
      Dream” seemed a bit shattered due to decline in membership, spiritual
      nourishment and financial contributions. But, God was not through with the
      Temple yet. Reverend Cecil McClary accepted the challenge and was chosen
      Pastor of City Temple. He resigned after serving one year.
    </p>
    <p>
      On November 24, 1984 a Pulpit Committee was selected to seek out a
      suitable pastor to be presented to the City Temple congregation. Because
      of Deacon William Boyd’s experience, as chairman of the Official Board
      (although he had retired as Board Chairman), he was asked to serve as
      interim Chairman of the Board, and Reverend William W. Payne was asked to
      serve as interim Pastor during the period of the pulpit vacancy. Deacon
      Boyd and Reverend Payne accepted the appointments as Interim Chairman of
      the Board and Interim Pastor, respectively. But, due to the illness of
      Reverend W. W. Payne, Reverend Randolph Taylor, an associate minister of
      City Temple, actually served during the vacancy of the pulpit, with
      assistance from the Evangelists of City Temple and visiting ministers. On
      July 9, 1985, in a duly called Church wide Meeting of the congregation,
      Mr. Lewis Carr was elected Chairman of the Official Board and Mr. Charles
      Davenport was elected as the Vice Chairman.
    </p>
    <p>Thy Will be Done (1985-1990)</p>
    <p>
      In a duly called Church wide Meeting, September 10, 1985, Reverend Grady
      A. Yeargin, Jr. was unanimously elected as Pastor of The City Temple of
      Baltimore (Baptist). He was officially installed on January 20, 1986 at
      5:00 PM. Reverend Grady A. Yeargin, Jr. came to City Temple with the
      anointing of the Holy Spirit and experience of nine years in the Ministry.
      His sensitive spirit and servant heart has brought us a new dimension of
      spiritual nourishment and growth through worship, study and action.
    </p>
    <p>
      The state of the economy imposed greater demands on the Outreach Ministry
      sponsored by City Temple for assistance to the needy under the direction
      of Deacon Lewis Carr. By the grace of God and with the volunteers of Mrs.
      Pearl Giles and Mr. James McCoy in the Temple Soup Kitchen at 317 Dolphin
      Street, and Mrs. Shirley Rice, in the House of Hope Soup Kitchen at 906
      Wolfe Street, 200 persons or more were fed daily. Mrs. Pearl Cartwright, a
      volunteer in the clothing program, distributed 100 articles of clothing
      weekly free of charge. Mrs. Zadie Simon and Mrs. Betty Johnson volunteered
      in the social service area of the ministry. Many other parishioners and
      friends volunteered with the Outreach Program which, since the sale of the
      House of Hope, has moved in its entirety to City Temple.
    </p>
    <p>
      The Restoration and Planning Committee completed the restoration of the
      exterior of City Temple in November, 1987 under the leadership of Pastor
      Grady A. Yeargin. Mrs. Lorena Branch and Mr. Edward B. Holden chaired the
      committee. The completion and restoration project of the Temple Organ was
      celebrated November 15, 1987 with a Dedicatorial Recital presented by
      Kenneth M. Dean, Jr., Minister of Music at that time.
    </p>
    <p>
      The Building Committee, the B.U.I.L.D. Action Team and the Cultural and
      Fine Arts Committee are part of the continuing dream. In addition, the
      Board of Christian Education and Scholarship Committees were developed by
      Pastor Grady A. Yeargin, Jr., in January 1988.
    </p>
    <p>
      Realizing that there is a need to meet the increasing needs of our church
      and the greater Baltimore community, we felt that there was a new and
      greater challenge before us. It was with this need in mind that the church
      voted to become involved in a Capital Stewardship Improvement Program for
      a three year commitment by members of the congregation.
    </p>
    <p>We Continue (1991-1995)</p>
    <p>
      On May 21, 1995 a street sign honoring Rev. William W. Payne was unveiled
      at the corner of Dolphin and Eutaw following a brief ceremony in the
      church sanctuary. The sign reads “Rev. William W. Payne Way” and was
      unveiled at 10:51 AM by Bro. Herman Johnson.
    </p>
    <p>
      This project was sponsored by the Young At Heart Seniors Ministry.
      Representatives from the Mayor’s Office, City Council and State Government
      were in attendance (Mary Pat Clarke, Julian Lapides, Carl Stokes, etc.) A
      resolution from the City Council was read by Mary Pat Clarke. During the
      same event, Sis. Delores Royster made a presentation to Dea. Mattie
      Gladney and Bro. Herman Johnson for dedicated service.
    </p>
    <img alt="Organ" className="mid-content-picture" src={organPicture} />
    <p>
      A special committee of church members was formed to raise money for the
      restoration of the church’s pipe organ. This committee sold fish and
      chicken dinners for several weeks during the months of January through
      May, 1995 and on May 21, 1995 a financial report was presented to the
      congregation by Gladys Smith: $8,107.93 was collected ($ 1916.95 was used
      to install a new fryer; $618.00 was donated to the Concert Choir and
      $5573.48 was used for the organ).
    </p>
    <p>
      On June 11, 1995 the church celebrated Pastor’s Appreciation Day and Rev.
      Grady A. Yeargin, Jr. was honored for 25 years in the ministry. One
      worship service was held at 10:00AM and was sponsored by The Pastor’s Aid.
      The guest speaker was Rev. Dr. Fred L. Steen of Oberlin, Ohio (City Temple
      took 5 busloads to visit Rev. Steen’s congregation in 1992). Rev. W.W.
      Payne was in attendance. “A 25-Year Journey” of Rev. Yeargin was presented
      by Mrs. Betty Johnson. Two presentations were made: Dea. Mattie Gladney
      made a presentation to the elevator and Rev. Yeargin and Gladys Smith
      (Trustees) presented $500 to the Organ Fund.
    </p>
    <p>
      On November 5, 1995, being led by the Holy Spirit, Rev. Grady A. Yeargin,
      Jr., Pastor, Rev. W. W. Payne, Pastor Emeritus, founders, sons/daughters,
      officers and members (100+) met on the Governor’s Club parking lot to
      re-enact the march into City Temple as it took place 25 years ago.
    </p>
    <p>
      Leading us in song of praises were Rev. Yeargin and Bro. Frank White; then
      the march began up Eutaw Place with Rev. Yeargin, Rev. W.W. Payne,
      sons/daughters of founders who have passed on, officers. Following from
      that point came the members of the congregation singing “Marching to Zion”
      on this glorious crisp, sun shining fall morning. The history was given by
      Norman Johnson and Barreda Howell paid tribute and recognized the founders
      of City Temple. The congregation was then introduced to the 25th
      Anniversary Committee.
    </p>
    <p>A Community of Spiritual Maturity (1996 - )</p>
    <p>
      Due to the efforts of The Perpetual Organ Fund of The City Temple of
      Baltimore (Baptist) the restoration and upgrade of the church’s pipe organ
      was completed. At the culmination of the organ upgrade, a Recital,
      featuring Ms. Diane Bish, was coordinated by Lois E. Smith, Minister of
      Music. This great instrument, with many voices and many builders across
      many years, has joined our hearts, hands and voices to also include a
      strong and comprehensive music ministry. We resoundingly accepted a new
      mission at the Temple - We will become a spiritually mature Christian
      fellowship, in order to provide an effective witness for Christ in this
      world.
    </p>
    <p>
      The City Temple Development Corporation (CTDC) was formed to develop and
      implement educational, community programs, services and economic
      development projects for persons who require such support and services;
      encouraging independent living and improving quality of life to the extent
      of each person’s capability. The first task of the Corporation was to
      construct the W. W. Payne Educational and Community Center. A
      multi-purpose building located on the parking lot adjacent to The Temple,
      the space is to be used to continue and expand existing services and
      develop new programs and services for the community.
    </p>
    <p>
      As we move ever-forward in our quest to fulfill the Vision, we continue
      our Inner City Ministry program (feed the hungry, clothe the naked). We
      have expanded this outreach to teach the unlearned. Preaching, music,
      bible study, Sunday school, Christian education, visitations and making a
      joyful noise unto the Lord brings us ever closer to becoming spiritually
      mature Christians and effective witnesses for Christ in this world.
    </p>
    <p>The Original 27</p>
    <ul>
      <li>Rev. William Washington Payne, Jr.</li>
      <li>Walter Allen</li>
      <li>Marjorie P. Austin</li>
      <li>William Boyd</li>
      <li>Royster Gant</li>
      <li>Gladys Higginbotham</li>
      <li>Glover Holman</li>
      <li>Lillian Hughey</li>
      <li>Felix Hughey</li>
      <li>Leon Jackson</li>
      <li>William Laney</li>
      <li>Colleaner Lyons</li>
      <li>Harold Mattison</li>
      <li>Susie Mattison</li>
      <li>Pearl McCants</li>
      <li>Walter McCants</li>
      <li>Clyde Milner</li>
      <li>Josephine Morton</li>
      <li>Ozea Morton</li>
      <li>Gladys Palmer</li>
      <li>Bettye L. Preston</li>
      <li>David Rather</li>
      <li>Ollie Rather</li>
      <li>Pearl Watts</li>
      <li>Clifton White</li>
      <li>Louise White</li>
      <li>Gertrude Withers</li>
    </ul>
  </div>
);

const churchVisionContent = (
  <div>
    <h2>Church Vision &amp; Covenant</h2>
    <h3 className="header">Church Vision </h3>
    <p>
      We shall become a spiritually mature Christian fellowship in order to
      provide an effective witness for Christ in this world!
    </p>
    <h3 className="header">Church Covenant</h3>
    <p>
      <b>ALL:</b> O come, let us praise the Lord by the renewing of our covenant
      relationship with God through our Lord and Savior Jesus Christ and with
      one another by the aid of the Holy Spirit.
    </p>
    <p>
      <b>MINISTER:</b> In the presence of God and this sacred assembly, we
      acknowledge that the Lord is our God.
    </p>
    <p>
      <b>PEOPLE:</b> In response to the love of God as displayed through the
      saving grace of Jesus Christ, we accept that love and by the power of the
      Holy Spirit we seek to serve this present age as one body in Christ with
      all thanksgiving.
    </p>
    <p>
      <b>MINISTER:</b> We now rededicate and recommit ourselves to our covenant
      relationship with God by lovingly and willingly following the call of our
      Lord Jesus Christ to Christian Discipleship as issued in the commission of
      Christ to go into the world and make disciples of all humanity.
    </p>
    <p>
      <b>PEOPLE:</b> To that end, we pledge ourselves anew to love the Lord our
      God with all our hearts, all our souls, all our minds, and all our
      strength; to love one another even as Christ has loved us. We further
      pledge to exemplify that love by consciously seeking to cultivate the
      Fruit of the Spirit as defined by Paul in the fifth chapter of his letter
      to Galatians.
    </p>
    <p>
      <b>MINISTER:</b> As a part of this act of renewal, we also confess our
      past failure to be faithful to this covenant relationship.
    </p>
    <p>
      <b>ALL:</b> We, therefore, confess our many sins, those conscious and
      unconscious. We seek the forgiveness of God through the sacrificial
      suffering and death of Jesus Christ; we acknowledge our deep need for the
      Holy Spirit to keep us faithful to our calling. We further recommit
      ourselves to one another as brothers and sisters in Christ and pledge to
      encourage, inspire, pray for, and support one another as one body in
      Christ. To that end, we do now give ourselves fully and without
      reservation to the cause of the kingdom of God.
    </p>
  </div>
);

const bottomContentData = [
  {
    title: 'Church Vision & Covenant',
    id: 'vision',
    content: churchVisionContent
  },
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
    <h1>About Us</h1>
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
  const [contentId, setContentId] = useState(bottomContentData[0].id);
  const currentContentData = bottomContentData.find(({id}) => contentId === id);

  return (
    <StyleWrapper>
      <StandardPageWrapper>
        <MainMenubar />
        <TopInfoBoxWrapper>
          <TopInfoBox>{topBoxContent}</TopInfoBox>

          <ContentAndSubCompassWrapper>
            <AboveContentLinks
              pagePath={routePaths.MAIN_ABOUT_US}
              pageTitle="About Us"
              subPageTitle={currentContentData.title}
            />
            <ContentAndSides>
              <ContentLeftSide>
                <SideMenu
                  currentId={contentId}
                  menuData={bottomContentData}
                  onClick={id => setContentId(id)}
                  title="About Us"
                />
              </ContentLeftSide>
              <ContentWrapper>{currentContentData.content}</ContentWrapper>
              <ContentRightSide />
            </ContentAndSides>
          </ContentAndSubCompassWrapper>
        </TopInfoBoxWrapper>
      </StandardPageWrapper>
    </StyleWrapper>
  );
};

export default MainAboutUs;
