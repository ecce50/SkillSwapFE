import React, { useState, useEffect } from "react";
import axios from "axios";
import ClassSessions from "./ClassSessions";
import SessionCreation from "./SessionCreation";

const SkillClasses = ({ skillId }) => { //we're not passing the skillID!
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5005/class/classes?skillId=${skillId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClasses(response.data.classes);
        console.log("This is what response is: ", response);
        console.log(
          "This is what response.data.classes is: ",
          response.data.classes
        );
        console.log("This is what classes is: ", classes);
      } catch (error) {
        console.error("Error when fetching the classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    /* This component is to show all of the classes that belong to a particular skill. 
      It is the parent/main component of the SkillDetailPage.
      It need to receive the skillid from the TeacherSkills component. 
      How do we do that when they are on different pages and not connected each other?\ */
    <div>
      <h2>Skill Classes component</h2>

      {classes.map((aClass) => (
        <div key={aClass._id}>
          <h2>Class Title: {aClass.title} </h2>
          <h2>Class Description: {aClass.description}</h2>
          <ClassSessions classes={classes}/>
          <SessionCreation classes={classes} />
        </div>
      ))}
    </div>
  );
};

export default SkillClasses;
