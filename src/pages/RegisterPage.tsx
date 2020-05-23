import React from 'react';
import {RouteComponentProps} from 'react-router-dom';

import axios from 'axios';
import {useState} from 'react';

const host = process.env.REACT_APP_API_HOST;
let email = '',
  password = '',
  confirmPassword = '',
  name = '';

interface StateInterface {
  error: boolean;
  message: string;
}

function RegisterPage(props: RouteComponentProps) {
  const [data, updateData] = useState<StateInterface>({
    error: false,
    message: '',
  });

  async function onRegister() {
    name = name.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      return updateData({error: true, message: 'Fill all required fields.'});
    }

    if (password !== confirmPassword) {
      return updateData({error: true, message: "Passwords don't match."});
    }

    try {
      await axios.post(`${host}/auth/register`, {
        name,
        email,
        password,
        confirmPassword,
      });
      props.history.push('/login');
    } catch (e) {
      updateData({error: true, message: e.response.data.error});
    }
  }

  return (
    <div>
      <h1>Register Page</h1>

      {data.error && data.message}

      <div className='form-group'>
        <label htmlFor='name'>Name:</label>
        <input
          type='name'
          id='name'
          onChange={(e) => (name = e.target.value)}
        />
      </div>
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
        <label htmlFor='confirm-password'>Password:</label>
        <input
          type='password'
          id='confirm-password'
          onChange={(e) => (confirmPassword = e.target.value)}
        />
      </div>
      <div className='form-group'>
        <button onClick={onRegister}>Register</button>
      </div>
    </div>
  );
}

export default RegisterPage;
