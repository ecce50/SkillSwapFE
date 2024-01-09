// ImageUpload.jsx
import React from "react";
import axios from "axios";
import { useState } from "react";

function ImageUpload({ onSuccess }) {
  const [imageUrl, setImageUrl] = useState();

  // Define a function to handle file input changes
  const handleFile = async (event) => {
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5005/image/upload-image",
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

// import axios from "axios";
// import React from "react";
// import { useState } from "react";

// function ImageUpload({ onImageUpload }) {
//   const [imageUrl, setImageUrl] = useState();

//   // Define a function to handle file input changes
//   const handleFile = async (event) => {
//     // Get the selected file from the event
//     const file = event.target.files[0];
// console.log("Before try block");
//     try {
//       // Create a FormData object and append the selected file to it (with key value pairs)
//       const formData = new FormData();
//       formData.append("file", file);

//       // Log the Axios request details for debugging purposes
//       console.log("Axios Request:", {
//         method: "post",
//         url: "http://localhost:5005/image/upload-image",
//         data: formData,
//       });

//       // Send a POST request to the server using Axios to upload the image
//       const res = await axios.post(
//         "http://localhost:5005/image/upload-image",
//         formData
//       );

//       // Log the response from the image upload to Cloudinary
//       console.log(
//         "This is the response from the image upload to Cloudinary",
//         res
//       );
//       onImageUpload(event);
//     } catch (error) {
//       // Log an error if the image upload to Cloudinary fails
//       console.error("This is the Cloudinary post error", error);
//     }
//       console.log("After try block");
//   };

//   // JSX for rendering the file input element
//   return (
//     <div>
//       <input type="file" name="image" onChange={handleFile}></input>
//     </div>
//   );
// }

// // Export the ImageUpload component as the default export of this module
// export default ImageUpload;
