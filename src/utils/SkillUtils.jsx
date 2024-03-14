import axios from "axios";
import { fetchClassesBySkillId } from "./ClassUtils";
import { deleteClass } from "./ClassUtils";
import { BACKEND_URL } from "../config/config.index.js";

export const deleteSkill = async (skillId) => {
  try {
    const classes = await fetchClassesBySkillId(skillId); // Deleting associated classes before deleing the skil

    console.log("Before Promise.all");
    await Promise.all(
      classes.map(async (aClass) => {
        try {
          console.log("Deleting class: ", aClass._id);
          await deleteClass(aClass._id);
          console.log("Class deleted successfully: ", aClass._id);
        } catch (classError) {
          console.error("Error when deleting class:", classError);
          throw classError;
        }
      })
    );
    console.log("After Promise.all");
    console.log("All classes deleted successfully");

    console.log("Deleting skill: ", skillId);
    const response = await axios.delete(
      `${BACKEND_URL}/skill/delete-skill/${skillId}`
    );
    console.log("Skill deletion response:", response.status, response.data);

    if (response.status === 200) {
      console.log("Skill deleted successfully");
      // Update state to trigger a re-render
      setSkills((prevSkills) => prevSkills.filter((s) => s._id !== skillId));
    } else {
      console.error(
        "Failed to delete skill. Response:",
        response.status,
        response.data
      );
    }
  } catch (error) {
    console.error("Error when deleting skills, class and sessions:", error);
  }
};
