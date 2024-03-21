import {shallow} from 'enzyme';

import VbsRegistrationLanding from './VbsRegistrationLanding';

describe('VbsRegistrationLanding', () => {
  it('renders without error', () => {
    expect(() => shallow(<VbsRegistrationLanding />)).not.toThrow();
  });
});
