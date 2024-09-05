import React from "react";
import JobseekerCard from "./JobseekerCard";

const JobseekersContainer = ({
  userType,
  setShowAddJobseeker,
  currentJobseekers,
  paginate,
  currentPage,
  filteredJobseekers,
  handleSearch,
  searchQuery,
  itemsPerPage,
}) => {
  const hasFiltersApplied = filteredJobseekers && filteredJobseekers.length > 0;

  const handleSearchInputChange = (event) => {
    handleSearch(event.target.value);
  };

  const totalJobseekers = hasFiltersApplied
    ? filteredJobseekers.length
    : currentJobseekers.length;
  const totalPages = Math.ceil(totalJobseekers / itemsPerPage);

  return (
    <div className="content">
      {userType === "superuser" && (
        <button
          className="add-jobseeker-button"
          onClick={() => setShowAddJobseeker(true)}
        >
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/24/add.png"
            alt="add"
          />
          Add Jobseeker
        </button>
      )}
      {userType === "superuser" && (
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
        {currentJobseekers.map((jobseeker) => (
          <JobseekerCard
            key={jobseeker.id}
            jobseeker={jobseeker}
            userType={userType}
          />
        ))}
      </div>

      <div className="pagination">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? "active" : ""}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobseekersContainer;
