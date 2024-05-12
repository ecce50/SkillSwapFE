import React, { useEffect, useState, useContext } from "react";
import {
  fetchSessionsByClassId,
  deleteSession,
} from "../../utils/SessionUtils";
import { AuthContext } from "../../context/Auth.context.jsx";
import axios from "axios";
import { BACKEND_URL } from "../../config/config.index.js";

function ClassSessions({ classId }) {
  const [sessions, setSessions] = useState([]);
  const student = useContext(AuthContext);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await fetchSessionsByClassId(classId);
        setSessions(sessions);
      } catch (error) {
        console.error("Error when fetching the sessions:", error);
      }
    };

    fetchSessions();
  }, [classId]);

  const bookSession = async (sessionId) => {
    try {
      // Update session with the current user's ID added to signedUp array
      const updatedSession = await axios.put(
        `${BACKEND_URL}/session/update-session/${sessionId}`,
        { signedUp: student._id } // Assuming student.attending is an array of session IDs the student is attending
      );
      // Update state with the updated session
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === sessionId ? updatedSession.data.session : session
        )
      );
    } catch (error) {
      console.error("Error when booking session:", error);
    }
  };



  return (
    <div>
      <h2>Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions listed</p>
      ) : (
        sessions.map((aSession) => (
          <div key={aSession._id}>
            <p className="labelTitle">Date {aSession.date} </p>
            <p>Time {aSession.time}</p>
            <p>Level {aSession.status}</p>
            <p>Cost {aSession.pointsCost} points</p>
            

            <button onClick={() => deleteSession(aSession._id)}>
              Delete session
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ClassSessions;
