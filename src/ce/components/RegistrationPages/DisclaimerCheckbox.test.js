import DisclaimerCheckbox from './DisclaimerCheckbox';
import React from 'react';
import {shallow} from 'enzyme';

describe('DisclaimerCheckbox', () => {
  let props;

  beforeEach(() => {
    props = {
      checked: false,
      id: 'test-disclaimer-checkbox',
      onChange: jest.fn()
    };
  });

  it('renders a checkbox', () => {
    const disclaimerCheckbox = shallow(<DisclaimerCheckbox {...props} />);
    expect(disclaimerCheckbox.find('Checkbox').exists()).toBeTrue;
  });

  it('checkbox has correct props', () => {
    const disclaimerCheckbox = shallow(<DisclaimerCheckbox {...props} />);
    expect(disclaimerCheckbox.props().checked).toEqual(props.checked);
    expect(disclaimerCheckbox.props().id).toEqual(props.id);
    expect(disclaimerCheckbox.props().label).toBeDefined();
  });

  it('calls onChange prop function on change', () => {
    const disclaimerCheckbox = shallow(<DisclaimerCheckbox {...props} />);
    const testEvent = {};

    disclaimerCheckbox.simulate('change', testEvent);

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith(testEvent);
  });
});
