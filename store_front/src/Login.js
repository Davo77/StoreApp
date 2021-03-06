import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
 let token = localStorage.getItem('token')
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + token
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}



export default function Login({ setToken }) {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
 // const [user, setUser] = useState()

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      name,
      password
    });
    setToken(token);
    localStorage.setItem('user', JSON.stringify(name));
    console.log(token);
  }
/*
  const handleSubmit = async e => {
    e.preventDefault();
    const user = { name, password };
    // send the username and password to the server
    const response = await axios.post(
      "/",
      user
    );
    // set the state of the user
    setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('user', response.data)
    console.log(response.data)
  };
*/
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input type="text" onChange={e => setName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};