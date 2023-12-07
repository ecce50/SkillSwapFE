import ClassCreation from "../components/ClassCreation";
import SkillClasses from "../components/SkillClasses";
import { useLocation } from "react-router-dom";

function SkillDetailPage() {
  const location = useLocation();
  console.log("Full location object:", location);

  const { skillId, skillTitle } = location.state || {};
  console.log("This is the skill ID:", skillId);
  console.log("This is the skill title:", skillTitle);

  return (
    <div>
      <h2>
        {skillTitle}
      </h2>
      <SkillClasses skillId={skillId}/>
      <ClassCreation skillId={skillId} skillTitle={skillTitle} />
    </div>
  );
}

export default SkillDetailPage;
