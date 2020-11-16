import React, { useState, useEffect, useContext, useCallback } from 'react';
import { withRouter, Redirect } from "react-router";
import app from './base';
import { AuthContext } from "./Auth.js";
import './Login.css';

const Login = ({ history }) => {
    const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
        [history]
    )
     const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className='container'>
      <h1 className='h4 text-center main-header'>Log in</h1>
      <div className="form-group align-content-center">
        <form onSubmit={handleLogin}>
          <div className="form-group">
        <label>
          Email
          <input name="email" className='form-control' type="email" placeholder="Email" />
            </label>
          </div>
          <div className="form-group">
        <label>
          Password
          <input name="password" type="password" className='form-control' placeholder="Password" />
            </label>
            </div>
          <button type="submit" className="btn login-button save-button btn-lg">Log in</button>
          <h4>New user?<a><href Redirect to={"/login"} /></a></h4>Sign up instead
      </form>
      </div>
      </div>
  );
}
export default withRouter(Login);
