import Navbar from "../components/Navbar";
import SkillCreation from "../components/skills/SkillCreation";
import UserSkills from "../components/skills/UserSkills";
import "../../style/global.css";
import UserInfo from "../components/users/UserInfo";

function Profile() {
  return (
    <>
      <Navbar />
      <UserInfo />

      <UserSkills />
      <SkillCreation />
    </>
  );
}

export default Profile;
