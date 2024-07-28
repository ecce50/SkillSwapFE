import { useState, useEffect, useContext} from "react";
import axios from "axios";
import SkillClasses from "../classes/SkillClasses";
import ClassCreation from "../classes/ClassCreation";
import { BACKEND_URL } from "../../config/config.index.js";
import { AuthContext } from "../../context/Auth.context.jsx";
import ScrollToElement from "../general/ScrollToElement.jsx";

function SkillDetail({ skillId }) {
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);

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

  /*
  useEffect(() => {
    if (user && skill) {
      console.log("This is the logged in user's ID", user._id);
      console.log("This is the teacher ID", skill.teacherId);
    }
  }, [user, skill]);
  */
  
  //This is the changes we started makeing to have "classes page" redender when they get created. Needs fisnishing
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${BACKEND_URL}/class/classes?skillId=${skill._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClasses(response.data.classes);
      } catch (error) {
        console.error("Error when fetching the classes:", error);
      }
    };

    fetchClasses();
  }, [skill._id]);

  const handleAddClass = (newClass) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };
//--------------------------------------------------------------------


  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : skill ? (
        <div>
          <h1>{skill.title}</h1>
        {/*  <p>Skill ID: {skill._id}</p>*/}
        </div>
      ) : (
        <div>Error: Skill not found</div>
      )}
      {skill && <SkillClasses skill={skill} />}
      {skill && user && user._id === skill.teacherId && (
        <ClassCreation skill={skill} />
      )}

    </div>
  );
}

export default SkillDetail;
