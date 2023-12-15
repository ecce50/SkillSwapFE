import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/Auth.context";

function ReviewCreation({ classId }) {
  console.log("This is the passed classid: ", classId);
  const [score, setScore] = useState("");
  const [content, setContent] = useState("");
  const { authenticateUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const reviewer = user._id;

  // useEffect with an empty dependency array to log classId only once on mount
  useEffect(() => {
    console.log("This is the passed classid review: ", classId);

    // Clean up function (optional)
    return () => {
      // Code to run on component unmount or when classId changes (if needed)
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleReviewCreation = async (e) => {
    e.preventDefault();

    try {
      console.log("Payload before axios request review:", {
        reviewer,
        score,
        content,
        classId, //This is being console.logged every time we press a key. Should just be once?
      });

      const res = await axios.post(
        "http://localhost:5005/review/review-creation",
        {
          reviewer,
          score,
          content,
          classId,
        }
      );
      console.log("Here is the axios session-creation result", res);

      await authenticateUser();
    } catch (error) {
      console.error("This is the Session creation Create error", error);
    }
  };

  return (
    <div>
      <h2>Write a review</h2>
      <form onSubmit={handleReviewCreation}>
        <label>Content</label>
        <input
          value={content}
          required
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <label>Score</label>
        <input
          value={score}
          required
          onChange={(e) => {
            setScore(e.target.value);
          }}
        />
        <button type="submit">Post your review</button>
      </form>
    </div>
  );
}

export default ReviewCreation;
