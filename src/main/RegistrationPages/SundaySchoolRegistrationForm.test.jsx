import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {push} from 'firebase/database';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import pushToSubscribedList from '../../utils/pushToSubscribedList';

import SundaySchoolRegistrationForm from './SundaySchoolRegistrationForm';
import {getSchoolYear} from './sundaySchoolRegistration';

vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  push: vi.fn(),
  ref: vi.fn((database, path) => ({path})),
}));
vi.mock('../../utils/pushToSubscribedList', () => ({default: vi.fn()}));

const initialValues = {
  childName: {first: 'Ada', last: 'Lovelace'},
  childDateOfBirth: '2015-03-01',
  parentName: {first: 'Anne', last: 'Lovelace'},
  parentEmail: 'anne@example.com',
  parentPhone: '4105550000',
  address: {
    streetLine1: '1 Main St',
    streetLine2: '',
    city: 'Baltimore',
    state: 'MD',
    zip: '21201',
  },
  allergies: 'yes',
  allergyDetails: 'Peanuts',
  subscribe: true,
};
const legacySources = [{table: 'ccRegisteredChildren', year: '2019', id: 'a'}];

const submit = () =>
  fireEvent.click(screen.getByRole('button', {name: 'Submit'}));

describe('SundaySchoolRegistrationForm', () => {
  beforeEach(() => {
    push.mockReset();
    pushToSubscribedList.mockReset();
  });

  it('shows pre-filled values', () => {
    render(
      <SundaySchoolRegistrationForm
        initialValues={initialValues}
        onSubmitted={vi.fn()}
      />,
    );

    expect(screen.getByDisplayValue('Ada')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2015-03-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1 Main St')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Peanuts')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', {name: /mailing list/})).toBeChecked();
  });

  it('saves to the current school year and subscribes the parent', async () => {
    push.mockResolvedValue({});
    const onSubmitted = vi.fn();
    render(
      <SundaySchoolRegistrationForm
        initialValues={initialValues}
        legacySources={legacySources}
        onSubmitted={onSubmitted}
      />,
    );

    fireEvent.change(screen.getByDisplayValue('Baltimore'), {
      target: {value: 'Towson'},
    });
    submit();

    await waitFor(() => expect(onSubmitted).toHaveBeenCalled());
    const [[databaseRef, record]] = push.mock.calls;
    expect(databaseRef.path).toBe(
      `sundaySchoolRegistrations/${getSchoolYear(new Date())}`,
    );
    expect(record).toMatchObject({
      address: {city: 'Towson'},
      agreementCheckList: [],
      childName: {first: 'Ada', last: 'Lovelace'},
      legacySources,
      source: 'legacy',
      subscribe: true,
    });
    expect(pushToSubscribedList).toHaveBeenCalledWith(
      'anne@example.com',
      'Sunday School Registration',
      'Anne Lovelace',
    );
  });

  it('saves a blank form as a new registration without subscribing', async () => {
    push.mockResolvedValue({});
    const onSubmitted = vi.fn();
    render(<SundaySchoolRegistrationForm onSubmitted={onSubmitted} />);

    submit();

    await waitFor(() => expect(onSubmitted).toHaveBeenCalled());
    expect(push.mock.calls[0][1]).toMatchObject({source: 'new'});
    expect(pushToSubscribedList).not.toHaveBeenCalled();
  });

  it('saves only once when Submit is clicked twice', async () => {
    push.mockResolvedValue({});
    const onSubmitted = vi.fn();
    render(<SundaySchoolRegistrationForm onSubmitted={onSubmitted} />);

    submit();
    submit();

    await waitFor(() => expect(onSubmitted).toHaveBeenCalled());
    expect(push).toHaveBeenCalledTimes(1);
  });

  it('shows an error and allows retrying when the save fails', async () => {
    push.mockRejectedValueOnce({code: 'PERMISSION_DENIED', message: 'denied'});
    push.mockResolvedValueOnce({});
    const onSubmitted = vi.fn();
    render(<SundaySchoolRegistrationForm onSubmitted={onSubmitted} />);

    submit();

    expect(await screen.findByText(/PERMISSION_DENIED/)).toBeInTheDocument();
    expect(onSubmitted).not.toHaveBeenCalled();

    submit();

    await waitFor(() => expect(onSubmitted).toHaveBeenCalled());
  });
});
