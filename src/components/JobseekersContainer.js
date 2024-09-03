// JobseekersContainer.js
import React from 'react';
import JobseekerCard from './JobseekerCard';

const JobseekersContainer = ({ jobseekers, userType, setShowAddJobseeker,filteredJobseekers,handleSearch, searchQuery }) => {


    const hasFiltersApplied = filteredJobseekers && filteredJobseekers.length > 0;

    const handleSearchInputChange = (event) => {
        handleSearch(event.target.value);
      };

  return (
    <div className="content">
      {userType === 'superuser' && (
        <button className="add-jobseeker-button" onClick={() => setShowAddJobseeker(true)}>
          <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/add.png" alt="add" />
          Add Jobseeker
        </button>
      )}
      {userType === 'superuser' && (
        <div className="search-bar-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search by name or role"
            className="search-bar"
          />
        </div>
      )}
      <div className="jobseekers-container">
        {(hasFiltersApplied ? filteredJobseekers : jobseekers).map((jobseeker) => (
          <JobseekerCard key={jobseeker.id} jobseeker={jobseeker} userType={userType} />
        ))}
      </div>
    </div>
  );
};

export default JobseekersContainer;
