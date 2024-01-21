import React, { useState, useEffect } from "react";
import axios from "axios";
import SessionCreation from "./SessionCreation";

function ClassSessions({ classId }) {
  const [sessions, setSessions] = useState([]);
  const [editSession, setEditSession] = useState(null);
  
  const [sessionId, setSessionId] = useState(null);



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

  /*----------------------------------------------------------*/

  useEffect (() => {

    console.log("Session ID before fetching:", sessionId);

    const fetchSessionId = async () => {
      try {
        const idResponse = await axios.get(`http://localhost:5005/session/sessions/${sessionId}`);
        console.log("Session ID response:", idResponse.data);

        setSessionId(idResponse.data.session._id);

      } catch (error) {
        console.error("Error fetching session ID:", error);
      }
    }

    fetchSessionId();
  }, [sessionId]);

  /*----------------------------------------------------------*/

  const handleEditClick = (session) => {
    setEditSession(session);
  };

  const handleUpdateClick = async (updatedSession) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:5005/session/update/${updatedSession._id}`,
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

  /*----------------------------------------------------------*/

  const deleteSession = async () => {

    try {
      await axios.delete(`http://localhost:5005/session/sessions/${sessionId}`)
      
    } catch (error) {
      console.error("Error when deleting session:", error);
    }
  }

  /*
  const handleUpdateSuccess = (updatedSession) => {
    // Update the sessions list with the updated session
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session._id === updatedSession._id ? updatedSession : session
      )
    );

    // Close the edit modal or reset editSession state
    setEditSession(null);
  };
  */

  /*------------------------------------------------------------------- */

  
  return (
    <div>
      <h2>ClassSessions</h2>
      {sessions.map((aSession) => (
        <div key={aSession._id}>
          {editSession && editSession._id === aSession._id ? (
            <div>
              {/* Edit form */}
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
              {/* Add other fields for editing */}
              <button onClick={() => handleUpdateClick(editSession)}>
                Update
              </button>
            </div>
          ) : (
            // Display session details
            <>
              <h2>Session Date: {aSession.date} </h2>
              <h2>Session Time: {aSession.time}</h2>
              <h2>Session Level: {aSession.status}</h2>
              <h2>Session Cost: {aSession.pointsCost} points</h2>

              <button onClick={() => handleEditClick(aSession)}>Edit</button>
              <button onClick={deleteSession}>Delete Session</button>
            </>
          )}
        </div>
      ))}
    </div>
  );


  // return (
    /* This component is to show all of the sessions that belong to a particular class. 
      It is a child component of the SkillClasses component.
      It needs to receive the classid from the SkillClasses component. 
     We can reuse the current logic from the UserSkills component */
   // <div>
   //   <h2>ClassSessions</h2>
   //   {sessions.map((aSession) => (
   //     <div key={aSession._id}>
          {/*
          <h2>Session Date: {aSession.date} </h2>
          <h2>Session Time: {aSession.time}</h2>
          <h2>Session Level: {aSession.status}</h2>
          <h2>Session Cost: {aSession.pointsCost} points</h2>
          */}

          

    //      <button onClick={() => handleEditClick(aSession)}>Edit</button>

    //    </div>
    //  ))}

    {/*
      {editSession && (
        <SessionCreation
          classId={classId}
          editMode
          sessionToEdit={editSession}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
      */}


      {/* <SessionCreation classId={classId} /> */}
   // </div>
    
 // );
}

export default ClassSessions;
