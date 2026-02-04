import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';

import MainMenubar from './commonComponents/MainMenubar';

const StyledAboutUspage = styled.div`
  ul {
    list-style-type: disc;
  }

  .actual-content {
    color: var(--alternate-background-text);
    padding: 0 clamp(10px, 70vw - 400px, 250px);

    h2 {
      font-family: var(--quire);
      margin-bottom: 0em;
      padding-bottom: 0em;
      display: grid;
      grid-template-columns: auto 1fr;
    }

    .section-number {
      margin-left: -56px;
    }

    // ul preceed by h3 should have 0 top padding
    h3 + ul,
    h3 + p {
      margin-top: 0;
    }

    h3 {
      margin-bottom: 0em;
    }

    p:first-of-type,
    ol:first-of-type,
    ul:first-of-type,
    h3:first-of-type {
      margin-top: 0;
    }

    .list-item-label {
      font-weight: bolder;
    }
  }

  .top-list {
    ::marker {
      font-size: 24px;
      font-weight: bolder;
      font-family: var(--quire);
    }
  }

  .bolded-label-list {
    ::marker {
      font-size: 16px;
    }

    .label {
      font-weight: bolder;
    }
  }

  figure {
    width: 50%;
  }

  img {
    display: block;
    height: auto;
    width: 100%;
    margin-top: 80px;
  }

  figcaption {
    font-size: 12px;
    margin-top: 6px;
  }
`;

// eslint-disable-next-line react/prop-types
function ProfileSection({title, children}) {
  return (
    <li>
      <h2>{title}</h2>
      <div className="section-paragrphs">{children}</div>
    </li>
  );
}

