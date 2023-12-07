import React from "react";
import ClassCreation from "../components/ClassCreation";
import { useLocation } from "react-router-dom";

function SkillDetailPage() {
  const location = useLocation();
  console.log("Full location object:", location);

  const { skillId, skillTitle } = location.state || {};
  console.log("This is the skill ID:", skillId);
  console.log("This is the skill title:", skillTitle);

  return (
    <div>
      <h2>Here is the skill title</h2>
      <h2>
        {skillId} and {skillTitle}
      </h2>
      <ClassCreation skillId={skillId} skillTitle={skillTitle} />
    </div>
  );
}

export default SkillDetailPage;
