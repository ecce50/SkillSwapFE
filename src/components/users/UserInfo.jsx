import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/Auth.context";
import ImageDisplay from "../../utils/ImageDisplay.jsx";
import "../../../style/user-info.css";

function UserInfo() {
  const { user, setUser } = useContext(AuthContext);

  const handleUserUpdate = (updatedUser) => {
    console.log("Updated user image:", updatedUser);
  
    setUser(updatedUser);
  };

  return (
    <div className="user-info-container">
      <p> Hello {user.firstname}!</p>
      <ImageDisplay
        imageType="user"
        entity={user}
        key={user._id}
        onUpdate={handleUserUpdate}
      />
    </div>
  );
}

export default UserInfo;
