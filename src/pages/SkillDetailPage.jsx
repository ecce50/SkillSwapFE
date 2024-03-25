import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import SkillDetail from "../components/skills/SkillDetail";

function SkillDetailPage() {
  const { skillId } = useParams();

  return (
    <div key={skillId}>
      <Navbar />
    <SkillDetail skillId={skillId} />
    </div>
  );
}

export default SkillDetailPage;
