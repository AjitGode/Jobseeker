// LoginForm.js
import React from 'react';

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin, error1, setIsRegistering }) => {
  return (
    <div className="login-form">
      <h2><img width="48" height="48" src="https://img.icons8.com/fluency/48/login-rounded-right.png" alt="login-rounded-right"/>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error1 && <p className="error">{error1}</p>}
      </form>
      {/* <button onClick={() => setIsRegistering(true)}>
        Don't have an account? Register
      </button> */}
    <a href="#login" onClick={() => setIsRegistering(true)} className="register-link">
    Don't have an account? Register
      </a>
    </div>
  );
};

export default LoginForm;
