import React from 'react';
import { shallow } from 'enzyme';
import App from '../app';
import modifiedResponse from '../../__mocks__/modified_response';

it('renders without crashing', () => {
  shallow(<App />);
});

it('check elements', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('header.header img').length).toEqual(1);
  expect(wrapper.find('header.header').find('Select').length).toEqual(1);
});

it('check elements for Mobile', () => {
  const width = global.innerWidth;
  global.innerWidth = 400;
  const wrapper = shallow(<App />);
  expect(wrapper.find('header.header img').length).toEqual(1);
  expect(wrapper.find('header.header').find('Select').length).toEqual(0);
  expect(wrapper.find('Select').length).toEqual(1);
  global.innerWidth = width;
});

it('handles handleChange', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.instance().state.value).toEqual('');
  wrapper
    .instance()
    .handleChange({ target: { value: 'wolverine' }, persist: () => {} });
  expect(wrapper.instance().state.value).toEqual('wolverine');
});

it('handles handleResultsClick', () => {
  const log = console.log;
  const wrapper = shallow(<App />);
  expect(wrapper.instance().state.value).toEqual('');
  console['log'] = jest.fn();
  wrapper.instance().handleResultsClick('Wolf Cub');

  expect(console.log.mock.calls.length).toBe(1);
  expect(console.log.mock.calls[0][0]).toBe('Wolf Cub');
  console.log = log;
});

it('changes width value on resize', () => {
  const width = global.innerWidth;
  const wrapper = shallow(<App />);
  expect(wrapper.instance().state.width).toEqual(width);
  global.innerWidth = 400;
  global.dispatchEvent(new Event('resize'));
  // adding setTimeout because handling is debounced
  setTimeout(() => {
    expect(wrapper.instance().state.width).toEqual(400);
  }, 0);
  global.innerWidth = width;
});
