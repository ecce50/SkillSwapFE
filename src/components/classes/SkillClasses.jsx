import React, { useState, useEffect } from "react";
import axios from "axios";
import ClassSessions from "../sessions/ClassSessions";
import SessionCreation from "../sessions/SessionCreation";
import ReviewCreation from "../reviews/ReviewCreation";
import ClassReviews from "../reviews/ClassReviews.jsx";

const SkillClasses = ({ skill, skillId }) => {
  const [classes, setClasses] = useState([]);
  //const [reviews, setReviews] = useState([]);


  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5005/class/classes?skillId=${skill._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClasses(response.data.classes);
        //console.log("This is what response is: ", response);
        //console.log(
        //"This is what response.data.classes is: ",
        //response.data.classes
        //);
        //console.log("This is what classes is: ", classes);
      } catch (error) {
        console.error("Error when fetching the classes:", error);
      }
    };

    fetchClasses();

  }, []);

  /*----------------------------------------------------------*/


  const deleteClass = async (classId) => {
    try {
      await axios.delete(`http://localhost:5005/class/delete-class/${classId}`);

    } catch (error) {
      console.error("Error when deleting class:", error);
    }
  }


  /*----------------------------------------------------------*/


  return (
    /* This component is to show all of the classes that belong to a particular skill. 
      It is the parent/main component of the SkillDetailPage.
      It need to receive the skillid from the UserSkills component. 
      How do we do that when they are on different pages and not connected each other?\ */
    <div>
      {classes.map((aClass) => (
        <div key={aClass._id}>
          <h2>Class Title: {aClass.title} </h2>
          <p>Image URL: {aClass.imageURL}</p>
          <h4>Teacher: {skill.teacherId}</h4>
          <p>Class Description: {aClass.description}</p>
          <h4>Duration: {aClass.duration}</h4>
          <h4>Location: {aClass.location}</h4>

          <button onClick={() => deleteClass(aClass._id)}> Delete Class</button>

          <h2>Reviews:</h2>
          <ClassReviews classId={aClass._id} />
          <ClassSessions classId={aClass._id} />
          <ReviewCreation classId={aClass._id} />
          <SessionCreation classId={aClass._id} />
        </div>
      ))}
    </div>
  );
};

export default SkillClasses;
