import React from 'react'
import ImageUpload from './ImageUpload'
import { useState } from 'react';

function ProfileImage() {

    const [profileImg, setProfileImg] = useState("");




  return (

    <div>
        <h2>Profile Image</h2>

    <ImageUpload/>
    </div>
  )
}

export default ProfileImage