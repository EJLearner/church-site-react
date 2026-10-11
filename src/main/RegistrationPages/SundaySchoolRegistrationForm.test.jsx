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
  emergencyContactName: {first: 'Mary', last: 'Somerville'},
  emergencyContactRelationship: 'Aunt',
  emergencyPhone: '4105551111',
  allergies: 'yes',
  allergyDetails: 'Peanuts',
  agreementCheckList: new Set(['parentGuardian', 'emergencyCare']),
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
      agreementCheckList: ['parentGuardian', 'emergencyCare'],
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

  it('does not save a blank form and lists what is missing', () => {
    render(<SundaySchoolRegistrationForm onSubmitted={vi.fn()} />);

    submit();

    const summary = screen.getByRole('alert');
    expect(summary).toHaveTextContent("Child's first name is required");
    expect(summary).toHaveTextContent("Child's date of birth is required");
    expect(summary).toHaveTextContent(
      'Parent/guardian phone number is required',
    );
    expect(summary).toHaveTextContent(
      'Please say whether your child has allergies',
    );
    expect(summary).toHaveTextContent(
      'Emergency contact relationship is required',
    );
    expect(summary).toHaveTextContent('Please check every agreement statement');
    expect(document.activeElement).toBe(
      document.getElementById('childName-first'),
    );
    expect(push).not.toHaveBeenCalled();
  });

  it('shows an error when leaving an invalid field', () => {
    render(<SundaySchoolRegistrationForm onSubmitted={vi.fn()} />);
    const phone = screen.getByLabelText(/Child's Phone Number/);

    fireEvent.change(phone, {target: {value: '410-555'}});
    fireEvent.blur(phone);

    expect(phone).toHaveAttribute('aria-invalid', 'true');
    expect(
      screen.getByText("Child's phone number must have 10 digits"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/first name is required/),
    ).not.toBeInTheDocument();
  });

  it('only shows allergy details when the child has allergies', () => {
    render(<SundaySchoolRegistrationForm onSubmitted={vi.fn()} />);

    expect(screen.queryByLabelText(/allergy details/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('radio', {name: 'Yes'}));

    expect(screen.getByLabelText(/allergy details/)).toBeInTheDocument();
  });

  it('saves phone numbers as digits only', async () => {
    push.mockResolvedValue({});
    const onSubmitted = vi.fn();
    render(
      <SundaySchoolRegistrationForm
        initialValues={{...initialValues, parentPhone: ' (410) 555-0000 '}}
        onSubmitted={onSubmitted}
      />,
    );

    submit();

    await waitFor(() => expect(onSubmitted).toHaveBeenCalled());
    expect(push.mock.calls[0][1]).toMatchObject({
      parentPhone: '4105550000',
      source: 'new',
    });
    expect(pushToSubscribedList).toHaveBeenCalled();
  });

  it('saves only once when Submit is clicked twice', async () => {
    push.mockResolvedValue({});
    const onSubmitted = vi.fn();
    render(
      <SundaySchoolRegistrationForm
        initialValues={initialValues}
        onSubmitted={onSubmitted}
      />,
    );

    submit();
    submit();

    await waitFor(() => expect(onSubmitted).toHaveBeenCalled());
    expect(push).toHaveBeenCalledTimes(1);
  });

  it('shows an error and allows retrying when the save fails', async () => {
    push.mockRejectedValueOnce({code: 'PERMISSION_DENIED', message: 'denied'});
    push.mockResolvedValueOnce({});
    const onSubmitted = vi.fn();
    render(
      <SundaySchoolRegistrationForm
        initialValues={initialValues}
        onSubmitted={onSubmitted}
      />,
    );

    submit();

    expect(await screen.findByText(/PERMISSION_DENIED/)).toBeInTheDocument();
    expect(onSubmitted).not.toHaveBeenCalled();

    submit();

    await waitFor(() => expect(onSubmitted).toHaveBeenCalled());
  });
});
