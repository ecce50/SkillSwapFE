import React, { useContext } from "react";
import ImageUpload from "../../utils/ImageUpload";
import { AuthContext } from "../../context/Auth.context";


function UserImage({ editMode, user }) {
  const { setUser } = useContext(AuthContext);

  const handleImageUpload = async (imageUrl) => {
    try {
      setUser({ ...user, userImage: imageUrl });
    } catch (error) {
      console.error("Error updating user's imageURL:", error);
    }
  };

  return (
    <>
      {user && user.userImage && (
        <img
          src={user.userImage}
          alt="Profile"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
          }}
        />
      )}
      {editMode && (
        <ImageUpload onSuccess={handleImageUpload} imageType="user" userId={user._id} />
      )}
    </>
  );
}

export default UserImage;

// import React from "react";
// import ImageUpload from "../../utils/ImageUpload";

// function UserImage({ editMode, user }) {
//   return (
//     <>
//       {user && user.userImage && (
//         <img
//           src={user.userImage}
//           alt="Profile"
//           style={{
//             width: "200px",
//             height: "200px",
//             borderRadius: "50%",
//           }}
//         />
//       )}
//       {editMode && <ImageUpload />}
//     </>
//   );
// }

// export default UserImage;
