import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import axios from 'axios';
import {useState} from 'react';

import '../styles/Auth.scss';

const host = process.env.REACT_APP_API_HOST;
let email = '',
  password = '',
  confirmPassword = '',
  name = '';

interface StateInterface {
  error: boolean;
  message: string;
}

function RegisterPage() {
  const history = useHistory();
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
      history.push('/login');
    } catch (e) {
      updateData({error: true, message: e.response.data.error});
    }
  }

  return (
    <div className='register-page'>
      <div className='row center'>
        <div className='col-4 with-background sidebar'>
          <h2>Already registered?</h2>

          <p>Login to your account to continue using VP</p>

          <NavLink className='nav-link primary' to='/login'>
            Login
          </NavLink>
        </div>

        <div className='col-8 content'>
          <h2>Register to VP</h2>
          <p className='form-group'>
            Create an account for your performer or venue
          </p>

          {data.error && data.message}

          <div className='form-groups col-6 center'>
            <div className='form-group'>
              <input
                type='text'
                id='name'
                onChange={(e) => (name = e.target.value)}
                placeholder='Name'
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                id='email'
                onChange={(e) => (email = e.target.value)}
                placeholder='Email'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                id='password'
                onChange={(e) => (password = e.target.value)}
                placeholder='Password'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                id='confirm-password'
                onChange={(e) => (confirmPassword = e.target.value)}
                placeholder='Confirm password'
              />
            </div>
          </div>
          <div className='form-group'>
            <button onClick={onRegister} className='nav-link primary'>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
