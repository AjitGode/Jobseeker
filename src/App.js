// App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Sidebar from './components/Sidebar';
import JobseekersContainer from './components/JobseekersContainer';
import JobseekerModal from './components/JobseekerModal';
import { useAuth } from './hooks/useAuth';
import { useJobseekers } from './hooks/useJobseekers';
import { ToastContainer } from 'react-toastify';

const App=()=> {

  const {
    isLoggedIn,
    username,
    setUsername,
    password,
    setPassword,
    userType,
    error1,
    loggedInUser,
    handleLogin,
    handleLogout,
  } = useAuth();

  const {
    jobseekers,
    showAddJobseeker,
    setShowAddJobseeker,
    newImage,
    setNewImage,
    newName,
    error,
    setNewName,
    newRole,
    setNewRole,
    modalError,
    successMessage,
    newUsername,
    setNewUsername,
    newPassword,
    setNewPassword,
    newUserType,
    setNewUserType,
    newExp,
    setNewExp,
    handleAddJobseeker,
    setIsRegistering,
    isRegistering,
    handleRegister,
    filteredJobseekers,
    experienceRange,
    handleExperienceFilter,
    handleSearch,
    searchQuery,
  } = useJobseekers(isLoggedIn);


  return (
    <div className="App">
      <ToastContainer />
      <Header isLoggedIn={isLoggedIn} loggedInUser={loggedInUser} handleLogout={handleLogout} />

      {!isLoggedIn ? (
        isRegistering ? (
          <RegisterForm
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            newUserType={newUserType}
            setNewUserType={setNewUserType}
            handleRegister={handleRegister}
            error={error}
            successMessage={successMessage}
            setIsRegistering={setIsRegistering}
          />
        ) : (
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            error1={error1}
            setIsRegistering={setIsRegistering}
          />
        )
      ) : (
        <div className="main-content">
          <Sidebar userType={userType}
                  filteredJobseekers={filteredJobseekers}
                  experienceRange={experienceRange}
                   handleExperienceFilter={handleExperienceFilter}
               />
          <JobseekersContainer
            jobseekers={jobseekers}
            userType={userType}
            setShowAddJobseeker={setShowAddJobseeker}
            filteredJobseekers={filteredJobseekers}
            handleSearch={handleSearch}
            searchQuery={searchQuery}
          />
        </div>
      )}

      <JobseekerModal
        showAddJobseeker={showAddJobseeker}
        setShowAddJobseeker={setShowAddJobseeker}
        handleAddJobseeker={handleAddJobseeker}
        newImage={newImage}
        setNewImage={setNewImage}
        newName={newName}
        setNewName={setNewName}
        newRole={newRole}
        setNewRole={setNewRole}
        newExp={newExp}
        setNewExp={setNewExp}
        successMessage={successMessage}
        modalError={modalError}
      />
    </div>
  );
}

export default App;
