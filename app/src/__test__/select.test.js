import React from 'react';
import { shallow } from 'enzyme';
import Select from '../select';
import loading from '../spinning-bubbles.svg';

it('renders without crashing', () => {
  shallow(<Select />);
});

it('renders children', () => {
  const wrapper = shallow(
    <Select>
      <ul />
    </Select>
  );
  expect(wrapper.contains(<ul />)).toEqual(true);
});

it('renders loading icon when isLoading is true', () => {
  const wrapper = shallow(<Select isLoading={true} />);
  expect(
    wrapper.contains(
      <img className="loading" src={loading} alt="Loading icon" />
    )
  ).toEqual(true);
});

it('calls handleChange when input is changed', () => {
  const handleChange = jest.fn();
  const changeEvt = { target: { value: 'wolverine' } };
  const wrapper = shallow(<Select handleChange={handleChange} />);
  wrapper
    .find('div.search input')
    .first()
    .simulate('change', changeEvt);
  expect(handleChange.mock.calls.length).toBe(1);
  expect(handleChange.mock.calls[0][0]).toBe(changeEvt);
});
