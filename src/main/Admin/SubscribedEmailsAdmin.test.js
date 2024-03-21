import {shallow} from 'enzyme';

import SubscribedEmailsAdmin from './SubscribedEmailsAdmin';

describe('', () => {
  it('render', () => {
    const wrapper = shallow(<SubscribedEmailsAdmin />);

    expect(wrapper.exists()).toBe(true);
  });
});
