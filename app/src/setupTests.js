// requestAnimationFrame shim
import 'raf/polyfill';
// enzyme setup with react16
// read more here: http://airbnb.io/enzyme/docs/installation/index.html#working-with-react-16
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
