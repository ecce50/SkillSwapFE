/* eslint-disable no-unused-vars */
import { AuthContext } from "../context/Auth.context";
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Logout from "../components/Logout";
import SkillCreation from "../components/SkillCreation";
import ClassCreation from "../components/ClassCreation";
import TeacherSkills from "../components/TeacherSkills";
import SessionCreation from "../components/SessionCreation";

function Profile() {
  const user = useContext(AuthContext).user;
  const [isAddingClass, setIsAddingClass] = useState(false);

  const handleAddClass = () => {
    setIsAddingClass(true);
  };

  const handleClassCreationClose = () => {
    setIsAddingClass(false);
  };

  return (
    <>
      <Navbar />

      <div>Profile</div>
      <h3>Welcome {user ? user.email : null} </h3>

      <SkillCreation />
      <TeacherSkills onAddClass={handleAddClass} />
      {isAddingClass && <ClassCreation onClose={handleClassCreationClose} />}
      <SessionCreation/>
      <Logout />
    </>
  );
}

export default Profile;
