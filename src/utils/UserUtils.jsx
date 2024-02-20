import axios from "axios";
import { deleteSkill } from "./SkillUtils";

export const fetchTeacherByUserId = async (teacherId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `http://localhost:5005/user/userinfo?teacherId=${teacherId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("fetchTeacherByUserId response: ", response.data.teacher);
    return response.data.teacher;
  } catch (error) {
    console.error("Error when fetching teacher:", error);
    return [];
  }
};

export const fetchSkillsByUserId = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:5005/skill/skills?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        console.log("fetchSkillsByUserId response: ", response.data.skills)
      return response.data.skills;
    } catch (error) {
      console.error("Error when fetching skills:", error);
      return [];
    }
  };

  export const deleteUser = async (userId) => {
    try {
      const skills = await fetchSkillsByUserId(userId);
  
      console.log("Before Promise.all");
      await Promise.all(
        skills.map(async (skill) => {
          try {
            console.log("Deleting skill: ", skill._id);
            await deleteSkill(skill._id);
            console.log("Skill deleted successfully: ", skill._id);
          } catch (skillError) {
            console.error("Error when deleting skill:", skillError);
            throw skillError;
          }
        })
      );
      console.log("After Promise.all");
      console.log("All skills deleted successfully");
  
      console.log("Deleting user: ", userId);
      const response = await axios.delete(
        `http://localhost:5005/user/delete-user/${userId}`
      );
      console.log("User deletion response:", response.status, response.data);
  
      if (response.status === 200) {
        console.log("User deleted successfully");
        // Update state to trigger a re-render
        setUser((prevUser) => prevUser.filter((u) => u._id !== userId));
      } else {
        console.error(
          "Failed to delete User. Response:",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("Error when deleting User and skills:", error);
    }
  };