/* eslint-disable no-unused-vars */
import { AuthContext } from "../context/Auth.context";
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Logout from "../components/auth/Logout";
import SkillCreation from "../components/SkillCreation";
import ClassCreation from "../components/ClassCreation";
import TeacherSkills from "../components/TeacherSkills";
import SessionCreation from "../components/SessionCreation";
import "../../style/global.css";

function Profile() {
  const user = useContext(AuthContext).user;

  return (
    <>
      <Navbar />

      <div>Profile</div>
      <h3>Welcome {user ? user.email : null} </h3>

      <TeacherSkills />
      <SkillCreation />
    </>
  );
}

export default Profile;
