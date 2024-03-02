import React, { useState } from 'react';
import { serverAddress } from './constants';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };





  const handleLogin = async () => {
    try {
      // const response = await fetch('http://192.168.3.24:8000/api/login/', {
      const response = await fetch(serverAddress+"api/login/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json(); // Parse response JSON
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      if (data && data.message === 'Login successful') { // Correct message comparison
        onLogin(true);
        console.log('Login successful', username, password);
      } else {
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">

        <div className="col-md-9 col-lg-6 col-xl-5 text-center">
            <img src="./root.png"
              className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3 fw-bolder">  Welcome to Roots</p>
                {/* Add buttons for social sign-in */}
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0"></p>
              </div>

              {/* Email input */}
              
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  placeholder="Enter your username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>



              {/* Password input */}
    

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox */}
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="/PasswordReset" className="text-body">Forgot password?</a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
         

<button type="button" className="btn btn-primary btn-lg"
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
          onClick={handleLogin}>Login</button>

          
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup"
                  className="link-danger">Register</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        {/* Copyright */}
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>
        {/* Right */}
        <div>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        {/* Right */}
      </div>
    </section>
  );
};

export default LoginForm;