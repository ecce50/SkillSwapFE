import React, { useState } from "react";
import { AuthContext } from "../../context/Auth.context";
import { useContext } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import UserImage from "./UserImage";

function UserInfo() {
  
  const { user, setUserInfo } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [newUserData, setNewUserData] = useState({
    // Initialize with the current user data
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
      const response = await axios.put(
        `http://localhost:5005/user/update`,
        newUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the user info in the context after successful edit
      setUserInfo(response.data.user);

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
          Welcome {user ? user.firstname : null} This is your email:{" "}
          {user ? user.email : null}{" "}
          <button onClick={handleEditClick}>Edit Profile</button>
        </h3>
      )}
    </>
  );
}

export default UserInfo;

// import React, { useState } from "react";
// import { AuthContext } from "../../context/Auth.context";
// import { useContext } from "react";
// import axios from "axios";

// function UserInfo() {
//   const { user, setUserInfo } = useContext(AuthContext);
//   const [editMode, setEditMode] = useState(false);
//   const [newUserData, setNewUserData] = useState({
//     // Initialize with the current user data
//     usersName: user ? user.firstname : "",
//     email: user ? user.email : "",
//     userImage: user ? user.userImage : "",
//   });

//   const handleEditClick = () => {
//     setEditMode(true);
//   };

//   const handleCancelEdit = () => {
//     setEditMode(false);
//     // Reset newUserData to the current user data if canceled
//       setNewUserData({
//         usersName: user ? user.firstname : "",
//         email: user ? user.email : "",
//         userImage: user ? user.userImage : "",
//       });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewUserData({
//       ...newUserData,
//       [name]: value,
//     });
//   };

//   const handleSaveEdit = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.put(
//         `http://localhost:5005/user/update-profile`,
//         newUserData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Update the user info in the context after successful edit
//       setUserInfo(response.data.user);

//       setEditMode(false);
//     } catch (error) {
//       console.error("Error when updating user profile:", error);
//     }
//   };

//   return (
//     <>
//       <div>Profile</div>

//       <h3>
//         Welcome {user ? user.firstname : null} This is your email:{" "}
//         {user ? user.email : null}{" "}
//         {!editMode && <button onClick={handleEditClick}>Edit Profile</button>}
//       </h3>

//       {/* Display the profile image using user.profileImageUrl */}
//       {editMode ? (
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="firstname"
//             value={newUserData.firstname}
//             onChange={handleInputChange}
//           />
//           <label>Email:</label>
//           <input
//             type="text"
//             name="email"
//             value={newUserData.email}
//             onChange={handleInputChange}
//           />
//           <br />
//           <label>Profile Image URL:</label>
//           <input
//             type="text"
//             name="userImage"
//             value={newUserData.userImage}
//             onChange={handleInputChange}
//           />
//           <br />
//           <button onClick={handleSaveEdit}>Save</button>
//           <button onClick={handleCancelEdit}>Cancel</button>
//         </div>
//       ) : (
//         user &&
//         user.userImage && (
//           <img
//             src={user.userImage}
//             alt="Profile"
//             style={{
//               width: "200px",
//               height: "200px",
//               borderRadius: "50%",
//             }}
//           />
//         )
//       )}
//     </>
//   );
// }

// export default UserInfo;
