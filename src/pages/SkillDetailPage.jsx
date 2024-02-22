import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import SkillDetail from "../components/skills/SkillDetail";

function SkillDetailPage() {
  const { skillId } = useParams();

  return (
    <div key={skillId}>
      <Navbar />
    <SkillDetail skillId={skillId} />
      <h3>Here is the skillId from SDP: {skillId}</h3>
    </div>
  );
}

export default SkillDetailPage;
