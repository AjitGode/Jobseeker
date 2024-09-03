import React, { useState } from 'react';

const Sidebar = ({ userType, handleExperienceFilter }) => {
  const [experienceRange, setExperienceRange] = useState(6);

  const handleExperienceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setExperienceRange(value);
    handleExperienceFilter(0, value);
  };

  return (
    <aside className="sidebar">
      <h2>Filters</h2>
      
      {userType === 'superuser' ? (
        <div>
          <h3>Superuser Filters</h3>
          <p>Additional filter options here...</p>
          <label>Experience:</label>
          <input
            type="range"
            id="myRange"
            min="0"
            max="20"
            value={experienceRange}
            onChange={handleExperienceChange}
          />
          <span id="rangeValue">
            0 - {experienceRange} years
          </span>
        </div>
      ) : (
        <div>
          <h3>Common Filters</h3>
          <p>Filter options available to all users...</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
