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
  const student = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  const bookPlace = async (sessionId) => {
    try {
      const bookedSession = await axios.patch(
        `${BACKEND_URL}/session/add-attendee/`,
        { signedUp: student.user._id, sessionId }
      );

      await axios.put(`${BACKEND_URL}/user/update-user/${student.user._id}`, {
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

  const unbookPlace = async (sessionId) => {
    try {
      const updatedSession = await axios.patch(
        `${BACKEND_URL}/session/remove-attendee/`,
        { signedUp: student.user._id, sessionId }
      );

      await axios.put(`${BACKEND_URL}/user/update-user/${student.user._id}`, {
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

  const handleBookButtonClick = (sessionId) => bookPlace(sessionId);
  const handleUnbookButtonClick = (sessionId) => unbookPlace(sessionId);

  const handleDeleteButtonClick = (sessionId) => {
    setShowDeleteModal(true);
    setSessionToDelete(sessionId);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSessionToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSession(sessionToDelete);
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionToDelete)
      );
      setShowDeleteModal(false);
      setSessionToDelete(null);
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "red" }}>
      <h2>Sessions</h2>
      {sessions.map((aSession) => {
        const isTeacher =
          student.user && student.user._id === aSession.teacherId;
        const isStudentSignedUp = aSession.signedUp.includes(student.user._id);
        const spotsLeft = aSession.maxAttendees - aSession.signedUp.length;

        return (
          <div key={aSession._id} id={aSession._id}>
            <div>
              <h3>Date: {format(new Date(aSession.dateTime), "dd-MM-yyyy")}</h3>
              <h3>Time: {format(new Date(aSession.dateTime), "HH:mm")}</h3>
              <p>Status: {aSession.status}</p>
              <p>Points Cost: {aSession.pointsCost}</p>
              <p>Max Attendees: {aSession.maxAttendees}</p>
              <p>Spots Left: {spotsLeft}</p>

              {isTeacher ? (
                <>
                  <button onClick={() => handleEditButtonClick(aSession._id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteButtonClick(aSession._id)}>
                    Delete
                  </button>
                </>
              ) : isStudentSignedUp ? (
                <button onClick={() => handleUnbookButtonClick(aSession._id)}>
                  Unbook
                </button>
              ) : spotsLeft > 0 ? (
                <button onClick={() => handleBookButtonClick(aSession._id)}>
                  Book
                </button>
              ) : (
                <button disabled>Full</button>
              )}
            </div>
          </div>
        );
      })}

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
