import React, { useContext } from "react";
import ImageUpload from "./ImageUpload";
import { AuthContext } from "../context/Auth.context";

function ImageDisplay({ editMode, imageType, entity }) {
  const { setUser } = useContext(AuthContext);

  const handleImageUpload = async (imageUrl) => {
    try {
      switch (imageType) {
        case "user":
              setUser({ ...entity, imageUrl: imageUrl });
            case "class":
             
            case "skill":
              
            default:
              return null;
      }
      
      if (imageType === "user") {
        setUser({ ...entity, imageUrl: imageUrl });
      }
      // Add additional logic here if `entity` should be updated in context for other image types
    } catch (error) {
      console.error(`Error updating ${imageType} image URL:`, error);
    }
  };

  // const getImageSrc = () => {
  //   switch (imageType) {
  //     case "user":
  //       return entity.imageURL;
  //     case "class":
  //       return entity.imageURL;
  //     case "skill":
  //       return entity.imageURL;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <>
      {entity && (
        <img
          src={entity.imageURL}
          alt={`${imageType} Image`}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
          }}
        />
      )}
      {editMode && (
        <ImageUpload
          onSuccess={handleImageUpload}
          imageType={imageType}
          entityId={entity._id}
        />
      )}
    </>
  );
}

export default ImageDisplay;
