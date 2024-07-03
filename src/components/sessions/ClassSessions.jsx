import React, { useEffect, useState, useContext } from "react";
import {
  fetchSessionsByClassId,
  deleteSession,
} from "../../utils/SessionUtils";
import { AuthContext } from "../../context/Auth.context.jsx";
import axios from "axios";
import { BACKEND_URL } from "../../config/config.index.js";
import GenericModal from "../../utils/GenericModal.jsx";

function ClassSessions({ classId }) {
  // State to store sessions and loading status
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const student = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [editedSessions, setEditedSessions] = useState({});
  const [updatedSession, setUpdatedSession] = useState({
    date: "",
    time: "",
    status: "",
    pointsCost: "",
    maxAttendees: "",
    sessionId: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

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
      const updatedSession = await axios.patch(
        `${BACKEND_URL}/session/add-attendee/`,
        { signedUp: student.user._id, sessionId: sessionId }
      );
      console.log(
        "Updated session after booking:",
        updatedSession.data.session
      );

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
    } catch (error) {
      console.error("Error when booking session:", error);
    }
  };

  const unbookPlace = async (sessionId, classId) => {
    console.log("Here is all the student data: ", student);
    console.log(
      "student.user.attendingSessions:",
      student.user.attendingSessions
    );
    try {
      // Update session by removing the current user's ID from the signedUp array
      const updatedSession = await axios.patch(
        `${BACKEND_URL}/session/remove-attendee/`,
        { signedUp: student.user._id, sessionId: sessionId }
      );
      console.log(
        "Updated session after unbooking:",
        updatedSession.data.session
      );

      await axios.put(`${BACKEND_URL}/user/update-user`, {
        userId: student.user._id,
        attendingSessions: student.user.attendingSessions.filter(
          (id) => id !== sessionId
        ),
      });

      // Update state with the updated session
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === sessionId ? updatedSession.data.session : session
        )
      );
    } catch (error) {
      console.error("Error when unbooking session:", error);
    }
  };

  const handleBookButtonClick = (sessionId) => {
    bookPlace(sessionId, classId);
  };

  const handleUnbookButtonClick = (sessionId) => {
    unbookPlace(sessionId, classId);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setUpdatedSession({});
  };

  const handleCancelEdit = () => {
    toggleEditMode();
  };

  const handleEdit = (sessionId) => {
    setEditedSessions((prevEditedSessions) => ({
      ...prevEditedSessions,
      [sessionId]: true,
    }));
    toggleEditMode();
    // Set updated session to the session being edited
    const sessionToEdit = sessions.find((c) => c._id === sessionId);
    setUpdatedSession({ ...sessionToEdit, sessionId: sessionId });
  };

  const handleSaveEditSession = async (sessionId) => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `${BACKEND_URL}/session/update-session/`;

      const response = await axios.put(url, updatedSession, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Update the local sessions state with the new data
        setSessions((prevSession) =>
          prevSession.map((c) => (c._id === sessionId ? updatedSession : c))
        );

        setEditedSessions((prevEditedSessions) => ({
          ...prevEditedSessions,
          [sessionId]: false,
        }));

        console.log("session updated successfully");
        // Exit edit mode after saving edits
        toggleEditMode();
      } else {
        console.error("Failed to update session:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating session:", error.message);
    }
  };

  const handleDeleteButtonClick = (sessionId) => {
    setShowDeleteModal(true);
    setSessionToDelete(sessionId);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSessionToDelete(null);
  };

  const handleConfirmDelete = () => {
    deleteSession(sessionToDelete);
    setShowDeleteModal(false);
    setSessionToDelete(null);
  };

  return (
    <div>
      <h2>Sessions</h2>
      {sessions.map((aSession) => (
        <div key={aSession._id} id={aSession._id}>
          {/* Common part for both edit mode and view mode */}
          {editMode && editedSessions[aSession._id] ? (
            <>
              <label>
                Date:
                <input
                  value={updatedSession.date || aSession.date}
                  onChange={(e) =>
                    setUpdatedSession((prevSession) => ({
                      ...prevSession,
                      date: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Time:
                <input
                  value={updatedSession.time || aSession.time}
                  onChange={(e) =>
                    setUpdatedSession((prevSession) => ({
                      ...prevSession,
                      time: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Status:
                <input
                  value={updatedSession.status || aSession.status}
                  onChange={(e) =>
                    setUpdatedSession((prevSession) => ({
                      ...prevSession,
                      status: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Points Cost:
                <input
                  value={updatedSession.pointsCost || aSession.pointsCost}
                  onChange={(e) =>
                    setUpdatedSession((prevSession) => ({
                      ...prevSession,
                      pointsCost: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Max Attendees:
                <input
                  value={updatedSession.maxAttendees || aSession.maxAttendees}
                  onChange={(e) =>
                    setUpdatedSession((prevSession) => ({
                      ...prevSession,
                      maxAttendees: e.target.value,
                    }))
                  }
                />
              </label>

              <button onClick={() => handleSaveEditSession(aSession._id)}>
                Save
              </button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              {aSession.date && (
                <p className="labelTitle">Date: {aSession.date}</p>
              )}
              {aSession.time && <p>Time: {aSession.time}</p>}
              {aSession.status && <p>Status: {aSession.status}</p>}
              {aSession.pointsCost && <p>Cost: {aSession.pointsCost} points</p>}
              {aSession.maxAttendees && (
                <p>Max attendees: {aSession.maxAttendees}</p>
              )}
              <p>Attending: {aSession.signedUp.length}</p>

              {aSession &&
                student &&
                student.user._id !== aSession.teacherId && (
                  <button
                    onClick={() =>
                      aSession.signedUp.includes(student.user._id) //check if student is already signed up
                        ? handleUnbookButtonClick(aSession._id)
                        : handleBookButtonClick(aSession._id)
                    }
                    disabled={
                      aSession.signedUp.length >= aSession.maxAttendees && //check if the class is full (block sign up)
                      !aSession.signedUp.includes(student.user._id)
                    }
                  >
                    {aSession.signedUp.includes(student.user._id)
                      ? "Unbook"
                      : aSession.signedUp.length >= aSession.maxAttendees //check if the class is full (text)
                      ? "Full"
                      : "Book"}
                  </button>
                )}
              {aSession &&
                student &&
                student.user._id === aSession.teacherId && (
                  <>
                    <button
                      onClick={() => handleDeleteButtonClick(aSession._id)}
                    >
                      Delete Session
                    </button>
                    <button onClick={() => handleEdit(aSession._id)}>
                      Edit Session
                    </button>
                  </>
                )}
            </>
          )}
        </div>
      ))}
      <GenericModal
        show={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this session?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default ClassSessions;