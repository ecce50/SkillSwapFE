// src/components/skills/SkillClasses.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ClassSessions from "../sessions/ClassSessions";
import SessionCreation from "../sessions/SessionCreation";
import ReviewCreation from "../reviews/ReviewCreation";
import ClassReviews from "../reviews/ClassReviews.jsx";
import {
  fetchSessionsByClassId,
  deleteSessionById,
} from "../../utils/sessionUtils";

const SkillClasses = ({ skill }) => {
  const [classes, setClasses] = useState([]);

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
      } catch (error) {
        console.error("Error when fetching the classes:", error);
      }
    };

    fetchClasses();
  }, [skill._id]);

  const deleteClass = async (classId) => {
    try {
      const sessions = await fetchSessionsByClassId(classId);

      console.log("Before Promise.all");
      await Promise.all(
        sessions.map(async (session) => {
          try {
            console.log("Deleting session: ", session._id);
            await deleteSessionById(session._id);
            console.log("Session deleted successfully: ", session._id);
          } catch (sessionError) {
            console.error("Error when deleting session:", sessionError);
            throw sessionError;
          }
        })
      );
      console.log("After Promise.all");
      console.log("All sessions deleted successfully");

      console.log("Deleting class: ", classId);
      const response = await axios.delete(`http://localhost:5005/class/delete-class/${classId}`);
      console.log("Class deletion response:", response.status, response.data);

      if (response.status === 200) {
        console.log("Class deleted successfully");
        // Update state to trigger a re-render
        setClasses((prevClasses) => prevClasses.filter((c) => c._id !== classId));
      } else {
        console.error("Failed to delete class. Response:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error when deleting class and sessions:", error);
    }
  };

  return (
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

