// RegisterForm.js
import React from "react";

const RegisterForm = ({
  newUsername,
  setNewUsername,
  newPassword,
  setNewPassword,
  newUserType,
  setNewUserType,
  handleRegister,
  error,
  successMessage,
  setIsRegistering,
}) => {
  return (
    <div className="register-form">
      <h2>
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/color/48/add-user-male-skin-type-7.png"
          alt="add-user-male-skin-type-7"
        />
        Register
      </h2>
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <select
          value={newUserType}
          onChange={(e) => setNewUserType(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Choose a User:
          </option>
          <option value="normal">Normal User</option>
          <option value="superuser">Superuser</option>
        </select>
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
      <a
        href="#login"
        onClick={() => setIsRegistering(false)}
        className="login-link"
      >
        Already have an account? Login
      </a>
    </div>
  );
};

export default RegisterForm;
