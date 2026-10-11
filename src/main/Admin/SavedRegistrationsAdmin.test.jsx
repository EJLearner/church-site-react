import {act, fireEvent, render, screen} from '@testing-library/react';
import {onValue} from 'firebase/database';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {getSchoolYear} from '../RegistrationPages/sundaySchoolRegistration';

import SavedRegistrationsAdmin from './SavedRegistrationsAdmin';

vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  onValue: vi.fn(() => vi.fn()),
  ref: vi.fn((database, path) => ({path})),
}));

const currentYear = getSchoolYear(new Date());

const registrations = {
  [currentYear]: {
    one: {
      allergies: 'yes',
      allergyDetails: 'Peanuts',
      childDateOfBirth: '2016-07-04',
      childName: {first: 'Grace', last: 'Hopper'},
      emergencyContactName: {first: 'Walter', last: 'Hopper'},
      emergencyPhone: '4105551111',
      parentEmail: 'mary@example.com',
      parentName: {first: 'Mary', last: 'Hopper'},
      parentPhone: '4105550000',
      registerTime: '2026-09-13T15:00:00.000Z',
      source: 'new',
    },
    two: {
      allergies: 'no',
      childName: {first: 'Ada', last: 'Lovelace'},
      parentName: {first: 'Anne', last: 'Lovelace'},
      source: 'legacy',
    },
  },
  '2019-2020': {
    three: {childName: {first: 'Alan', last: 'Turing'}, source: 'new'},
  },
};

// Sends a Firebase snapshot (or error) to the page's onValue listener
const sendSnapshot = (value) =>
  act(() => onValue.mock.calls.at(-1)[1]({val: () => value}));
const sendError = (message) =>
  act(() => onValue.mock.calls.at(-1)[2]({message}));

describe('SavedRegistrationsAdmin', () => {
  beforeEach(() => {
    onValue.mockClear();
  });

  it('listens to the Sunday School registrations', () => {
    render(<SavedRegistrationsAdmin />);

    expect(screen.getByText('Loading…')).toBeInTheDocument();
    expect(onValue.mock.calls[0][0]).toEqual({
      path: 'sundaySchoolRegistrations',
    });
  });

  it("lists this school year's registrations sorted by child", () => {
    render(<SavedRegistrationsAdmin />);
    sendSnapshot(registrations);

    expect(screen.getByText('2 registered')).toBeInTheDocument();
    const rows = screen.getAllByRole('row').slice(1);
    expect(rows[0]).toHaveTextContent('Grace Hopper');
    expect(rows[0]).toHaveTextContent('Walter Hopper (4105551111)');
    expect(rows[0]).toHaveTextContent('Peanuts');
    expect(rows[0]).toHaveTextContent('New');
    expect(rows[1]).toHaveTextContent('Ada Lovelace');
    expect(rows[1]).toHaveTextContent('None');
    expect(rows[1]).toHaveTextContent('Returning');
    expect(screen.queryByText('Alan Turing')).not.toBeInTheDocument();
  });

  it('switches school years', () => {
    render(<SavedRegistrationsAdmin />);
    sendSnapshot(registrations);

    fireEvent.change(screen.getByRole('combobox'), {
      target: {value: '2019-2020'},
    });

    expect(screen.getByText('Alan Turing')).toBeInTheDocument();
    expect(screen.queryByText('Grace Hopper')).not.toBeInTheDocument();
  });

  it('shows the current school year even before anything is saved', () => {
    render(<SavedRegistrationsAdmin />);
    sendSnapshot(null);

    expect(screen.getByRole('combobox')).toHaveValue(currentYear);
    expect(screen.getByText('0 registered')).toBeInTheDocument();
  });

  it('shows a load error', () => {
    render(<SavedRegistrationsAdmin />);
    sendError('Permission denied');

    expect(screen.getByRole('alert')).toHaveTextContent('Permission denied');
  });
});
