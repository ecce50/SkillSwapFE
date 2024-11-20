import React from "react";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config/config.index.js";

function ImageUpload({ onSuccess, imageType, entityId }) {
  const [imageUrl, setImageUrl] = useState();

  // Define a function to handle file input changes
  const handleFile = async (event) => {
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("imageType", imageType); // Add imageType to formData
      
      switch (imageType) {
        case 'user':
          formData.append("userId", entityId);
          break;
        case 'class':
          formData.append("classId", entityId);
          break;
        case 'skill':
          formData.append("skillId", entityId);
          break;
}

  //  if (imageType === "user") {
  //    formData.append("userId", userId);

  //  } else if (imageType === "class") {
  //    formData.append("classId", classId);
  //  }
      const res = await axios.post(
        `${BACKEND_URL}/image/upload-image`,
        formData
      );

      const imageUrl = res.data.secure_url;
      setImageUrl(imageUrl);
      onSuccess(imageUrl);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  // JSX for rendering the file input element
  return (
    <div>
      <input type="file" name="image" onChange={handleFile}></input>
    </div>
  );
}

export default ImageUpload;
