import {shallow} from 'enzyme';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';

import Routes from './Routes';
import VbsCheckin from './ce/components/CcVbsCheckinOut/VbsCheckin';
import routePaths from './routePaths';

describe('Routes', () => {
  it('loads correctly', () => {
    expect(() => shallow(<Routes />)).not.toThrow();
  });

  it('loads VbsCheckin correctly', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={[routePaths.CE_VBS_CHECKIN]}>
        <Routes />
      </MemoryRouter>
    );

    expect(wrapper.find(VbsCheckin).exists()).toBeTrue;
  });
});
