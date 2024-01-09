import React from "react";
import ImageUpload from "./ImageUpload";

function UserImage({ editMode, user }) {
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
      {editMode && <ImageUpload />}
    </>
  );
}

export default UserImage;
