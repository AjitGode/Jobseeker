// JobseekerModal.js
import React from 'react';

const JobseekerModal = ({ showAddJobseeker, setShowAddJobseeker, handleAddJobseeker, newImage, setNewImage, newName, setNewName, newRole, setNewRole,newExp,setNewExp, successMessage, modalError }) => {
  if (!showAddJobseeker) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setShowAddJobseeker(false)}>
          &times;
        </span>
        <h2>Add Jobseeker</h2>
        {successMessage && <p className="success">{successMessage}</p>}
        <form onSubmit={handleAddJobseeker}>
          <input
            type="text"
            placeholder="Image URL"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />

          <input
            type='text'
            placeholder="Experience"
            value={newExp}
            onChange={(e) => setNewExp(e.target.value)}  
          />
           
          <button>Add</button>
          {modalError && <p className="error">{modalError}</p>}
        </form>
      </div>
    </div>
  );
};

export default JobseekerModal;
