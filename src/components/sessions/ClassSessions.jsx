import React, { useState, useEffect } from "react";
import axios from "axios";
import SessionCreation from "./SessionCreation";

function ClassSessions({ classId }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5005/session/sessions?classId=${classId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSessions(response.data.sessions);
      } catch (error) {
        console.error("Error when fetching the sessions:", error);
      }
    }; fetchSessions();
  }, [classId]);

  return (
    /* This component is to show all of the sessions that belong to a particular class. 
      It is a child component of the SkillClasses component.
      It needs to receive the classid from the SkillClasses component. 
     We can reuse the current logic from the UserSkills component */
    <div>
      <h2>ClassSessions</h2>
      {sessions.map((aSession) => (
        <div key={aSession._id}>
          <h2>Session Date: {aSession.date} </h2>
          <h2>Session Time: {aSession.time}</h2>
        </div>
      ))}
      {/* <SessionCreation classId={classId} /> */}
    </div>
  );
}

export default ClassSessions;
