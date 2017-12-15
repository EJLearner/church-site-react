// TODO: Remove this `requestAnimationFrame` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import requestAnimationFrame from './tempPolyfills';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

configure({adapter: new Adapter()});
