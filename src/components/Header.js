// Header.js
import React from 'react';

const Header = ({ isLoggedIn, loggedInUser,setShowPasswordChangePopup, handleLogout }) => {
  return (
    <header>
      <div className='header-icon'>
        <img
          width="30"
          height="30"
          className='logo'
          src="https://img.icons8.com/ios-glyphs/30/find-matching-job.png"
          alt="find-matching-job"
        />
        <h1>Jobseekers List</h1>
      </div>
      {isLoggedIn && (
        <div className='header-user'>
          <img
            width="20"
            height="20"
            className='user-logo'
            src="https://img.icons8.com/ios-glyphs/30/user--v1.png"
            alt="user--v1"
          />
          <span onClick={() => setShowPasswordChangePopup(true)}>Welcome, {loggedInUser}</span>
          <button onClick={handleLogout}>
            Logout
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/material-rounded/24/exit.png"
              alt="exit"
            />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
