import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {describe, it} from 'vitest';

import MainWrapper from './MainWrapper';

describe('MainWrapper', () => {
  it('renders', () => {
    render(<MainWrapper />, {wrapper: BrowserRouter});
  });
});
