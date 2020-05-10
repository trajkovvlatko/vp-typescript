import React from 'react';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PromoList from '../../components/PromoList';

import {useFetch} from '../../hooks/useFetch';
configure({adapter: new Adapter()});
jest.mock('../../hooks/useFetch');

const host = process.env.REACT_APP_API_HOST;

it('renders loading info while still fetching', async () => {
  useFetch.mockReturnValue({
    error: false,
    loading: true,
    results: [],
  });

  const container = shallow(
    <PromoList title='Latest venues' type='venue' sorting='latest' />
  );
  const url = `${host}/venues?sorting=latest&limit=3`;
  expect(useFetch).toBeCalledWith(url);
  expect(container.text()).toEqual('Loading...');
});

it('renders error message if fetching failed', () => {
  useFetch.mockReturnValue({
    error: true,
    loading: false,
    results: [],
  });

  const container = shallow(
    <PromoList title='Latest venues' type='venue' sorting='latest' />
  );
  const url = `${host}/venues?sorting=latest&limit=3`;
  expect(useFetch).toBeCalledWith(url);
  expect(container.text()).toEqual('Error while fetching data.');
});

it('renders list of promo items and passes props', () => {
  const data = {
    error: false,
    loading: false,
    results: [
      {
        id: 1,
        name: 'Venue 1',
        rating: 5,
        type: 'venue',
        image: 'venues/1/selected-image-1.jpg',
      },
      {
        id: 2,
        name: 'Venue 2',
        rating: 4,
        type: 'venue',
        image: 'venues/2/selected-image-2.jpg',
      },
    ],
  };
  useFetch.mockReturnValue(data);

  const container = shallow(
    <PromoList title='Latest venues' type='venue' sorting='latest' />
  );
  const url = `${host}/venues?sorting=latest&limit=3`;
  expect(useFetch).toBeCalledWith(url);
  expect(container.find('h5').text()).toContain('Latest venues');
  expect(container.find('PromoItem')).toHaveLength(2);

  const firstChild = container.find('PromoItem').first();
  expect(firstChild.props()).toMatchObject({data: data.results[0]});

  const secondChild = container.find('PromoItem').last();
  expect(secondChild.props()).toMatchObject({data: data.results[1]});
});
