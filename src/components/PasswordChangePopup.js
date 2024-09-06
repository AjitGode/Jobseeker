// PasswordChangePopup.js
import React from "react";

const PasswordChangePopup = ({
  show,
  onClose,
  currentPassword,
  setCurrentPassword,
  newPassword1,
  setNewPassword1,
  confirmNewPassword,
  setConfirmNewPassword,
  handleChangePassword,
}) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Change Password</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
          <label>
            Current Password (Read Only):
            <input
              type="text" // Making the current password visible
              value={currentPassword}
              readOnly // Making the input read-only
              required
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword1}
              onChange={(e) => setNewPassword1(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm New Password:
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </label>
          <div className="popup-buttons">
            <button type="submit">Change Password</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangePopup;
