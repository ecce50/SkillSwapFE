import React, { useState, useContext } from "react";
import axios from "axios";
import UserImage from "./UserImage";
import { AuthContext } from "../../context/Auth.context";
import { BACKEND_URL } from "../../config/config.index.js";

function UserInfo() {
  const { user, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstname: user ? user.firstname : "",
    email: user ? user.email : "",
    userImage: user ? user.userImage : "",
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // Reset newUserData to the current user data if canceled
    setNewUserData({
      firstname: user ? user.firstname : "",
      email: user ? user.email : "",
      userImage: user ? user.userImage : "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = user._id;
      const response = await axios.put(
        `${BACKEND_URL}/user/update`,
        { userId, ...newUserData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);

      setEditMode(false);
    } catch (error) {
      console.error("Error when updating user profile:", error);
    }
  };

  return (
    <>
      <div>Profile</div>

      {editMode ? (
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="firstname"
            value={newUserData.firstname}
            onChange={handleInputChange}
          />
          <br />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={newUserData.email}
            onChange={handleInputChange}
          />
          <br />
          <UserImage editMode={editMode} user={user} />
          <br />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <h3>
          <UserImage editMode={editMode} user={user} />
          Welcome {user ? user.firstname : null}. This is your email:{" "}
          {user ? user.email : null}{" "}
          <button onClick={handleEditClick}>Edit Profile</button>
        </h3>
      )}
    </>
  );
}

export default UserInfo;
