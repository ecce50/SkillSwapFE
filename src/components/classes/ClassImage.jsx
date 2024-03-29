import React from "react";
import ImageUpload from "../../utils/ImageUpload";
import { AuthContext } from "../../context/Auth.context";
import { useContext } from "react";


function ClassImage({ editMode, skillClass }) {
  const handleImageUpload = async (imageUrl) => {
    try {
      console.log("Class image updated successfully:", imageUrl);
    } catch (error) {
      console.error("Error updating class image:", error);
    }
  };

    const { user, setUser } = useContext(AuthContext);
    const userId = user._id;
    const classId = skillClass._id;
  return (
    <>
      {skillClass && skillClass.imageURL && (
        <img
          src={skillClass.imageURL}
          alt="Class"
          style={{
            width: "400px",
            height: "200px",
            borderRadius: "0%",
          }}
        />
      )}
      {editMode && (
        <ImageUpload onSuccess={handleImageUpload} imageType="class" classId={classId} userId={userId} />
      )}
    </>
  );
}

export default ClassImage;