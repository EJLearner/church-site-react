// IMPROVEMENTS: Remove this `requestAnimationFrame` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import './tempPolyfills';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
};

Enzyme.configure({adapter: new Adapter()});
