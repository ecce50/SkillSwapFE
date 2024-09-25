import React, { useEffect, useState, useContext } from "react";
import {
  fetchSessionsByClassId,
  deleteSession,
} from "../../utils/SessionUtils.jsx";
import { AuthContext } from "../../context/Auth.context.jsx";
import axios from "axios";
import { BACKEND_URL } from "../../config/config.index.js";
import GenericModal from "../../utils/GenericModal.jsx";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("enGB", enGB);

function ClassSessions({ sessions, classId, setSessions }) {
  // const [loading, setLoading] = useState(true);
  const student = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [editedSessions, setEditedSessions] = useState({});
  const [updatedSession, setUpdatedSession] = useState({
    dateTime: null,
    status: "",
    pointsCost: "",
    maxAttendees: "",
    sessionId: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  // const classSessions = sessions[classId] || [];

  // Function to book a place in a session
  const bookPlace = async (sessionId) => {
    try {
      const bookedSession = await axios.patch(
        `${BACKEND_URL}/session/add-attendee/`,
        { signedUp: student.user._id, sessionId: sessionId }
      );

      await axios.put(`${BACKEND_URL}/user/update-user`, {
        userId: student.user._id,
        attendingSessions: [...student.user.attendingSessions, sessionId],
      });

      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === sessionId ? bookedSession.data.session : session
        )
      );
    } catch (error) {
      console.error("Error when booking session:", error);
    }
  };

  // Function to unbook a place in a session
  const unbookPlace = async (sessionId) => {
    try {
      const updatedSession = await axios.patch(
        `${BACKEND_URL}/session/remove-attendee/`,
        { signedUp: student.user._id, sessionId: sessionId }
      );

      await axios.put(`${BACKEND_URL}/user/update-user`, {
        userId: student.user._id,
        attendingSessions: student.user.attendingSessions.filter(
          (id) => id !== sessionId
        ),
      });

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
    bookPlace(sessionId);
  };

  const handleUnbookButtonClick = (sessionId) => {
    unbookPlace(sessionId);
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
    const sessionToEdit = sessions.find((c) => c._id === sessionId);
    const dateTime = new Date(sessionToEdit.dateTime);
    setUpdatedSession({
      ...sessionToEdit,
      date: dateTime,
      time: dateTime,
      sessionId: sessionId,
    });
  };

  const handleSaveEditSession = async (sessionId) => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `${BACKEND_URL}/session/update-session/`;

      const combinedDateTime = new Date(
        updatedSession.date.getFullYear(),
        updatedSession.date.getMonth(),
        updatedSession.date.getDate(),
        updatedSession.time.getHours(),
        updatedSession.time.getMinutes()
      ).toISOString();

      const updatedSessionData = {
        ...updatedSession,
        dateTime: combinedDateTime, // Combine date and time into dateTime
      };

      const response = await axios.put(url, updatedSessionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session._id === sessionId ? updatedSessionData : session
          )
        );

        setEditedSessions((prevEditedSessions) => ({
          ...prevEditedSessions,
          [sessionId]: false,
        }));

        console.log("Session updated successfully");
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

  // const handleConfirmDelete = async () => {
  //   try {
  //     await deleteSession(sessionToDelete);

  //     // Update the sessions by removing the deleted session
  //     setSessions((prevSessions) => {
  //       const updatedSessionsForClass = prevSessions[classId].filter(
  //         (session) => session._id !== sessionToDelete
  //       );

  //       // Return the updated sessions for the specific class
  //       return {
  //         ...prevSessions,
  //         [classId]: updatedSessionsForClass, // Only update sessions for the correct classId
  //       };
  //     });

  //     setShowDeleteModal(false);
  //     setSessionToDelete(null);
  //   } catch (error) {
  //     console.error("Error when deleting session:", error);
  //   }
  // };

  const handleConfirmDelete = async () => {
    console.log("handleConfirmDelete was called");

    try {
      console.log("Before calling deleteSession");
      await deleteSession(sessionToDelete);
      console.log("After calling deleteSession");

      const filteredSessions = (prevSessions) => {
        console.log("Before filtering sessions:", prevSessions);
        const updatedSessions = prevSessions.filter(
          (session) => session._id !== sessionToDelete
        );
        console.log("After filtering sessions:", updatedSessions);
        return updatedSessions;
      };

      // Call filteredSessions with the current sessions and pass the result to setSessions
      const currentSessions = sessions; // Assuming sessions is the state variable
      const updatedSessions = filteredSessions(currentSessions);
      setSessions(updatedSessions);
      setShowDeleteModal(false);
      setSessionToDelete(null);
    } catch (error) {
      console.error("Error deleting session:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  return (
    <div style={{ backgroundColor: "red" }}>
      <h2>Sessions</h2>
      {sessions.map((aSession) => (
        <div key={aSession._id} id={aSession._id}>
          {/* Common part for both edit mode and view mode */}
          {editMode && editedSessions[aSession._id] ? (
            <>
              <label>
                Date:
                <DatePicker
                  selected={updatedSession.date}
                  dateFormat="dd-MM-yyyy"
                  locale="enGB"
                  onChange={(date) =>
                    setUpdatedSession((prevSession) => ({
                      ...prevSession,
                      date,
                    }))
                  }
                />
              </label>
              <label>
                Time:
                <DatePicker
                  selected={updatedSession.time}
                  locale="enGB"
                  onChange={(time) =>
                    setUpdatedSession((prevSession) => ({
                      ...prevSession,
                      time,
                    }))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="hh:mm aa"
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
            <div>
              <h3>
                Session Date:{" "}
                {format(new Date(aSession.dateTime), "dd-MM-yyyy")}
              </h3>
              <p>Status: {aSession.status}</p>
              <p>Points Cost: {aSession.pointsCost}</p>
              <p>Max Attendees: {aSession.maxAttendees}</p>

              {aSession.signedUp.includes(student.user._id) ? (
                <button onClick={() => handleUnbookButtonClick(aSession._id)}>
                  Unbook
                </button>
              ) : (
                <button onClick={() => handleBookButtonClick(aSession._id)}>
                  Book
                </button>
              )}

              {
                /* student.user.isAdmin*/ student.user && (
                  <>
                    <button onClick={() => handleEdit(aSession._id)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteButtonClick(aSession._id)}
                    >
                      Delete
                    </button>
                  </>
                )
              }
            </div>
          )}
        </div>
      ))}
      {showDeleteModal && (
        <GenericModal
          show={showDeleteModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this session?"
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}

export default ClassSessions;
