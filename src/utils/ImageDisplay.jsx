import React, { useContext } from "react";
import ImageUpload from "./ImageUpload";
import { AuthContext } from "../context/Auth.context";

function ImageDisplay({ editMode, imageType, entity, onUpdate}) {
  const { setUser } = useContext(AuthContext);

  const handleImageUpload = async (imageUrl) => {
    try {
      // Update the server with the new image URL
      await axios.put(`/api/${imageType}/${entity._id}/image`, { imageUrl });

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
