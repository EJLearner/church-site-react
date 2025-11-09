import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';

import Menubar from './Menubar';

describe('MainHome', () => {
  it('renders', () => {
    expect(() =>
      render(
        <MemoryRouter>
          <Menubar basePath="/" menuItems={[{text: 'Home', path: 'home'}]} />
        </MemoryRouter>,
      ),
    ).not.toThrow();
  });
});
