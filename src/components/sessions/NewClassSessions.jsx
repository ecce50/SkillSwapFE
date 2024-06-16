/*


// src/components/sessions/ClassSessions.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchSessionsByClassId,
  deleteSession,
} from "../../utils/SessionUtils";

function ClassSessions({ classId }) {
  const [sessions, setSessions] = useState([]);
  const [editSession, setEditSession] = useState(null);

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

  /*
  const handleEditClick = (session) => {
    setEditSession(session);
  };

  const handleUpdateClick = async (updatedSession) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${BACKEND_URL}/session/update-session/${sessionId}`,
        updatedSession,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the sessions after successful update
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === updatedSession._id ? updatedSession : session
        )
      );

      // Reset the editingSession state
      setEditSession(null);
    } catch (error) {
      console.error("Error when updating the session:", error);
    }
  };
  

  const deleteSession = async (sessionId) => {
    try {
      await deleteSession(sessionId);
    } catch (error) {
      console.error("Error when deleting session:", error);
    }
  };

  return (
    <div>
      <h2>ClassSessions</h2>
      {sessions.map((aSession) => (
        <div key={aSession._id}>
          {editSession && editSession._id === aSession._id ? (
            <div>
              <input
                type="text"
                value={editSession.date}
                onChange={(e) =>
                  setEditSession({
                    ...editSession,
                    date: e.target.value,
                  })
                }
              />
              <button onClick={() => handleUpdateClick(editSession)}>
                Update
              </button>
            </div>
          ) : (
            <>
              <h2>Session Date: {aSession.date} </h2>
              <h2>Session Time: {aSession.time}</h2>
              <h2>Session Level: {aSession.status}</h2>
              <h2>Session Cost: {aSession.pointsCost} points</h2>

              <button onClick={() => handleEditClick(aSession)}>Edit</button>
              <button onClick={() => deleteSession(aSession._id)}>Delete Session</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ClassSessions;


*/



// return (
//   <div>
//     <h2>Sessions</h2>
//     {classes.map((aSession) => (
//       <div key={aSession._id} id={aSession._id}>
//         {/* Common part for both edit mode and view mode */}
//         {aSession.date && <p className="labelTitle">Date {aSession.date}</p>}
//         {aSession.time && <p>Time {aSession.time}</p>}
//         {aSession.status && <p>Level {aSession.status}</p>}
//         {aSession.pointsCost && <p>Cost {aSession.pointsCost} points</p>}
//         {aSession.maxAttendees && (<p>Max attendees {aSession.maxAttendees}</p>)}
//         <p>Attending {aSession.signedUp.length}</p>

//         {/* Edit mode */}
//         {editMode && editedSession[aSession._id] && (
//           <>
//             <label>
//               <input
//                 value={updatedSession.date || aSession.date}
//                 onChange={(e) =>
//                   setUpdatedClass((prevSession) => ({
//                     ...prevSession,
//                     date: e.target.value,
//                   }))
//                 }
//               />
//             </label>
//             <label>
//               <input
//                 value={updatedSession.time || aSession.time}
//                 onChange={(e) =>
//                   setUpdatedClass((prevSession) => ({
//                     ...prevSession,
//                     time: e.target.value,
//                   }))
//                 }
//               />
//             </label>
//             <label>
//               <input
//                 value={updatedSession.level || aSession.level}
//                 onChange={(e) =>
//                   setUpdatedClass((prevSession) => ({
//                     ...prevSession,
//                     level: e.target.value,
//                   }))
//                 }
//               />
//             </label>
//             <label>
//               <input
//                 value={updatedSession.cost || aSession.cost}
//                 onChange={(e) =>
//                   setUpdatedClass((prevSession) => ({
//                     ...prevSession,
//                     cost: e.target.value,
//                   }))
//                 }
//               />
//             </label>
//             <label>
//               <input
//                 value={updatedSession.maxAttendees || aSession.maxAttendees}
//                 onChange={(e) =>
//                   setUpdatedClass((prevSession) => ({
//                     ...prevSession,
//                     maxAttendees: e.target.value,
//                   }))
//                 }
//               />
//             </label>

//             <button onClick={() => handleSaveEditSession(aSession._id)}>
//               Save
//             </button>
//             <button onClick={handleCancelEdit}>Cancel</button>
//           </>
//         )}

//         {/* View mode */}
//         {!editMode && !editedClasses[aClass._id] && (
//           <>
//             {(() => {
//               let buttonText;
//               let buttonAction;
//               if (aSession.signedUp.length < aSession.maxAttendees) {
//                 buttonText = "Book";
//                 buttonAction = handleBookButtonClick;
//               } else if (aSession.signedUp.length === aSession.maxAttendees) {
//                 buttonText = "Full";
//                 buttonAction = null; // Button should be unclickable
//               } else if (aSession.signedUp.includes(student._id)) {
//                 buttonText = "Unbook";
//                 buttonAction = handleUnbookButtonClick; // Assuming you have this function defined
//               }
//               return (
//                 <>
//                   <button
//                     onClick={() =>
//                       buttonAction && buttonAction(aSession._id, classId)
//                     }
//                     disabled={!buttonAction}
//                   >
//                     {buttonText}
//                   </button>
//                 </>
//               );
//             })()}

//             <button onClick={() => deleteSession(aSession._id)}>
//               Delete Session
//             </button>
//             <button onClick={() => handleEdit(aSession._id)}>Edit Session</button>
//           </>
//         )}
//       </div>
//     ))}
//   </div>
// );