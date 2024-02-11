import axios from "axios";

export const fetchSessionsByClassId = async (classId) => {
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

    return response.data.sessions;
  } catch (error) {
    console.error("Error when fetching sessions:", error);
    return [];
  }
};

// Utility function to delete a session by ID
export const deleteSession = async (sessionId) => {
  try {
    console.log("sessutils Before session deletion:", sessionId);
    await axios.delete(
      `http://localhost:5005/session/delete-session/${sessionId}`
    );
    console.log("sessutils After session deletion:", sessionId);
    return Promise.resolve();
  } catch (error) {
    console.error("Error when deleting session:", error);
    return Promise.reject(error);
  }
};

