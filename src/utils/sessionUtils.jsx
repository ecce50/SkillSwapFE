import axios from "axios";
import { BACKEND_URL } from "../config/config.index.js";

export const fetchSessionsByClassId = async (classId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BACKEND_URL}/session/sessions?classId=${classId}`,
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
      `${BACKEND_URL}/session/delete-session/${sessionId}`
    );
    console.log("sessutils After session deletion:", sessionId);
    return Promise.resolve();
  } catch (error) {
    console.error("Error when deleting session:", error);
    return Promise.reject(error);
  }
};

