import React from 'react';
import {shallow} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';

import routePaths from './routePaths';
import Routes from './Routes';
import VbsCheckin from './ce/components/CcVbsCheckinOut/VbsCheckin';

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
