// eslint-disable-next-line no-unused-vars
import {Parser as HtmlToReactParser} from 'html-to-react';

 
jest.mock('html-to-react', () => {
  return {
     
    HtmlToReactParser: jest.fn(),
  };
});
