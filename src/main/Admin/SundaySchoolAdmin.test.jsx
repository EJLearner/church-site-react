import {fireEvent, render, screen} from '@testing-library/react';
import {push} from 'firebase/database';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import authFetch from '../../utils/adminApi';

import SundaySchoolAdmin from './SundaySchoolAdmin';

vi.mock('../../utils/adminApi', () => ({default: vi.fn()}));
vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  push: vi.fn(() => Promise.resolve({})),
  ref: vi.fn((database, path) => ({path})),
}));
vi.mock('../../utils/pushToSubscribedList', () => ({default: vi.fn()}));

const createEntry = (id, childName, parentNames) => ({
  id,
  lastRegistered: '2019',
  parentNames,
  sources: [{table: 'ccRegisteredChildren', year: '2019', id}],
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

const clickButton = (name) =>
  fireEvent.click(screen.getByRole('button', {name}));

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

  it('shows Loading until the list arrives', async () => {
    respondWith(entries);

    render(<SundaySchoolAdmin />);

    expect(screen.getByText('Loading…')).toBeInTheDocument();
    expect(await screen.findByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.queryByText('Loading…')).not.toBeInTheDocument();
  });

  it('shows the server error message', async () => {
    respondWith({error: 'Forbidden'}, false);

    render(<SundaySchoolAdmin />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Forbidden');
  });

  it('hands a pre-filled form to the parent and returns for the next family', async () => {
    respondWith(entries);

    render(<SundaySchoolAdmin />);
    await screen.findByText('Ada Lovelace');

    search('ada');
    clickButton('Verify and Register');

    expect(screen.getByText(/from a past registration/)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ada')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();

    clickButton('Submit');

    expect(await screen.findByText('Thank you!')).toBeInTheDocument();
    expect(push.mock.calls.at(-1)[1]).toMatchObject({
      legacySources: [{table: 'ccRegisteredChildren', year: '2019', id: 'one'}],
      source: 'legacy',
    });

    clickButton('Next family');

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
    expect(authFetch).toHaveBeenCalledTimes(1);
  });

  it('starts a blank form for a new registration and can cancel', async () => {
    respondWith(entries);

    render(<SundaySchoolAdmin />);
    await screen.findByText('Ada Lovelace');

    clickButton('New registration');

    expect(screen.getByText(/Please fill in/)).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Ada')).not.toBeInTheDocument();

    clickButton('Cancel and return to search');

    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
  });

  it('turns kiosk mode on during hand-over and off for the next family', async () => {
    respondWith(entries);
    const onKioskModeChange = vi.fn();

    render(<SundaySchoolAdmin onKioskModeChange={onKioskModeChange} />);
    await screen.findByText('Ada Lovelace');

    clickButton('New registration');
    expect(onKioskModeChange).toHaveBeenLastCalledWith(true);

    clickButton('Submit');
    await screen.findByText('Thank you!');
    expect(onKioskModeChange).toHaveBeenLastCalledWith(true);

    clickButton('Next family');
    expect(onKioskModeChange).toHaveBeenLastCalledWith(false);
  });

  it('turns kiosk mode off when the page is left mid hand-over', async () => {
    respondWith(entries);
    const onKioskModeChange = vi.fn();

    const {unmount} = render(
      <SundaySchoolAdmin onKioskModeChange={onKioskModeChange} />,
    );
    await screen.findByText('Ada Lovelace');
    clickButton('New registration');

    unmount();

    expect(onKioskModeChange).toHaveBeenLastCalledWith(false);
  });
});
