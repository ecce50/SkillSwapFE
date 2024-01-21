import Navbar from "../components/Navbar";
import ClassCreation from "../components/classes/ClassCreation";
import SkillClasses from "../components/classes/SkillClasses";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SkillDetailPage() {
  const location = useLocation();
  console.log("Full location object:", location);

  const { skill } = location.state || {};
  //console.log("This is the skill ID:", skill._id);
  //console.log("This is the skill title:", skill.title);

  const nav = useNavigate();

  useEffect(() => {
    if (!skill._id) {
      nav("/profile");
    }
    localStorage.setItem("currentSkillId", skill._id);
    return () => {
      localStorage.removeItem("currentSkillId");
    };
  }, [skill._id]);

  return (
    <div>
      <Navbar />
      <h2>Skill Title: {skill.title}</h2>
      <SkillClasses skill={skill} />
      <ClassCreation skillId={skill._id} skillTitle={skill.title} />
    </div>
  );
}

export default SkillDetailPage;
