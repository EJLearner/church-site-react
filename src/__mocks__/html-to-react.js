// eslint-disable-next-line no-unused-vars
import {Parser as HtmlToReactParser} from 'html-to-react';
import {vi} from 'vitest';

vi.mock('html-to-react', () => {
  return {
    HtmlToReactParser: vi.fn(),
  };
});
