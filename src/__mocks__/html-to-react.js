// eslint-disable-next-line no-unused-vars
import {Parser as HtmlToReactParser} from 'html-to-react';

// eslint-disable-next-line no-undef
jest.mock('html-to-react', () => {
  return {
    // eslint-disable-next-line no-undef
    HtmlToReactParser: jest.fn()
  };
});
