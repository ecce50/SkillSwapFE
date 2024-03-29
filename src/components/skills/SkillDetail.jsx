import { useState, useEffect } from "react";
import axios from "axios";
import SkillClasses from "../classes/SkillClasses";
import ClassCreation from "../classes/ClassCreation";
import { BACKEND_URL } from "../../config/config.index.js";

function SkillDetail({ skillId }) {
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${BACKEND_URL}/skill/skill-info/${skillId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSkill(response.data.skill);
      } catch (error) {
        console.error("Error fetching skill info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [skillId]);

  useEffect(() => {
    localStorage.setItem("currentSkillId", skillId);
    return () => {
      localStorage.removeItem("currentSkillId");
    };
  }, [skillId]);

  useEffect(() => {
    console.log("Updated skill:", skill);
  }, [skill]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : skill ? (
        <div>
          <h1>{skill.title}</h1>
          <p>Skill ID: {skill._id}</p>
        </div>
      ) : (
        <div>Error: Skill not found</div>
      )}
      {skill && <SkillClasses skill={skill} />}
      {skill && <ClassCreation skill={skill} />}
    </div>
  );
}

export default SkillDetail;
