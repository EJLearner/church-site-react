import React, {Component} from 'react';

import workGroupData from '../../utils/visionWorkgroupData';

import WorkGroupInfo from './WorkGroupInfo';

class Workgroups extends Component {
  _renderWorkGroupInfos() {
    return workGroupData.getAll().map((workGroup, index) => {
      const {goal, image, name, outcomes, purpose} = workGroup;

      return (
        <WorkGroupInfo
          goal={goal}
          image={image}
          key={index}
          name={name}
          outcomes={outcomes}
          purpose={purpose}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Workgroups</h2>
        {this._renderWorkGroupInfos()}
      </div>
    );
  }
}

export default Workgroups;
