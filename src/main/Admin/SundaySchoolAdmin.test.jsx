import {fireEvent, render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import authFetch from '../../utils/adminApi';

import SundaySchoolAdmin from './SundaySchoolAdmin';

vi.mock('../../utils/adminApi', () => ({default: vi.fn()}));

const createEntry = (id, childName, parentNames) => ({
  id,
  lastRegistered: '2019',
  parentNames,
  sources: [{}, {}],
  values: {
    childName,
    childDateOfBirth: '2015-03-01',
    parentEmail: 'parent@example.com',
    parentPhone: '4105550000',
  },
});

const entries = [
  createEntry('one', {first: 'Ada', last: 'Lovelace'}, [
    'Anne Lovelace',
    'William Lovelace',
  ]),
  createEntry('two', {first: 'Grace', last: 'Hopper'}, ['Mary Hopper']),
];

const respondWith = (body, ok = true) =>
  authFetch.mockResolvedValueOnce({ok, json: async () => body});

const search = (text) =>
  fireEvent.change(screen.getByRole('textbox'), {target: {value: text}});

describe('SundaySchoolAdmin', () => {
  beforeEach(() => {
    authFetch.mockReset();
  });

  it('lists all past registrations on load', async () => {
    respondWith(entries);

    render(<SundaySchoolAdmin />);

    expect(await screen.findByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
    expect(
      screen.getByText('Anne Lovelace, William Lovelace'),
    ).toBeInTheDocument();
    expect(authFetch).toHaveBeenCalledWith('/api/legacy-registrations');
  });

  it('filters by child or parent name as the search text changes', async () => {
    respondWith(entries);

    render(<SundaySchoolAdmin />);
    await screen.findByText('Ada Lovelace');

    search('HOPPER');
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();

    search('william');
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.queryByText('Grace Hopper')).not.toBeInTheDocument();

    search('ada hopper');
    expect(screen.getByText('No matches found.')).toBeInTheDocument();

    expect(authFetch).toHaveBeenCalledTimes(1);
  });

  it('shows the server error message', async () => {
    respondWith({error: 'Forbidden'}, false);

    render(<SundaySchoolAdmin />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Forbidden');
  });
});
