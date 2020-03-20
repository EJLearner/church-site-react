import SubscribedEmailsAdmin from './SubscribedEmailsAdmin';

import {shallow} from 'enzyme';
import React from 'react';

describe('', () => {
  it('render', () => {
    const wrapper = shallow(<SubscribedEmailsAdmin />);

    expect(wrapper.exists()).toBe(true);
  });
});
