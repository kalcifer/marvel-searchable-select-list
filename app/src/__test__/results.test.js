import React from 'react';
import { shallow } from 'enzyme';
import Results from '../results';
import modifiedResponse from '../../__mocks__/modified_response';

it('renders without crashing', () => {
  shallow(<Results />);
});

it('contains ul with empty props', () => {
  const wrapper = shallow(<Results />);
  expect(wrapper.find('ul').length).toEqual(1);
  expect(wrapper.contains(<li />)).toEqual(false);
});

it('contains results when query is present', () => {
  const wrapper = shallow(
    <Results data={modifiedResponse} query={'wolverine'} />
  );
  expect(wrapper.find('ul').length).toEqual(1);
  expect(wrapper.find('li.list').length).toEqual(modifiedResponse.length);
  expect(
    wrapper
      .find('li.list')
      .first()
      .find('h3').length
  ).toEqual(1);
  expect(
    wrapper
      .find('li.list')
      .first()
      .find('h3.no-description').length
  ).toEqual(0);
  expect(
    wrapper
      .find('li.list')
      .first()
      .find('p.description').length
  ).toEqual(1);

  expect(
    wrapper
      .find('li.list')
      .last()
      .find('h3.no-description').length
  ).toEqual(1);
  expect(
    wrapper
      .find('li.list')
      .last()
      .find('p.description').length
  ).toEqual(0);
});

it('contains results with no description when query is present & isMobile is true', () => {
  const wrapper = shallow(
    <Results data={modifiedResponse} query={'wolverine'} isMobile={true} />
  );

  expect(
    wrapper
      .find('li.list')
      .first()
      .find('h3.no-description').length
  ).toEqual(1);
  expect(
    wrapper
      .find('li.list')
      .first()
      .find('p.description').length
  ).toEqual(0);
});

it('displays no-results when query is present & data is empty array', () => {
  const wrapper = shallow(<Results query={'wolverine'} />);
  expect(wrapper.find('ul').length).toEqual(1);
  expect(wrapper.find('li.list.empty').length).toEqual(1);
});

it('clicking on list calls handleResultsClick', () => {
  const handleResultsClick = jest.fn();
  const wrapper = shallow(
    <Results
      data={modifiedResponse}
      query={'wolverine'}
      handleResultsClick={handleResultsClick}
    />
  );
  wrapper
    .find('ul li.list')
    .first()
    .simulate('click');
  expect(handleResultsClick.mock.calls.length).toBe(1);
  expect(handleResultsClick.mock.calls[0][0]).toBe('Wolf Cub');
});
