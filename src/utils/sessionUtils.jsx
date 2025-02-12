import axios from "axios";
import { BACKEND_URL } from "../config/config.index.js";

/* export const fetchSessionsByClassId = async (classId) => {
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

/*     // Assuming response.data.sessions is an object containing arrays of sessions,
    // you can extract all the session objects into a single array.
    const nestedSessions = response.data.sessions;

    // Flatten the nested structure into a single array
    const flattenedSessions = Object.values(nestedSessions).flat();
    console.log("The flattened sessions: ", flattenedSessions) */

/*     return flattenedSessions; */
/*   } catch (error) {
    console.error("Error when fetching sessions:", error);
    return [];
  }
}; */


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

     return response.data;
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

