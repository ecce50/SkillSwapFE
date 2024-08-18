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
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { enGB } from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("enGB", enGB);

function ClassSessions({ sessions, classId, setSessions }) {
  // const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
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

  //Fetch sessions when component mounts or classId changes
  // useEffect(() => {
  //   const fetchSessions = async () => {
  //     try {
  //       const sessions = await fetchSessionsByClassId(classId);
  //       setSessions(sessions);
  //       setLoading(false);
  //       console.log("Here are the sessions: ", sessions);
  //     } catch (error) {
  //       console.error("Error when fetching the sessions:", error);
  //     }
  //   };
  //   fetchSessions();
  // }, [classId]);

  const bookPlace = async (sessionId, classId) => {
    console.log("Here is all the student data: ", student);
    console.log(
      "student.user.attendingSessions:",
      student.user.attendingSessions
    );
    try {
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
    const sessionToEdit = sessions.find((c) => c._id === sessionId);
           const dateTime = new Date(sessionToEdit.dateTime);
    setUpdatedSession({
      ...sessionToEdit,
      // date: new Date(sessionToEdit.dateTime),
      // time: new Date(sessionToEdit.dateTime),
      //writing a comment to make a new push
 
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
        setSessions((prevSession) =>
          prevSession.map((c) => (c._id === sessionId ? updatedSessionData : c))
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

/*   const handleConfirmDelete = () => {
    deleteSession(sessionToDelete);
    setShowDeleteModal(false);
    setSessionToDelete(null);
  }; */

  /* const handleConfirmDelete = async () => {
    console.log("handleConfirmDelete was called")
    try {
      await deleteSession(sessionToDelete);

      setSessions((prevSessions) => {
        console.log("---------------DELETE PREV. this is the prevSessions:", prevSessions);
        const updatedSessions = prevSessions.filter((session) => session._id !== sessionToDelete);
        console.log("Updated sessions after deletion:", Array.isArray(updatedSessions), updatedSessions);
        return updatedSessions;
      });
      
      // Remove the deleted session from the list of sessions
/*       setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionToDelete),
        console.log ("---------------DELETE PREV. this is the prevSessions:", prevSessions)
      ); */
  
      // Close the modal and reset the sessionToDelete state
      /*setShowDeleteModal(false);
      setSessionToDelete(null);
      console.log ("---------------DELETE this is the session now:", sessions);
    } catch (error) {
      console.error("Error when deleting session:", error);
    }
  }; */

  const handleConfirmDelete = async () => {
    console.log("handleConfirmDelete was called");
    try {
      console.log("Before calling deleteSession");
      await deleteSession(sessionToDelete);
      console.log("After calling deleteSession");
  
      setSessions((prevSessions) => {
        console.log("Before filtering sessions:", prevSessions);
        const updatedSessions = prevSessions.filter((session) => session._id !== sessionToDelete);
        console.log("After filtering sessions:", updatedSessions);
        return updatedSessions;
      });
  
      setShowDeleteModal(false);
      setSessionToDelete(null);
    } catch (error) {
      console.error("Error when deleting session:", error);
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
            <>
              {aSession.dateTime && (
                <>
                  <p>
                    Date: {format(new Date(aSession.dateTime), "dd-MM-yyyy")}
                  </p>
                  <p>Time: {format(new Date(aSession.dateTime), "hh:mm aa")}</p>
                </>
              )}
              {/* {aSession.time && <p>Time: {aSession.time}</p>} */}
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
