import React, {Component} from 'react';
import WorkGroupInfo from './WorkGroupInfo';
import workGroupData from '../../utils/visionWorkgroupData';

class Workgroups extends Component {
  _renderWorkGroupInfos() {
    return workGroupData.getAll().map((workGroup, index) => {
      return (
        <WorkGroupInfo
          goal={workGroup.goal}
          key={index}
          name={workGroup.name}
          outcomes={workGroup.outcomes}
          purpose={workGroup.purpose}
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
