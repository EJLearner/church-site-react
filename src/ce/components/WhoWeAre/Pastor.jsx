import React, {Component} from 'react';

import yearginImage from '../../../assets/ce/images/yearginbio.jpg';
import ContactLine from '../Reusable/ContactLine';


class Pastor extends Component {
  render() {
    return (
      <div>
        <img
          alt="Pastor Yeargin"
          className="float-left-image"
          src={yearginImage}
        />
        <h2 className="yeargin-name">Rev. Dr. Grady A. Yeargin, Jr.</h2>
        <div className="h2-sub">Pastor</div>
        <ContactLine address={ContactLine.ADDRESSES.YEARGIN} />
        <p>
          The Rev. Dr. Grady Andrew Yeargin, Jr. was born on November 7, 1949 in
          Greenville, South Carolina. He attended Sterling High School and was
          admitted to Morehouse College in 1966 on an early admission
          scholarship. In 1970, he graduated from Morehouse with a B.A. Degree
          in Philosophy and Religion, he graduated from Colgate-Rochester
          Divinity School with a Master of Divinity Degree in 1973, and he
          graduated from Wesley Theological Seminary in 2005 with a Doctor of
          Ministry Degree.
        </p>
        <p>
          Dr. Yeargin began his ministerial career in 1973 as the Associate
          Minister of the Mount Zion Baptist Church in Newark, NJ under the
          pastorate of the Rev. Dr. Granville A. Seward. Along with his
          responsibilities in the areas of Youth Ministry, Christian Education
          and Neighborhood Ministry, Dr. Yeargin was also responsible for
          assuming the pastoral responsibilities in the absence of the Pastor.
        </p>
        <p>
          During his tenure at Mount Zion, Dr. Yeargin served as a board member
          of the Campus Christian Foundation, the Youth Council of the American
          Baptist Churches of New Jersey and of the Metropolitan Ecumenical
          Ministries Committee on Neighborhood and Youth Ministry.
        </p>
        <p>
          In 1976, Dr. Yeargin was called to pastor the Mount Prospect Church in
          Rock Hill, South Carolina. Along with providing a new dimension in the
          area of teaching ministry in the church and in the local Bible
          College, Dr. Yeargin held positions in both the local and state
          conventions along with serving on several civic committees.
        </p>
        <p>
          After serving Mount Prospect for nine years, Dr. Yeargin was called to
          pastor the City Temple of Baltimore (Baptist) on September 10, 1985.
          He began his pastorate in January 1986. Dr. Yeargin has brought a new
          dimension of spiritual nourishment and growth to City Temple through
          worship, study, and action. Under his direction several new ministries
          have been established in City Temple that include: the Shelter
          Ministry, the Dance Ministry, the New Members Counselors Ministry, the
          Christian Education Ministry, the Courtesy Guild, the Tape Ministry as
          well as the re-establishment of the Cultural and Fine Arts Ministry
          and the Building Ministry.
        </p>
        <p>
          Dr. Yeargin has been socially involved in the life of the community
          through his participation in Baltimoreans United in Leadership
          Development (B.U.I.L.D.) as well as serving for two years as a clergy
          co-chairperson, the Interdenominational Ministerial Alliance, the
          Institute for Christian and Jewish Studies, The United Missionary
          Baptist Convention of Maryland, and was the previous co-chairperson of
          the Baltimore affiliate of the National Black Leadership Commission on
          AIDS.
        </p>
        <p>
          Dr. Yeargin is married to Patricia Ann Yeargin and they share two
          daughters, Adia Joy and Candace. He also continues to maintain his
          sense of fatherhood to his beloved daughter, Kimberly Rei, who is
          deceased.
        </p>
      </div>
    );
  }
}

export default Pastor;
