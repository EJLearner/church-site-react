import {render} from '@testing-library/react';
import moment from 'moment';
import {expect, it, describe} from 'vitest';

import App from './App';

describe(() => {
  it('sets updateLocal function for moment', () => {
    moment.updateLocale = jest.fn();
    render(<App />);

    expect(moment.updateLocale.mock.calls).toHaveLength(1);

    expect(moment.updateLocale.mock.calls[0][0]).toBe('en');

    const meridiemFunction = moment.updateLocale.mock.calls[0][1].meridiem;
    expect(meridiemFunction(5)).toBe('am');
    expect(meridiemFunction(12)).toBe('pm');
    expect(meridiemFunction(22)).toBe('pm');
  });
});
