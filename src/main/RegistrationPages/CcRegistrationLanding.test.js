import {shallow} from 'enzyme';

import CcRegistrationLanding from './CcRegistrationLanding';

describe('CcRegistrationLanding', () => {
  it('renders without error', () => {
    expect(() => shallow(<CcRegistrationLanding />)).not.toThrow();
  });
});
