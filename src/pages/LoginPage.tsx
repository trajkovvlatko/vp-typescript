import React from 'react';
import {RouteComponentProps} from 'react-router-dom';

import axios from 'axios';
import {useState, useContext} from 'react';
import UserContext from 'contexts/UserContext';

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
    <div>
      <h1>Login Page</h1>

      {data.error && <div className='error-message'>{data.message}</div>}

      <div className='form-group'>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          onChange={(e) => (email = e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          onChange={(e) => (password = e.target.value)}
        />
      </div>
      <div className='form-group'>
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
