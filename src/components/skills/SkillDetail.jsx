import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SkillClasses from "../classes/SkillClasses";
import ClassCreation from "../classes/ClassCreation";
import { BACKEND_URL } from "../../config/config.index.js";
import { AuthContext } from "../../context/Auth.context.jsx";
import ScrollToElement from "../general/ScrollToElement.jsx";

function SkillDetail({ skillId }) {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  //Code passed to B component
  const [classes, setClasses] = useState([]);
  const [skill, setSkill] = useState(null);

  //A code
  // Fetch skill details and classes on component mount
  useEffect(() => {
    const fetchSkillAndClasses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const [skillResponse, classesResponse] = await Promise.all([
          axios.get(`${BACKEND_URL}/skill/skill-info/${skillId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BACKEND_URL}/class/classes?skillId=${skillId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setSkill(skillResponse.data.skill);
        setClasses(classesResponse.data.classes);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching skill or classes:", error);
        setLoading(false);
      }
    };

    fetchSkillAndClasses();
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
  // const [classes, setClasses] = useState([]);

  // useEffect(() => {
  //   const fetchClasses = async () => {
  //     try {
  //       const token = localStorage.getItem("authToken");
  //       const response = await axios.get(
  //         `${BACKEND_URL}/class/classes?skillId=${skill._id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setClasses(response.data.classes);
  //     } catch (error) {
  //       console.error("Error when fetching the classes:", error);
  //     }
  //   };

  //   fetchClasses();
  // }, [skill._id]);

  const handleAddClass = (newClass) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };
  //--------------------------------------------------------------------

  return (
    <div>
      {console.log("Classes from the return SD: ", classes)}
      {loading ? (
        <div>Loading...</div>
      ) : skill ? (
        <div>
          <h1>{skill.title}</h1>
          {/* Pass classes and skill to SkillClasses */}
          <SkillClasses
            classes={classes}
            skill={skill}
            setClasses={setClasses}
          />
          {user && user._id === skill.teacherId && (
            <ClassCreation skill={skill} onAddClass={handleAddClass} />
          )}
        </div>
      ) : (
        <div>Error: Skill not found</div>
      )}
    </div>
  );
}

export default SkillDetail;
