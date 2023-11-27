/* eslint-disable no-unused-vars */
import { AuthContext } from "../context/Auth.context";
import { useContext } from "react";
import Navbar from "../components/Navbar";
import Logout from "../components/Logout";
import SkillCreation from "../components/SkillCreation";
import ClassCreation from "../components/ClassCreation";
import TeacherSkills from "../components/TeacherSkills";

function Profile() {
  const user = useContext(AuthContext).user;

  return (
    <>
      <Navbar />

      <div>Profile</div>
      <h3>Welcome {user ? user.email : null} </h3>

      <SkillCreation />

      <ClassCreation />
      <TeacherSkills/>
      <Logout />
    </>
  );
}

export default Profile;
