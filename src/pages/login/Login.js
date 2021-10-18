import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';

import './Login.scss';

import signIn from '../../services/firebase/signIn';

const Login = () => {

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  
  let history = useHistory();
  let { user } = useContext(UserContext);

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignIn = e => {
    e.preventDefault();
    const { email, password } = loginFormData;

    signIn(email, password, () => {
      history.replace('/');
    }, error => {
      console.log(`Error ${error.code} : ${error.message}`);
      alert('Email ou mot de passe incorrect');
    });
  };

  if (typeof user === 'object') return <Redirect to='/' />;

  return (
    <div className='container login'>
      <div className='login'>
        <h1>Login</h1>

        <div className='form-container'>
          <form onSubmit={handleSignIn}>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                name='email'
                type='email'
                required
                placeholder='user@example.com'
                value={loginFormData.email}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor='password'>Mot de passe</label>
              <input
                id='password'
                name='password'
                type='password'
                required
                placeholder='Mot de passe'
                value={loginFormData.password}
                onChange={handleChange} />
            </div>
            <button className='btn btn-primary'>Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
