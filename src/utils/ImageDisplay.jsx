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

      // Update the server with the new image URL
      await axios.put(`${BACKEND_URL}/skill/update-skill/${entity._id}`, { imageUrl });

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
      {console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb", entity.imageUrl)}
        <ImageUpload
          onSuccess={handleImageUpload}
          imageType={imageType}
          entityId={entity._id}
        />
    </>
  );
}

export default ImageDisplay;
