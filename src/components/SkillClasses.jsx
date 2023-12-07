import React, { useState, useEffect } from "react";
import axios from "axios";

const SkillClasses = ({skillId}) => {

  const [classes, setClasses] = useState ([]);

  useEffect (() => {
    const fetchClasses = async () => {

      try{

          const token = localStorage.getItem("authToken");
          const response= await axios.get (`http://localhost:5005/class/classes`,
          {headers: {
            Authorization: `Bearer ${token}`,
            },
          }
        );
        setClasses(response.data.classes);

      } catch (error) {
        console.error ("Error when fetching the classes:", error);
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
      <h2>Classes</h2>

      {classes.map((aClass) => (

        <div key={aClass._id} >
          <h2>Title and Description</h2>
            {aClass.title}
            {aClass.description}
        </div>
      ))}

    </div>
  );
}

export default SkillClasses;
