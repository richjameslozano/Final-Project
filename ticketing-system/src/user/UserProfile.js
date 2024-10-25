import React, { useState } from "react";

function ProfileButtons() {
  // State to control the visibility of the 'Update' button
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle the 'Edit Profile' click
  const handleEditClick = () => {
    setIsEditing(true); // Show the 'Update' button
  };

  // Function to handle the 'Update' click
  const saveUserInfo = () => {
    setIsEditing(false); // Hide the 'Update' button after saving
  };

  return (
    <div>
      {/* 'Edit Profile' button, always visible */}
      <button className="edit-btn" onClick={handleEditClick}>
        Edit Profile
      </button>

      {/* 'Update' button, visible only when isEditing is true */}
      {isEditing && (
        <button className="update-btn" onClick={saveUserInfo}>
          Update
        </button>
      )}
    </div>
  );
}

export default ProfileButtons;