const ProfilePage = () => {
  return (
    <StyledAboutUspage>
      <MainMenubar imageSource={choir} />
      <div className="content">
        <div className="actual-content">
          <ol className="top-list" type="I">
            <ProfileSection number={1} title="Introduction">
              <p>
                The History of the City Temple of Baltimore (Baptist) (the CTBB)
                is a long one, but in many ways, we are a church that is being
                re-founded more recently. God’s faithfulness and grace have been
                seen throughout the history of the CTBB.
              </p>
              <p>
                It all began when the church was built in 1868 - 1871. It is the
                only structure in Baltimore designed by Thomas U. Walter,
                architect of the Dome and the House and Senate wings of the
                United States Capitol and a founder of the American Institute of
                Architects.
              </p>
              <p>
                Declared one of the 13 landmark buildings in Baltimore City, the
                CTBB’s majestic Gothic structure and spire do much to add
                attractiveness and historic value to the neighborhood. As an
                integral part of the Baltimore City community, the CTBB has
                provided various services through its Inner-City Ministry
                program. The doors of the CTBB were opened to the sorrowful;
                thousands of meals have been served to the hungry, clothing has
                been given to the needy, the homeless have been assisted in
                finding shelter, and visitations have been made to hospitals and
                jails.
              </p>
              <h3>
                Our Story — Faith, Prayer, and Power
                <br />
                The Impossible Dream (1970–1981)
              </h3>
              <p>
                Reverend William W. Payne, led by the Holy Spirit on June 20,
                1970, announced his intent to resign from a congregation of
                twenty-three years to inaugurate a ministry to show spiritual
                and social concern for the rejected and neglected of the Inner
                City. In this “Impossible Dream,” Pastor Payne envisioned a
                ministry in which the hungry would be fed, the naked would be
                clothed, the homeless would be sheltered, and the alcoholics and
                the drug addicts would be served and loved.
              </p>
              <p>
                Several members of the former congregation expressed their
                desire to share this ministry of love and concern and met with
                the pastor to pledge their support in pursuing this “Impossible
                Dream” in a meeting in the home of Pastor William W. Payne. A
                temporary place of worship was secured by Mrs. Elizabeth Logan,
                which became known as the Upper Room, at 745 W. Baltimore
                Street. At a meeting held on September 29, 1970, Pastor Payne
                suggested, and it was agreed, that the congregation’s name would
                be The City Temple of Baltimore (Baptist). The congregation
                suggested that the pastor would be the Reverend William W.
                Payne. It was also stated at this meeting that strong emphasis
                would be placed on Worship, Study, Soul Winning, Tithing, and
                Giving Service to Those in Need. All members of this ministry
                were urged to enroll in Sunday School.
              </p>
              <p>
                From 1970 through 1981, the CTBB showed signs of enormous
                potential under the leadership of energetic, enthusiastic, and
                charismatic Rev. Payne. The congregation canvassed homes in the
                community, drawing in many churched and unchurched people and
                families. As the CTBB grew, scores of people joined the church,
                and church programs flourished, including services for adults,
                youths, and children, a soup kitchen, a homeless shelter, and a
                highly acclaimed music ministry and choir. Initially, the House
                of Hope was established at 1900 Eutaw Place, in a building
                purchased from the Mitchell Funeral Home. This facility was an
                abandoned building. The House of Hope later relocated to a
                building at 20th and Wolfe Streets, on July 11, 1978.
                Eventually, it became clear that selling the House of Hope would
                be the best thing for the church regarding stewardship. The
                church was sold, and all ministries and worship services were
                moved to our primary location, at 317 Dolphin Street. Sadly, on
                March 15, 1983, because of failing health, Rev. Payne retired
                and became Pastor Emeritus.
              </p>
              <p>
                Rev. Cecil McCleary, a CTBB Associate Reverend, was asked to
                serve as Pastor. Rev. McCleary, however, left the church after a
                few months. On November 24, 1984, a Pastoral Search Committee
                was put in place to initiate the process of securing a new
                pastor for our church.
              </p>
              <p>
                In 1985 God sent Rev. Dr. Grady Yeargin, Jr. to pastor City
                Temple. He was installed as the pastor of the City Temple on
                January 26, 1986. Initially, the church did not provide housing.
                However, a few years later, the church purchased a parsonage at
                410 Drury Lane, which has since been sold. Rev. Yeargin brought
                innovative ideas to enhance the church’s ministries and
                programs. When the CTBB started, women could not be in the
                pulpit. Rev. Yeargin started the evolution of women ministers in
                the pulpit. Rev. Debra Hickman-Arnette was the first female
                minister to serve in the pulpit. In 2001, the congregation added
                the W. W. Payne building, which houses the Pastor’s study,
                Sunday School and meeting rooms, and an elevator that rides to
                the main sanctuary. Music has always been a strong point at City
                Temple. Under Rev. Yeargin, the Minister of Music continued this
                tradition. The congregation and community look forward to our
                annual October concert. Unfortunately, due to the COVID-19
                pandemic, we have not been able to hold a yearly concert for a
                few years. Beginning in 1983, after the retirement of Rev.
                Payne, the church began to experience a slight decline in
                membership and financial giving. After the installation of Rev.
                Grady Yeargin, in 1986, we began to experience a slight increase
                in membership. As with many churches, during the years 2000 to
                2019, our youth matured and went away to college, many did not
                return to our city or our church. Though we may be relatively
                small in numbers and finances, we are committed to spiritual
                growth. We are dedicated to fostering programs to help us grow
                our membership and finances.
              </p>
              <p>
                Sorrowfully, Rev. Yeargin passed away in October 2023 from a
                lengthy illness. The congregation still mourns his passing. We
                rejoice that God has taken such loving care of the congregation
                since his passing. Throughout its history, the CTBB has always
                relied on God and prayer during times of trials and blessings.
                We have accepted the challenge and moved on with the guidance of
                the church’s Executive Council and Chair of the Diaconate
                Ministry, as called for by Rev. Yeargin before his passing.
              </p>
            </ProfileSection>
            <ProfileSection number={2} title="Our Setting">
              <p>
                The CTBB is located at the southeast corner of Eutaw and Dolphin
                Streets in Baltimore City, MD. Eutaw Street is a major street in
                Baltimore, mostly in the downtown area. Outside of downtown, it
                is known as Eutaw Place. The south end of Eutaw Street is at
                Oriole Park at Camden Yards. Eutaw Street is famously known as
                the location of Lexington Market.
              </p>
              <p>
                The north end of Eutaw Street is at Dolphin Street. The street
                continues past this point under the name Eutaw Place through
                Bolton Hill and Reservoir Hill communities and ends at Druid
                Park Lake Drive. The Baltimore Metro Subway runs below a large
                part of Eutaw Street. Two of its stations, State Center and
                Lexington Market, are located along Eutaw Street.
              </p>
              <p>
                Some major city landmarks are located on or near Eutaw Street.
                These include Emerson Bromo-Seltzer Tower, Eutaw Place Temple,
                Francis Scott Key Monument, Hippodrome Theater, Lexington
                Market, Lillie Mae Carroll Jackson Museum, Oriole Park at Camden
                Yards, and the University of Maryland at Baltimore, the Fifth
                Regiment Armory, the Edgar Allen Poe Museum, and the Maryland
                State Office Building.
              </p>
              <p>
                Our church community houses many additional churches: Providence
                Baptist Church, New Metropolitan Baptist Church, Sharon Baptist
                Church, Enon Baptist Church, Bethel A.M.E. Church (Baltimore),
                Simmons Memorial Baptist Church, Eutaw Place Baptist Church,
                Union Baptist Church, Mount Calvary Church, Douglas Memorial
                Community Church, Pennsylvania Avenue A.M.E. Church, Payne
                Memorial A.M.E Church (Baltimore), Whitestone Baptist Church,
                Brown Memorial Park Avenue Presbyterian Church U.S.A.), and St.
                Peter Claver St. Pius V Catholic Church. The CTBB is within easy
                commuting distance of both private and public colleges and
                universities: Morgan State University, University of Maryland
                campuses, University of Baltimore, Coppin State University,
                Johns Hopkins University, Maryland Institute College of Art, The
                Peabody Institute, and Baltimore City Community College (BCCC),
                Loyola University Maryland, Notre Dame of Maryland University,
                Towson University, Goucher College, and Stevenson University,
                Baltimore School of the Bible, and St. Mary’s Seminary and
                University.
              </p>
              <p>
                Baltimore is home to several excellent hospitals. Johns Hopkins
                Hospital, regarded as one of the world’s greatest hospitals and
                medical institutions; Kennedy Kreiger Institute; LifeBridge
                Health which includes Sinai Hospital of Baltimore and Northwest
                Hospital in Randallstown, Maryland; MedStar hospitals which
                include MedStar Good Samaritan Hospital, MedStar Union Memorial
                Hospital, MedStar Franklin Square Hospital, and MedStar Harbor
                Hospital; Mercy Medical Center; Mt. Washington Pediatric
                Hospital; St. Agnes Hospital; University of Maryland Medical
                Center, University of Maryland Midtown Center, and the Baltimore
                VA Medical Center; and Greater Baltimore Medical Center (GBMC).
              </p>
            </ProfileSection>
            <ProfileSection number={3} title="Culture of Our Setting">
              <p>
                Baltimore is a frequently visited cultural and tourist location.
                Popular attractions include the Inner Harbor, the National
                Aquarium, Oriole Park at Camden Yards, M&T Bank Stadium, Fort
                McHenry, the Mount Vernon, Federal Hill, and Fells Point
                neighborhoods, Lexington Market, and the Maryland Science
                Center.
              </p>
              <p>
                Cultural museums, including The Baltimore Museum of Art and the
                Walters Art Museum are known for their collections of art. The
                National Great Blacks In Wax Museum, an African American wax
                museum, features life-size and lifelike wax figures. The
                Baltimore Museum of Industry (BMI showcases the history of work
                in Baltimore, from the mid-19th century to the present day. The
                Reginald F Lewis Museum documents, interprets, and preserves the
                complex experiences, contributions, and culture of Black people
                in Maryland. The Eubie Blake Cultural Center focuses on exciting
                and expansive programs, activities, events, and performances for
                young people, adults, and seniors.
              </p>
              <p>
                The AFRO American Newspapers, located in Baltimore, MD, was
                founded 130 years ago. It is the longest-running African
                American family-owned newspaper in the United States and is
                still in operation.
              </p>
              <p>
                The Joseph Meyerhoff Symphony Hall is home to the Baltimore
                Symphony Orchestra (BSO). The BSO has been recognized as one of
                America’s leading orchestras and one of Maryland’s most
                significant cultural institutions. The Baltimore Center Stage is
                a theater committed to artistic excellence. The Lyric is a
                non-profit performing arts center and live entertainment venue.
                Shriver Hall Concert Series presents classical chamber music and
                recitals featuring nationally and internationally recognized
                artists. The Peabody Institute, located in the Mount Vernon
                neighborhood, is the oldest conservatory of music in the United
                States. The Morgan State University Choir is one of the nation’s
                most prestigious university choral ensembles. The city is home
                to the Baltimore School for the Arts, a public high school in
                the Mount Vernon neighborhood of Baltimore. The institution is
                recognized for its success in preparing students to enter vocal
                and instrumental music, acting, theater production, dance, and
                visual arts. The Arena Playhouse is the oldest African American
                playhouse in the United States. The Playhouse is celebrating 70
                years in 2024.
              </p>
            </ProfileSection>
            <ProfileSection number={4} title="Accessibility Accomodations">
              <p>
                The CTBB is handicap accessible. There is an elevator that
                provides access to the sanctuary. Restroom stalls are handicap
                accessible. The church’s Security Ministry provides a safe
                environment for the congregation. The ministry members meet
                people who must wait for the mobility bus or other rides until
                they are safely seated on the bus.
              </p>
            </ProfileSection>
            <ProfileSection number={5} title="Mission Projects">
              <p>
                The CTBB is affiliated with the American Baptist Churches of the
                South (ABCOTS). As a result of this affiliation, we attend and
                support the following annual religious conferences and mission
                support offerings:
              </p>
              <h3>Annual Religious Conferences</h3>
              <ul>
                <li>
                  The Regional Annual Session. The Regional Annual Session is
                  generally held in March, where all regions of the Baptist
                  faith come together to worship, attend workshops, and
                  fellowship.
                </li>
                <li>
                  The Area I Annual session. The Area I Annual session is held
                  in October. Members of Area I come together to worship, attend
                  meetings, share information about the state of ABCOTS, and
                  events within the Area.
                </li>
              </ul>
              <h3>Mission Support Offerings</h3>
              <ul>
                <li>
                  The America for Christ (AFC) Offering service. The AFC
                  contributions are given during the annual service held in
                  March. This offering is divided into two-thirds for the work
                  of National ministries and one-third for the work of American
                  Baptist Churches of the South.
                </li>
                <li>
                  The Great Hour of Sharing. One Great Hour of Sharing is
                  collected during a church service after a disaster. The
                  collection provides relief and development assistance in the
                  United States and overseas, administered by the American
                  Baptist World Relief Committee.
                </li>
              </ul>
            </ProfileSection>
            <ProfileSection number={6} title=" Church Vision">
              <p>
                We shall become a spiritually mature Christian fellowship in
                order to provide an effective witness for Christ in this world!
              </p>
            </ProfileSection>
            <ProfileSection number={7} title=" Church Covenant">
              <p>
                <span className="speaker">ALL:</span> O come, let us praise the
                Lord by the renewing of our covenant relationship with God
                through our Lord and Savior Jesus Christ and with one another by
                the aide of the Holy Spirit.
              </p>
              <p>
                <span className="speaker">MINISTER:</span> In the presence of
                God and this sacred assembly, we acknowledge that the Lord is
                our God.
              </p>
              <p>
                <span className="speaker">PEOPLE:</span> In response to the love
                of God as displayed through the saving grace of Jesus Christ, we
                accept that love, and by the power of the Holy Spirit, we seek
                to serve this present age as one body in Christ with all
                thanksgiving.
              </p>
              <p>
                <span className="speaker">MINISTER:</span> We now rededicate and
                recommit ourselves to our covenant relationship with God by
                lovingly and willingly following the call of our Lord Jesus
                Christ to Christian Discipleship as issued in the commission of
                Christ to go into the world and make disciples of all humanity.
              </p>
              <p>
                <span className="speaker">PEOPLE:</span> To that end, we pledge
                ourselves anew to love the Lord our God with all our hearts, all
                our souls, all our minds, and all our strength; to love one
                another even as Christ has loved us. We further pledge to
                exemplify that love by consciously seeking to cultivate the
                Fruit of the spirit as defined by Paul in the fifth chapter of
                his letter to Galatians.
              </p>
              <p>
                <span className="speaker">MINISTER:</span> As part of this act
                of renewal, we also confess our past failure to be faithful to
                this covenant relationship.
              </p>
              <p>
                <span className="speaker">ALL:</span> We, therefore, confess our
                many sins, those conscious and unconscious. We seek the
                forgiveness of God through the sacrificial suffering and death
                of Jesus Christ; we acknowledge our deep need for the Holy
                Spirit to keep us faithful to our calling. We further recommit
                ourselves to one another as brothers and sisters in Christ and
                pledge to encourage, inspire, pray for, and support one another
                as one body in Christ. To that end, we do now give ourselves
                fully and without reservation to the cause of the Kingdom of
                God.
              </p>
            </ProfileSection>
            <ProfileSection number={8} title="Our Church Life">
              <p>
                Although the CTBB is an African American church, we welcome
                people of every race and ethnicity. Members come from families
                that are single female/male parents, married with no children at
                home, married with children, separated/ divorced, single, or
                widowed. Some members are employed full- or part-time, retired,
                or unemployed. Members hold a variety of employment titles.
                While the CTBB currently has a relatively small membership, our
                church ministries will show we are active and productive.
              </p>
              <h3>Worship</h3>
              <p>
                Our Sunday Morning Worship service begins at 9:00 a.m. and lasts
                for an hour to an hour and a half. It includes praise, worship,
                prayers to God, scripture, liturgical music/dance, a sermon
                based on the Bible, a welcome to visitors, an offering, an
                invitation to discipleship, and Holy Communion and Baptism each
                first Sunday of each month. Our usual Sunday service has
                approximately 65-80 people who regularly attend. On the second
                and fourth Sundays, our children usually leave the service after
                the first 30 minutes to attend church school.
              </p>
              <h3>Discipline</h3>
              <p>
                Since the COVID-19 pandemic, the CTBB has had to adjust its
                youth and adult bible studies. For the Spring of 2024, Youth
                Bible Study met during the worship service on the second and
                fourth Sunday of each month. It concluded at the end of May. Our
                prayer is that our regular Sunday School for youth and adults
                will resume beginning September 2024. Adult Bible Study is held
                each Tuesday evening. It concludes in June and resumes in
                September. The Wednesday Morning Prayer Line is held at 6:00
                a.m. The Wednesday Evening Prayer Hour is held each Wednesday at
                6:00 p.m. The evening prayer hour concludes in June and resumes
                in September. A special program is held for Graduate
                Recognition. In the past, the CTBB held Vacation Bible School
                (VBS) each year. We were unable to hold VBS since returning to
                in-person worship in 2022 due to a shortage of teachers. The
                Youth Ministry and Anniversary Committee planned a youth
                explosion and church cookout event for youth and adults in place
                of VBS for 2024. The event included feeding the spiritual word,
                fun, games, and a cookout. The church will decide how we will
                hold Vacation Bible School in the future.
              </p>
              <h3>Fellowship</h3>
              <p>
                The CTBB has held many fellowship activities in the past. Due to
                COVID-19, and the health and safety of our members, we have not
                resumed many of these activities. Past events included the CTBB
                52nd Anniversary Banquet, church-wide annual outings, trips to
                the National Museum of African American History and Culture, and
                Sight and Sound & Sounds Theatre. We were blessed to have a
                Graduate Recognition Brunch, a Six Flags America trip, a Trunk
                or Treat, and a Cookie Decoration and Bake-off since our return
                to church. We hope to resume activities for our church family in
                the coming years.
              </p>
              <h3>Stewardship</h3>
              <p>
                The maintenance work needed in the church is financed by tithes
                and offerings of church members. Through capital campaigns and
                special gifts, we have been able to make several improvements to
                our building and grounds, and the sound system. Our elevator was
                repaired so that the elderly and physically challenged could
                easily access our sanctuary. The Payne Outreach Center’s front
                door was repaired, and the church roof was replaced. Funds were
                used to maintain the church’s pipe organ.
              </p>
            </ProfileSection>
            <ProfileSection number={9} title="Our Worship Life">
              <p>
                Our worship service includes both pastoral and lay
                participation. A Pulpit Associate and members of the Diaconate
                Ministry handle the duty of the worship leader which includes
                the call to worship, innovation, welcome of visitors,
                announcements, and prayer list. A Diaconate member prays the
                morning prayer. The Pastor/Preacher of the Day reads the sermon
                scripture, preaches the sermon, and gives the closing prayer and
                benediction. The CTBB expects the messages to be both biblically
                based and reflecting upon spiritual, social, and emotional
                issues that challenge Christians every day. We look to be guided
                in our thinking and inspired to spread the word of Christ’s
                boundless love and mercy. Bible study and prayer meetings are
                key components of our worship life. Before COVID-19 in 2019, our
                church family fellowshipped with other churches. To date, we
                have not reinstituted this fellowship.
              </p>{' '}
              <p>
                We celebrate through music in a blended service by having
                traditional hymns and anthems and praise choruses. We sing
                praise songs, led by our Director of Music, drummer/band, and
                the choir. Following the reading of the sermon scripture, the
                choir, or a soloist, sings the sermonic selection. The
                congregation sings a selected song during the Invitation to
                Christian Discipleship.
              </p>
              <p>
                Each year we celebrate with special programs marking key events
                in our Christian calendar: Palm Sunday, Maundy Thursday (The
                CTBB held its own Maundy Thursday worship service in 2024.),
                Good Friday, the Seven Last Words when we fellowship with other
                churches, Easter, Christmas, Martin Luther King, Jr. Memorial,
                Black History Month, Juneteenth, and the annual choir concert.
                We were unable to present our annual concert from 2020-2023 due
                to the COVID-19 pandemic.
              </p>
            </ProfileSection>
            <ProfileSection number={10} title="Church Information">
              <ol className="bolded-label-list" type="a">
                <li>
                  <div className="label">Membership </div>Our membership,
                  currently, consists of 175 members, predominantly female. The
                  predominant age range, of 60 percent of our members, is 60-96.
                  Approximately 20 percent of our members are in the age range
                  of 40-59 years of age, 10 percent are in the range of 20-40,
                  and 10 percent range in ages from 2-19 years of age. As
                  opposed to being a turnover in numbers, we have experienced a
                  steady decline over the past 19 years, pre-pandemic.
                  Approximately 25 members have joined, in the years from 2000
                  to 2019. Most of our members travel to our church from areas
                  around the center of our city. Others travel from Baltimore
                  County, which surrounds the outskirts of Baltimore City.
                </li>
                <li>
                  <div className="label">Services</div> We currently have one
                  Sunday Worship Service, which begins at 9:00 a.m. Upon our
                  return to in-person worship in August of 2021, we streamlined
                  our service to one hour, as was suggested by COVID-19
                  guidelines to decrease the possibility of infections from
                  being in one location for a lengthy period, even with masks.
                  Communion is served on the first Sunday of each month, during
                  the 9:00 A.M. Worship Service. Our worship music consists of a
                  blend of traditional hymns, gospel music, anthems, and
                  contemporary music. Within the Sunday morning worship, we
                  include a morning prayer, and a children’s prayer, which we
                  are re-introducing to our service. Our Sunday worship service
                  is live-streamed and can also be assessed from our church’s
                  online site.
                </li>
                <li>
                  <div className="label">Specials</div> We have not had baptisms
                  since January 2020 due to concerns about COVID-19 infections.
                  Since 2019, we have had two weddings for members in our
                  sanctuary. We were not allowed to use the sanctuary for
                  funerals at the height of the pandemic. We did not re-open our
                  church for funerals until 2022 due to the continued high rates
                  of COVID-19 infections. Since we reopened for funerals in
                  2022, we have held 15 funeral services. We have held two
                  events for the congregation since 2021. In November of 2021,
                  because we were not able to have an anniversary celebration,
                  we held a socially distanced jazz concert in our sanctuary,
                  and in November of 2022, we held an anniversary banquet at
                  Martin’s West Catering Hall. This was for a banquet that had
                  been postponed from November 2020. On Saturday, July 13, 2024,
                  we held a Youth Explosion and church picnic in our church
                  parking lot and in our lower hall.
                </li>
                <li>
                  <div className="label">Children/teens</div> We held a Youth
                  Bible Study for ages 2-18 in our William W. Payne Educational
                  Building during our morning worship. This activity took place
                  from February through May 31, 2024.{' '}
                </li>
                <li>
                  <div className="label">Mid-week activities</div> We have not
                  returned to holding our mid-week in-person Bible Study.
                  However, we currently hold our mid-week Bible Study on Tuesday
                  at 7:00 p.m. and our mid-week Prayer Service on Wednesday
                  evening. Both are held on our online Zoom platform.
                </li>
                <li>
                  <div className="label">Annual/termly activities</div> We have
                  returned to holding our semi-annual church meetings. They are
                  held on Saturdays at 11:00 a.m. We also have weekly scheduled
                  choir rehearsals on Saturdays. Some ministries have returned
                  to meeting on Saturdays as well.
                </li>
                <li>
                  <div className="label">Staff team</div> We currently have the
                  following paid employees:
                  <ul>
                    <li>
                      Pastor’s secretary, who has been on staff, part-time, for
                      25 years.
                    </li>
                    <li>
                      Building and Grounds/Outreach Director who has held this
                      position for 30 years.
                    </li>
                    <li>
                      One additional part-time worker for Buildings and Grounds
                      who has held this position for 20 years.
                    </li>
                    <li>
                      Church clerk, who has held this position for 20 years.
                    </li>
                    <li>
                      Associate Director of Music who has been employed with us
                      for 30 years.
                    </li>
                    <li>
                      A part-time treasurer, who has held this position for 40
                      years.
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="label">Pulpit Associates</div> Seven pulpit
                  associates, including three ordained ministers and three other
                  ministers who are not ordained. One minister is enrolled in
                  Divinity School.
                </li>
                <li>
                  <div className="label">Congregational involvement</div>{' '}
                  Members of the congregation are involved as members in various
                  ministries. The outgoing group leaders provide basic training
                  for the newly elected group leaders.
                </li>
                <li>
                  <div className="label">Leadership structure</div> Executive
                  Committee, Trustees, Diaconate Ministry, Christian Education
                  Ministry.
                </li>
                <li>
                  <div className="label">Outreach</div> As a part of our
                  community outreach, each Thanksgiving we distribute food for
                  Thanksgiving meals to people who sign up through our outreach
                  program. From 1971-2019, we served free Thanksgiving meals to
                  those who were in need, during Thanksgiving Day. For Christmas
                  outreach, the church collects toys for youth and gift cards
                  for those in need. The Church also assists those who need
                  financial support for rental assistance, utility bills, and
                  food needs. We are re-opening our soup kitchen, which was
                  closed during the pandemic, where those in need of a daily
                  meal will be able to receive it two or three days per week.
                  Due to pandemic infections, we were forced to close our
                  clothing distribution. We also plan to re-open this in the
                  near future. The Women’s Ministry distributes toiletries to
                  the House of Ruth, a non-profit organization that provides a
                  haven for victims of domestic violence and their children. In
                  September of each year, the church distributes back-to-school
                  supplies for City Temple’s youth and community youth. Due to
                  COVID-19 and the health and safety of our congregation
                  members, the Diaconate Ministry has not visited the
                  congregation’s sick and shut-in. However, they continue to
                  provide means of staying connected with members by phone calls
                  and cards.
                </li>
                <li>
                  <div className="label">Church plant</div> Our Church is a
                  historical site for Baltimore City. The main church building
                  was built between 1868 and 1871, which makes the facility one
                  hundred and fifty years old. It was originally the Eutaw Place
                  Baptist Church and was designed in a neo-Gothic style by
                  Thomas U. Walter. Thomas U. Walter was also the architect of
                  the main dome of the United States Capitol and the House and
                  Senate wings of the Capitol in Washington, D.C. We have just
                  replaced the roof of our main building and our annex, the
                  William W. Payne Building, which was built in 1995. This
                  building is for the use of the community and 10 years before
                  the COVID-19 pandemic, we collaborated with Baltimore City
                  Community College to host a GED program. We are also preparing
                  to fix parts of the ceiling in the main sanctuary. We have
                  central air conditioning in our sanctuary. The church also has
                  a connecting parking lot, which can accommodate 15 vehicles.
                </li>
                <li>
                  <div className="label">Minister accommodation</div> The church
                  no longer has a parsonage.
                </li>
                <li>
                  <div className="label">Financial giving</div> Our giving has
                  remained consistent since our return to in-person worship. We
                  have 157 tithing units. We recently began a capital campaign
                  to fund the repair of our sanctuary roof and the roof of our
                  William W. Payne Outreach Center.
                </li>
                <li>
                  <div className="label">Church office</div> The church office
                  utilizes desktop computers to engage in and complete needed
                  activities. We also utilize Microsoft Word. We will be
                  upgrading our technology in the future.
                </li>
                <li>
                  <div className="label">Communication</div> The CTBB has many
                  forms of communication including print, REALM email system,
                  church Robocalls, church information line, social media,
                  texting, church website, Zoom, YouTube, Facebook, and text.
                </li>
              </ol>
            </ProfileSection>
            <ProfileSection number={11} title="Strengths and Challenges">
              <ol className="bolded-label-list" type="a">
                <li>
                  <div className="label">Trends</div> Many members have not
                  returned to in-person worship since the COVID-19 pandemic.
                  Their reasons may be because of declining health, change of
                  church membership, or continued comfort in viewing church
                  online.
                </li>
                <li>
                  <div className="label">Contentious issues</div> The
                  congregation experiences unity in many areas. However, some
                  members are concerned that we no longer have many youth/young
                  adult members. This issue, however, has impacted most churches
                  in our area and other areas of Baltimore City and surrounding
                  areas. In addition, members are in a hurry to receive a new
                  pastor and think the process is too slow.
                </li>
                <li>
                  <div className="label">Strengths</div> We have been able to
                  function and survive, as a body in Christ, after the sudden
                  passing of our Pastor. We have been able to work diligently to
                  put together a Pastoral Search Committee to move towards
                  securing our next pastor. We were able to provide a beautiful
                  Memorial Service, despite our grief, to honor our deceased
                  pastor. Our ministries are beginning to reactivate.
                </li>
                <li>
                  <div className="label">Weaknesses</div>
                  <ul>
                    <li>Loss of revenue</li>
                    <li>
                      Inability to grow and encourage young families to become
                      members
                    </li>
                    <li>Lack of youth and young adults</li>
                    <li>Aged population</li>
                    <li>Need for officer training</li>
                    <li>Need for newly appointed and elected officers</li>
                  </ul>
                </li>
              </ol>
            </ProfileSection>
            <ProfileSection number={12} title="What Is Our Future?">
              <h3>
                What do we need to be a more healthy and more faithful church?
              </h3>
              <ul>
                <li>Establish necessary priorities/Changes</li>
                <li>
                  Vision statement/Develop Strategic plan and monitor for growth
                </li>
                <li>
                  Significant Doctrinal/Practical matters impacting the future
                  life of the CTBB
                </li>
                <li>Membership growth</li>
                <li>
                  Continue to be a loving and open church that welcomes everyone
                </li>
                <li>A place where young people want to come</li>
                <li>
                  Increase membership of youth (0-18 years old), young adults
                  (19-30 years old), and adults (31-50 years old)
                </li>
                <li>
                  More congregational participation/Continued dedication to
                  Christ
                </li>
                <li>Constant and consistent prayer</li>
              </ul>
              <h3>What will the CTBB look like when God sends us a Pastor?</h3>
              <ul>
                <li>
                  More members – full attendance at worship service
                  Excited/Enthusiastic/Dynamic
                </li>
                <li>
                  The CTBB continues to be important and involved in the
                  community
                </li>
                <li>Enhanced Music</li>
                <li>More fellowship with other churches</li>
                <li>Increased presence of Christ-loving youth</li>
              </ul>
              <h3>
                What ministries do we need to develop and strengthen over the
                next five years?
              </h3>
              <ul>
                <li>Christian Education Ministry</li>
                <li>Youth Ministry</li>
                <li>Community Outreach Ministry</li>
                <li>Women’s Ministry </li>
                <li>Men’s Ministry</li>
                <li>Singles Ministry</li>
                <li>Couples Ministry</li>
                <li>Seniors Ministry</li>
                <li>Music Ministry</li>
              </ul>
              <h3>How did CTBB decide its vision?</h3>
              <ul>
                <li>Prayer</li>
                <li>Pastoral discussion concerning what we want to achieve</li>
                <li>
                  Discussion/Sharing among leadership to obtain a unified
                  vision/Consensus
                </li>
              </ul>
            </ProfileSection>
            <ProfileSection
              number={13}
              title="What the CTBB Needs from Our Next God-sent Pastor"
            >
              <h3>Spirituality</h3>
              <ul>
                <li>Knows the bible</li>
                <li>
                  Has a strong prayer life, which is visible by his/her actions
                </li>
                <li>
                  Preaches the Gospel and can apply God’s Word to today’s issues
                </li>
                <li>
                  Has a Pastoral Heart who loves and deeply cares for people
                </li>
                <li>
                  Is spiritually alive; is Christ-like, has strong faith, is
                  genuine, sincere, and experienced in sharing the Gospel
                </li>
              </ul>
              <h3>People Skills</h3>
              <ul>
                <li>Friendly/People Person/Caring and loving personality</li>
                <li>Sense of Humor/Informal/Casual Approachable</li>
                <li>Enthusiastic/Outgoing/Self-confident/Optimistic</li>
                <li>Patient/Compassionate/Empathetic/Thoughtful/Genuine </li>
                <li>Effective oral and written Communicator</li>
                <li>Trustworthy</li>
                <li>Influential Leader/Able to hold others accountable</li>
                <li>
                  Willing to visit sick members and members who are suffering
                  from grief{' '}
                </li>
              </ul>
              <h3>Personal Qualities</h3>
              <ul>
                <li>
                  Possesses good administrative skills (organized, delegates,
                  sets goals, does not hesitate to initiate taking leadership
                  for activities for the good of the church ministry
                </li>
                <li>Good public speaker</li>
                <li>Experience with youth</li>
                <li>
                  Ability to recognize the need for the use of various social
                  media in the ministry
                </li>
                <li>Ability to provide spiritual counseling</li>
                <li>
                  Ability to communicate by using various technology skills
                </li>
              </ul>
            </ProfileSection>
            <ProfileSection number={14} title="Pastoral Search Committee">
              <ul>
                <li>Racquel Smith, Chairperson</li>
                <li>Carolyn Gaskins, Vice Chairperson</li>
                <li>Patricia Shearn-Ward, Secretary</li>
                <li>Bernadette Forman</li>
                <li>Gerry Grant</li>
                <li>April Jones</li>
                <li>Marlene Jones</li>
                <li>Gilbert Richards</li>
                <li>Briana Williams</li>
              </ul>
            </ProfileSection>
          </ol>
        </div>
      </div>
    </StyledAboutUspage>
  );
};

export default ProfilePage;
