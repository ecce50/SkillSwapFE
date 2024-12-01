import React, { useState, useContext } from "react";
import ImageUpload from "./ImageUpload";
import { AuthContext } from "../context/Auth.context";
import axios from "axios";
import { BACKEND_URL } from "../config/config.index.js";

function ImageDisplay({ imageType, entity, onUpdate}) {
  const { setUser } = useContext(AuthContext);
  const [localImageUrl, setLocalImageUrl] = useState(entity.imageUrl);

  const handleImageUpload = async (imageUrl) => {
    try {

      setLocalImageUrl(imageUrl);

      switch (imageType) {
        case 'user':
          await axios.put(`${BACKEND_URL}/user/update-skill/`, { imageUrl });
          break;
        case 'class':
          await axios.put(`${BACKEND_URL}/class/update-class/${entity._id}`, { imageUrl });
          break;
        case 'skill':
          await axios.put(`${BACKEND_URL}/skill/update-skill/${entity._id}`, { imageUrl });
          break;
      }

      // Inform the parent component of the update
      if (onUpdate) {
        onUpdate({ ...entity, imageUrl: imageUrl });
      }
    } catch (error) {
      console.error(`Error updating ${imageType} image URL:`, error);
    }
  };

  return (
    <>
      {entity && (
        <img
          src={entity.imageUrl}
          alt={`${imageType} Image`}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
          }}
        />
      )}
        <ImageUpload
          onSuccess={handleImageUpload}
          imageType={imageType}
          entityId={entity._id}
        />
    </>
  );
}

export default ImageDisplay;
