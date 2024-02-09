// This component is for adding and updating the user image
import React, { useContext } from "react";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { AuthContext } from "../../context/Auth.context";

function UserImageUpload() {
  const { user, setUser } = useContext(AuthContext);

  return (
    <div>
      <h3>User Image Upload</h3>
      <ImageUpload
        onSuccess={(imageUrl) => {
          // Update the user's imageURL in the MongoDB database
          axios
            .patch("http://localhost:5005/user/update", {
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

// import React, { useContext } from "react";
// import ImageUpload from "../ImageUpload";
// import { AuthContext } from "../../context/Auth.context";
// import axios from "axios";

// function ProfileImageUpload() {
//   const { user, setUser } = useContext(AuthContext);

//   const handleImageUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       const formData = new FormData();
//       formData.append("file", file);

//       const cloudinaryResponse = await axios.post(
//         "http://localhost:5005/image/upload-image",
//         formData
//       );

//       const imageUrl = cloudinaryResponse.data.secure_url;
//       console.log("This is the user: ", user);

//       // Update only the user's imageURL using the generic update route
//       const updatedUser = await axios.patch(
//         "http://localhost:5005/user/update",
//         { userImage: imageUrl }
//       );

//       // Update the user state with the new data
//       setUser(updatedUser.data);
//       console.log("User state updated successfully");
//       console.log("User's imageURL updated successfully:", updatedUser.data);
//     } catch (error) {
//       console.error("Error updating user's imageURL:", error);
//     }
//   };

//   return (
//     <div>
//       <h3>Profile Image Upload</h3>
//       {/* Pass the handleImageUpload function as a prop to ImageUpload */}
//       <ImageUpload onImageUpload={handleImageUpload} />
//     </div>
//   );
// }

// export default ProfileImageUpload;
