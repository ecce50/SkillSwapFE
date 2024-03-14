// This component is for adding and updating the user image
import React, { useContext } from "react";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { AuthContext } from "../../context/Auth.context";
import { BACKEND_URL } from "../../config/config.index.js";

function UserImageUpload() {
  const { user, setUser } = useContext(AuthContext);

  return (
    <div>
      <h3>User Image Upload</h3>
      <ImageUpload
        onSuccess={(imageUrl) => {
          // Update the user's imageURL in the MongoDB database
          axios
            .patch(`${BACKEND_URL}/user/update`, {
              userImage: imageUrl,
              userId: user._id,
            })
            .then((updatedUser) => {
              // Update the user state with the new data
              setUser(updatedUser.data);
              console.log("User state updated successfully");
            })
            .catch((error) => {
              console.error("Error updating user's imageURL:", error);
            });
        }}
      />
    </div>
  );
}

export default UserImageUpload;