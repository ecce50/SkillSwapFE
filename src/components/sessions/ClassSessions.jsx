import React, { useEffect, useState, useContext } from "react";
import {
  fetchSessionsByClassId,
  deleteSession,
} from "../../utils/SessionUtils";
import { AuthContext } from "../../context/Auth.context.jsx";
import axios from "axios";
import { BACKEND_URL } from "../../config/config.index.js";

function ClassSessions({ classId }) {
  // State to store sessions and loading status
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const student = useContext(AuthContext);

  // Fetch sessions when component mounts or classId changes
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Fetch sessions
        const sessions = await fetchSessionsByClassId(classId);
        // Update state with sessions and set loading to false
        setSessions(sessions);
        setLoading(false);
        console.log("Here are the sessions: ", sessions);
      } catch (error) {
        console.error("Error when fetching the sessions:", error);
      }
    };
    fetchSessions();
  }, [classId]);

  // Function to book a place in a session
const bookPlace = async (sessionId, classId) => {
  console.log("Here is all the student data: ", student);
  console.log(
    "student.user.attendingSessions:",
    student.user.attendingSessions
  );
  try {
    // Update session with the current user's ID added to signedUp array
    const updatedSession = await axios.put(
      `${BACKEND_URL}/session/update-session/${sessionId}`,
      { signedUp: student.user._id } // Assuming student.attending is an array of session IDs the student is attending
      
    );
    console.log("Updated session after booking:", updatedSession.data.session);

    await axios.put(`${BACKEND_URL}/user/update-user`, {
      userId: student.user._id,
      attendingSessions: [...student.user.attendingSessions, sessionId],
    });
    // Update state with the updated session
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session._id === sessionId ? updatedSession.data.session : session
      )
    );

    // student.attendingSessions.push(sessionId);
  } catch (error) {
    console.error("Error when booking session:", error);
  }
};

  // Function to handle book button click
  const handleBookButtonClick = (sessionId) => {
    bookPlace(sessionId, classId);
  };

return (
  <div>
    {console.log("Sessions in the return:", sessions)}
    <h2>Sessions</h2>
    {/* Render loading message if data is being fetched */}
    {loading ? (
      <p>Loading...</p>
    ) : sessions.length === 0 ? ( // Render message if no sessions are available
      <p>No sessions listed</p>
    ) : (
      sessions.map((aSession) => (
        <div key={aSession._id}>
          {aSession.date && <p className="labelTitle">Date {aSession.date}</p>}
          {aSession.time && <p>Time {aSession.time}</p>}
          {aSession.status && <p>Level {aSession.status}</p>}
          {aSession.pointsCost && <p>Cost {aSession.pointsCost} points</p>}
          {aSession.maxAttendees && (
            <p>Max attendees {aSession.maxAttendees}</p>
          )}
          <p>Attending {aSession.signedUp.length}</p>
          {/* Conditional rendering for buttons */}
          {(() => {
            let buttonText;
            let buttonAction;
            if (aSession.signedUp.length < aSession.maxAttendees) {
              buttonText = "Book";
              buttonAction = handleBookButtonClick;
            } else if (aSession.signedUp.length === aSession.maxAttendees) {
              buttonText = "Full";
              buttonAction = null; // Button should be unclickable
            } else if (aSession.signedUp.includes(student._id)) {
              buttonText = "Unbook";
              buttonAction = handleUnbookButtonClick; // Assuming you have this function defined
            }
            return (
              <>
                <button
                  onClick={() =>
                    buttonAction && buttonAction(aSession._id, classId)
                  }
                  disabled={!buttonAction}
                >
                  {buttonText}
                </button>
                <button onClick={() => deleteSession(aSession._id)}>
                  Delete session
                </button>
              </>
            );
          })()}
        </div>
      ))
    )}
  </div>
);

}

export default ClassSessions;
