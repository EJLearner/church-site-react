import communicationsImg from '../../assets/ce/images/workgroups/communications.png';
import discipleshipImg from '../../assets/ce/images/workgroups/discipleship.png';
import evangelismImg from '../../assets/ce/images/workgroups/evangelism.png';
import financeImg from '../../assets/ce/images/workgroups/finance.png';
import membershipImg from '../../assets/ce/images/workgroups/membership.png';
import worshipImg from '../../assets/ce/images/workgroups/worship.png';

const witness = 'To provide an effective witness  for Christ in this world.';

const workGroups = [
  {
    image: worshipImg,
    name: 'Worship',
    purpose: 'To introduce a contemporary worship experience.',
    outcomes: [
      'We encourage “unchurched” worshippers and young families (ages 18-45) to join.',
      'We promote a worship service that is inclusive of a younger audience outside of 5th Sundays.',
      'Sunday School has increased participation.',
      'Capital Campaigns end due to more people adding to the tithing pool.'
    ],
    goal: witness
  },
  {
    image: membershipImg,
    name: 'Membership',
    purpose: 'To show better care for the members of our church.',
    outcomes: [
      'We have a system for easily adding/updating/deleting church member profiles.',
      'We provide a better response to members suffering from grief & loss.',
      'We have increased awareness in order to take action when members are absent.',
      'Our church members feel missed and appreciated.'
    ],
    goal: witness
  },
  {
    image: communicationsImg,
    name: 'Public Relations/Communications',
    purpose: 'To put our church in the face of our community members.',
    outcomes: [
      'Activities/events held at our church receive widespread attention and draw larger crowds.',
      'Our church reaches a larger audience by leveraging social media.',
      'We have a more robust and interactive website.',
      'Members and non-members know what’s going on in the church.'
    ],
    goal: witness
  },
  {
    image: evangelismImg,
    name: 'Evangelism',
    purpose: 'To invest in and become an active part of our community.',
    outcomes: [
      'Increase church engagement in the community.',
      'Boost church attendance for “unchurched” youth and young adults.',
      'Provide a biblically-based response to needs in our community.',
      'Bring Christ out of the church and fellowship with non-church members.',
      'Encourage visitors to join the church.'
    ],
    goal: witness
  },
  {
    image: financeImg,
    name: 'Finance & Operations',
    purpose: 'To develop financial and operational plans for the church.',
    outcomes: [
      'Members have increased transparency of financial matters.',
      'We engage with financial experts to increase the church’s financial health.',
      'Church laymen have clear procedures for operating effectively in the church.',
      'The church relies 100% on tithing to support its financial needs.',
      'One process for everyone.'
    ],
    goal: witness
  },
  {
    image: discipleshipImg,
    name: 'Discipleship',
    purpose:
      'To develop individuals to become more like Christ through training and mentoring.',
    outcomes: [
      'Future church members emulate the character of Christ.',
      'Individuals unfamiliar with church receive friendship and guidance.',
      'The principles of our faith pass to future generations.',
      'New church members stay engaged beyond New Members Training.'
    ],
    goal: 'To become a mature Christian fellowship.'
  }
];

const workGroupData = {
  getAll: () => {
    return workGroups;
  },

  getWorkGroupNames: () => {
    return workGroups.map(group => group.name);
  }
};

export default workGroupData;
