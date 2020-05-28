import React from 'react';
import {RouteComponentProps, NavLink} from 'react-router-dom';

import axios from 'axios';
import {useState, useContext} from 'react';
import UserContext from 'contexts/UserContext';

import '../styles/pages/LoginPage.scss';

const host = process.env.REACT_APP_API_HOST;
let email = '',
  password = '';

interface StateInterface {
  error: boolean;
  message: string;
}

function LoginPage(props: RouteComponentProps) {
  const [data, updateData] = useState<StateInterface>({
    error: false,
    message: '',
  });
  const userContext = useContext(UserContext);
  const setUser = userContext.setUser;

  async function onLogin() {
    email = email.trim();
    password = password.trim();

    if (email === '' || password === '') {
      return updateData({
        error: true,
        message: 'Fill email and password first.',
      });
    }

    try {
      const response = await axios.post(`${host}/auth/login`, {
        email,
        password,
      });
      setUser(response.data);
      props.history.push('/');
    } catch (e) {
      let message = 'Error';
      if (e && e.response && e.response.data) {
        message = e.response.data.error;
      }
      updateData({error: true, message});
    }
  }

  return (
    <div className='login-page container'>
      <div className='row center'>
        <div className='col-8'>
          <h1>Welcome back!</h1>
          <p className='form-group'>Sign in to your account</p>

          {data.error && <div className='error-message'>{data.message}</div>}

          <div className='form-group col-8 center'>
            <input
              type='email'
              id='email'
              onChange={(e) => (email = e.target.value)}
              placeholder='Email'
            />
          </div>

          <div className='form-group col-8 center'>
            <input
              type='password'
              id='password'
              onChange={(e) => (password = e.target.value)}
              placeholder='Password'
            />
          </div>
          <div className='form-group row'>
            <div className='center'>
              <button onClick={onLogin} className='nav-link primary'>
                Login
              </button>
            </div>
          </div>
        </div>

        <div className='col-4 with-background right'>
          <h1>Join us</h1>
          <p>Not a member yet?</p>

          <p>
            Create an account to VP and find the best performer or a venue for
            tonight.
          </p>

          <NavLink className='nav-link primary' to='/register'>
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
