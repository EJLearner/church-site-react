import {vi} from 'vitest';

vi.mock('html-to-react', () => {
  return {
    HtmlToReactParser: vi.fn(),
  };
});
