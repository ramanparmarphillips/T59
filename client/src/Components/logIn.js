import React, { useState } from 'react';
import Todo from './Todo';


function LogIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });
      if (response.ok) {
        setLoggedIn(true);
      } else {
        const error = await response.text();
        setError(error);
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred');
    }
  };

  return (
    <div className="Login">

      {loggedIn ? (
          <div>
        <p className='log'>You are logged in!</p>
        <Todo />
        </div>
      ) : (
          <section className='login'>
            <h2>Already have an account? Login here!</h2>

          <form className='loginForm' onSubmit={handleLogin}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
          </form>

          {error && <p>{error}</p>}
        </section>
      )}
    </div>
  );
}

export default LogIn;
