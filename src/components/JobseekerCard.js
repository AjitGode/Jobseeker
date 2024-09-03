// JobseekerCard.js
import React from 'react';

const JobseekerCard = ({ jobseeker, userType }) => {
  return (
    <div className="jobseeker-card">
      <div className={`profile-image ${userType === 'normal' ? 'blur' : ''}`}>
        <img src={jobseeker.img} alt={jobseeker.name} />
      </div>
      <h3 className={userType === 'normal' ? 'blur' : ''}>{jobseeker.name}</h3>
      <p>{jobseeker.role}</p>
      <p>Experience: {jobseeker.Exp}</p>
    </div>
  );
};

export default JobseekerCard;
