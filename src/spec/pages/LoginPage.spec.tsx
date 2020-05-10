import React from 'react';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter as Router} from 'react-router-dom';
import {act} from 'react-dom/test-utils';

const host = process.env.REACT_APP_API_HOST;

import axios from 'axios';
jest.mock('axios');

import LoginPage from '../../pages/LoginPage';
import UserContext from 'contexts/UserContext';
import {doesNotReject} from 'assert';
configure({adapter: new Adapter()});

const props = {history: {push: () => {}}};

it('renders login form', () => {
  const container = shallow(<LoginPage {...props} />);
  expect(container.find('h1')).toHaveLength(1);
  expect(container.find('#email')).toHaveLength(1);
  expect(container.find('#password')).toHaveLength(1);
  expect(container.find('button')).toHaveLength(1);
});

describe('when a submit button is clicked', () => {
  it('shows an error message if email and password are empty', () => {
    const container = shallow(<LoginPage {...props} />);
    const button = container.find('button').first();
    button.simulate('click');
    expect(container.find('.error-message').text()).toEqual(
      'Fill email and password first.'
    );
  });

  it("doesn't show an error if email and password are set", () => {
    const data = {data: {token: '1234'}};
    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    const container = shallow(<LoginPage {...props} />);

    const email = container.find('#email');
    email.simulate('change', {target: {value: 'email'}});

    const password = container.find('#password');
    password.simulate('change', {target: {value: 'password'}});

    const button = container.find('button').first();
    button.simulate('click');

    expect(container.find('.error-message').length).toEqual(0);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${host}/auth/login`, {
      email: 'email',
      password: 'password',
    });
  });

  it('sets user context', () =>
    new Promise((done) => {
      const ajaxResponse = {data: {token: '1234'}};
      axios.post.mockImplementationOnce(() => Promise.resolve(ajaxResponse));

      const user = {};
      const setUser = (newContext) => {
        expect(newContext).toEqual(newContext);
        done();
      };
      const WithUserContext = () => (
        <Router>
          <UserContext.Provider value={{user, setUser}}>
            <LoginPage {...props} />
          </UserContext.Provider>
        </Router>
      );

      const withUserContext = mount(<WithUserContext />);
      const container = withUserContext.find(LoginPage);

      const email = container.find('#email');
      email.simulate('change', {target: {value: 'email'}});

      const password = container.find('#password');
      password.simulate('change', {target: {value: 'password'}});

      const button = container.find('button').first();
      button.simulate('click');
    }));
});
