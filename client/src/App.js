import React, { useState } from 'react';
import './App.css';
import LogIn from './Components/logIn';
// import Todo from './Components/Todo';
import axios from 'axios';

function App() {
const [userName, setUserName] = useState('')
const [password, setPassword] = useState('')
const [login, setLogin] = useState(false)

const handleRegister = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post('/register', { userName, password });
    console.log(response.data);
  } catch (error) {
    console.log(error);
    alert(error.response.data); // display the error message in an alert
  }
  setUserName('');
  setPassword('');
};


// const handleRegister = async (event) => {
//   event.preventDefault();
//   try {
//     const response = await axios.post('/register', { userName, password });
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//   }
//   setUserName('');
//   setPassword('');
// };





  return (
    <div className = "App">
      <h1>Raman's To do</h1>

      <section className = 'register'>
        <h2>Login</h2>
        <form className='registerFrom' onSubmit = {handleRegister}>
          <h2>Register for an account Today!</h2>
          <label htmlFor = 'username'>Username</label>
          <input type = 'text' id='username' name='username' value = {userName} onChange = {(e) => setUserName(e.target.value)} />
          <label htmlFor = 'password'>Password</label>
          <input type = 'password' id = 'password' name = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)} />
          <button type = 'submit'>Register</button>
        </form>


      </section>
      <LogIn />
      {/* <Todo /> */}
    </div>
  );
}

export default App;
