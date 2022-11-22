import React from 'react';
import styled from 'styled-components';

import yearginPicture from '../assets/main/images/grady-yeargin.jpg';

const StyledAboutUspage = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  h2 {
    text-align: center;
  }

  h2:nth-child(1) {
    margin-top: 0;
  }

  .pastor-info-and-picture {
    align-items: center;
    align-self: center;
    background-color: var(--top-content-background);
    color: var(--top-content-text);
    display: flex;
    justify-content: center;
    padding-top: 32px;
    width: 100%;
  }

  img {
    box-shadow: 3px 3px 5px 0 rgb(20, 20, 20);
    display: block;
    height: 280px;
    transform: rotate(5deg) translateY(-35px);
    transform-origin: top left;
  }

  .pastor-info {
    margin-right: 64px;
    width: 500px;
  }

  .history-wrapper {
    background-color: var(--second-content-background);
    color: var(--alternate-background-text);
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .history {
    h2 {
      font-weight: normal;
    }

    margin-top: 32px;
    align-self: center;
    width: 60%;
  }
`;

const AboutUsPage = () => {
  return (
    <StyledAboutUspage>
      <div className="pastor-info-and-picture">
        <div className="pastor-info">
          <h2>About the Pastor</h2>
          <p>
            After serving Mount Prospect for nine years, Dr. Yeargin was called
            to pastor the City Temple of Baltimore (Baptist) on September 10,
            1985. He began his pastorate in January 1986. Dr. Yeargin has
            brought a new dimension of spiritual nourishment and growth to City
            Temple through worship, study, and action. Under his direction
            several new ministries have been established in City Temple that
            include: the Shelter Ministry, the Dance Ministry, the New Members
            Counselors Ministry, the Christian Education Ministry, the Courtesy
            Guild, the Tape Ministry as well as the re-establishment of the
            Cultural and Fine Arts Ministry and the Building Ministry.
          </p>
          <p>
            Dr. Yeargin has been socially involved in the life of the community
            through his participation in Baltimoreans United in Leadership
            Development (B.U.I.L.D.) as well as serving for two years as a
            clergy co-chairperson, the Interdenominational Ministerial Alliance,
            the Institute for Christian and Jewish Studies, The United
            Missionary Baptist Convention of Maryland, and was the previous
            co-chairperson of the Baltimore affiliate of the National Black
            Leadership Commission on AIDS.
          </p>
          <p>
            Dr. Yeargin is married to Patricia Ann Yeargin and they share two
            daughters, Adia Joy and Candace. He also continues to maintain his
            sense of fatherhood to his beloved daughter, Kimberly Rei, who is
            deceased.
          </p>
        </div>
        <img src={yearginPicture} />
      </div>
      <div className="history-wrapper">
        <div className="history">
          <h2>It all began when…</h2>
          <p>
            the church was built in 1868 - 1871. It is the only structure in
            Baltimore designed by Thomas U. Walter, architect of the Dome and
            the House and Senate wings of the United States Capitol, and a
            founder of the American Institute of Architects.
          </p>
          <p>
            Declared one of the 13 landmark buildings in Baltimore City, the
            Temple’s majestic Gothic structure and its spire does much to add
            attractiveness and historic value to the neighborhood. As an
            integral part of the Baltimore City community, the Temple has
            provided an array of services through its Inner City Ministry
            program. The doors of the Temple were opened to the sorrowful;
            thousands of meals have been served to the hungry, clothing has been
            given to the needy, the homeless have been assisted in finding
            shelter, visitations have been made to hospitals and jails.
          </p>
          <p>The Impossible Dream (1970-1981)</p>
          <p>
            Reverend William W. Payne, led by the Holy Spirit on June 20, 1970,
            announced his intent to resign from a congregation of twenty-three
            years to inaugurate a ministry to show spiritual and social concern
            for the rejected and neglected of the Inner City. In this
            “Impossible Dream” Pastor Payne envisioned a ministry in which the
            hungry would be fed, the naked would be clothed, the homeless would
            be sheltered, and the alcoholics and the drug addicts would be
            served and loved.
          </p>
          <p>
            Several members of the former congregation expressed their desire to
            share this ministry of love and concern, and met with the pastor to
            pledge their support in the pursuit of this “Impossible Dream” in a
            meeting in the home of Pastor William Payne.
          </p>
          <p>
            A temporary place of worship was secured by Mrs. Elizabeth Logan,
            which became known as the Upper Room, at 745 W. Baltimore Street. At
            a meeting held on September 29, 1970, Pastor Payne suggested, and it
            was agreed, that the name of the congregation would be The City
            Temple of Baltimore (Baptist). The congregation suggested that the
            pastor would be the Reverend William W. Payne. It was also stated at
            this meeting that strong emphasis would be placed on Worship, Study,
            Soul Winning, Tithing and Giving Service to Those In Need. All
            members in this ministry were urged to enroll in Sunday School.
          </p>
        </div>
      </div>
    </StyledAboutUspage>
  );
};

export default AboutUsPage;
