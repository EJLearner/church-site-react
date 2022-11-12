import React, {Component} from 'react';

import routePaths from '../../../routePaths';
import utils from '../../../utils/commonUtils';
import constants from '../../../utils/constants';

import BaseCheckin from './BaseCheckin';


class VbsCheckin extends Component {
  render() {
    const year = utils.getVbsDbYear();
    const registeredChildrenRefName = `${constants.VBS_REGISTERED_CHILDREN_REF_NAME}/${year}`;

    return (
      <BaseCheckin
        logbookRefName={constants.VBS_LOGBOOK_REF_NAME}
        registerLink={routePaths.CE_VBS_REG_LANDING}
        registeredChildrenRefName={registeredChildrenRefName}
        registryAccessRefName={constants.VBS_REGISTRY_ACCESS_REF_NAME}
        registryIdName={constants.VBS_REGISTERED_CHILD_ID_PROP}
        welcomeName="Vacation Bible School"
      />
    );
  }
}

export default VbsCheckin;
