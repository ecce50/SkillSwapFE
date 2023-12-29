/* eslint-disable no-unused-vars */
import { AuthContext } from "../context/Auth.context";
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import SkillCreation from "../components/skills/SkillCreation";
import UserSkills from "../components/skills/UserSkills";
import ImageUpload from "../components/ImageUpload";
import "../../style/global.css";

function Profile() {
  const user = useContext(AuthContext).user;

  return (
    <>
      <Navbar />

      <div>Profile</div>
      <h3>Welcome {user ? user.email : null} </h3>

      <ImageUpload/>

      <UserSkills />
      <SkillCreation />
    </>
  );
}

export default Profile;
