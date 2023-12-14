import Navbar from "../components/Navbar";
import ClassCreation from "../components/classes/ClassCreation";
import SkillClasses from "../components/classes/SkillClasses";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SkillDetailPage() {
  const location = useLocation();
  console.log("Full location object:", location);

  const { skillId, skillTitle } = location.state || {};
  console.log("This is the skill ID:", skillId);
  console.log("This is the skill title:", skillTitle);

  const nav = useNavigate();

  useEffect(() => {
    if (!skillId) {
      nav("/profile");
    }
    localStorage.setItem("currentSkillId", skillId);
    return () => {
      localStorage.removeItem("currentSkillId");
    };
  }, [skillId]);

  return (
    <div>
      <Navbar />
      <h2>Skill Title: {skillTitle}</h2>
      <SkillClasses skillId={skillId} />
      <ClassCreation skillId={skillId} skillTitle={skillTitle} />
    </div>
  );
}

export default SkillDetailPage;
