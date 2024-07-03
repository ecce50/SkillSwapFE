import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/Auth.context";
import { BACKEND_URL } from "../../config/config.index.js";
import Accordion from "../general/Accordion.jsx";

function SessionCreation({ classId, teacherId }) {
  //console.log("This is the passed classid: ", classId);

  // This code is to provide default values for sessions to make testing easier. Can be deleted afterwards

  //Below code was to make it easier to create sessions, but could be affecting the update of the sessions

  // const getDefaultDate = () => {
  //   const twoMonthsFromNow = new Date();
  //   twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
  //   return twoMonthsFromNow.toISOString().split("T")[0];
  // };

  // const getDefaultTime = () => {
  //   const now = new Date();
  //   const hours = now.getHours().toString().padStart(2, "0");
  //   const minutes = now.getMinutes().toString().padStart(2, "0");
  //   return `${hours}:${minutes}`;
  // };

  //Reinstate this code when finished with testing ***

  const [date, setDate] = useState("");
  // const [time, setTime] = useState("");
  // const [status, setStatus] = useState("");
  // const [pointsCost, setPointsCost] = useState("");
  // const { authenticateUser } = useContext(AuthContext);

  // ***

  //Delete this code when finished with testing ***

  // const [date, setDate] = useState(getDefaultDate());
  // const [time, setTime] = useState(getDefaultTime());
  const [time, setTime] = useState();
  const [status, setStatus] = useState("Beginners");
  const [pointsCost, setPointsCost] = useState(1);
  const [maxAttendees, setMaxAttendees] = useState(10);
  const { authenticateUser } = useContext(AuthContext);

  // ***

  // *** WHAT DOES THIS CODE DO??

  // useEffect with an empty dependency array to log classId only once on mount
  // useEffect(() => {
  //console.log("This is the passed classid: ", classId);

  // Clean up function (optional)
  // return () => {
  // Code to run on component unmount or when classId changes (if needed)
  // };
  // }, []); // Empty dependency array means this effect runs once on mount

  // ***

  // useEffect(() => {
  //   // Use this effect if you want to update the time every minute
  //   const intervalId = setInterval(() => {
  //     setTime(getDefaultTime());
  //   }, 60000);

  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, []);

  const handleSessionCreation = async (e) => {
    e.preventDefault();

    try {
      //console.log("Payload before axios request:", {
      //  date,
      //  time,
      //  status,
      //  pointsCost,
      //  classId, //This is being console.logged every time we press a key. Should just be once?
      //});

      const res = await axios.post(`${BACKEND_URL}/session/create-session`, {
        date,
        time,
        status,
        pointsCost,
        classId,
        maxAttendees,
        teacherId,
      });
      //console.log("Here is the axios session-creation result", res);

      await authenticateUser();
    } catch (error) {
      console.error("This is the Session creation Create error", error);
    }
  };

  return (
    <div>
      <Accordion title="Create a Session">
        <h3>Create a Session</h3>
        <form onSubmit={handleSessionCreation}>
          <label>Date DD-MM-YYYY</label>
          <input
            value={date}
            required
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <label>Time</label>
          <input
            value={time}
            required
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <label>Ideal for</label>
          <input
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          <label>Points</label>
          <input
            value={pointsCost}
            required
            onChange={(e) => {
              setPointsCost(e.target.value);
            }}
          />
          <label>Max attendees</label>
          <input
            value={maxAttendees}
            required
            onChange={(e) => {
              setMaxAttendees(e.target.value);
            }}
          />
          <button type="submit">Add a session</button>
        </form>
      </Accordion>
    </div>
  );
}

export default SessionCreation;
