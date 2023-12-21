import axios from 'axios';
import React from 'react'
import { useState } from 'react';

function ImageUpload() {

    //const [image, setImage] = useState();
    
    const handleFile = async (event) => {
        const file = event.target.files[0];

        try {
            const formData = new FormData();
            formData.append('file', file);

            console.log('Axios Request:', {
                method: 'post',
                url: 'http://localhost:5005/image/upload-image',
                data: formData,
            });

            const res = await axios.post ("http://localhost:5005/image/upload-image", formData )

            console.log("This is the response from the image upload to cloudinary", res);

        } catch (error) {
            console.error("This is the cloudinary post error", error);
        }
    }
    
    
return (
<div>
    <input type="file" name="image" onChange={handleFile}></input>
</div>
    )
    }

export default ImageUpload;



/*
import React, {useState} from 'react';
import axios from 'axios';

function ImageUpload() {

    const [selectedImage, setSelectedImage] = useState("");


    const uploadImage = async (files) => {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", "wgh4ayc3");


        try {
            const response = await axios.post ("https://api.cloudinary.com/v1_1/dopx79zod/image/upload",
            formData);

            console.log("This is the response from the image upload to cloudinary", response);

        } catch (error) {
            console.error("This is the cloudinary post error", error);
        }

    }


  return (
    <div>
        <input type="file" 
            onChange={(e) => {setSelectedImage(e.target.files[0]);}}
        />
        <button onClick={uploadImage} >Upload Image</button>
    </div>
  )
}

export default ImageUpload;
*/