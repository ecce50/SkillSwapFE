import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/Auth.context";
import { BACKEND_URL } from "../../config/config.index.js";
import Accordion from "../general/Accordion.jsx";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { enGB } from 'date-fns/locale/en-GB';
registerLocale('enGB', enGB)
import "react-datepicker/dist/react-datepicker.css";


function SessionCreation({ classId, teacherId }) {

  // This code is to provide default values for sessions to make testing easier. Can be deleted afterwards

  //Reinstate this code when finished with testing ***

  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState ("");
  // const [time, setTime] = useState("");
  // const [status, setStatus] = useState("");
  // const [pointsCost, setPointsCost] = useState("");
  // const { authenticateUser } = useContext(AuthContext);

  // ***

  //Delete this code when finished with testing ***
  const [time, setTime] = useState();
  const [status, setStatus] = useState("Beginners");
  const [pointsCost, setPointsCost] = useState(1);
  const [maxAttendees, setMaxAttendees] = useState(10);
  const { authenticateUser } = useContext(AuthContext);

  // ***


  const handleSessionCreation = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BACKEND_URL}/session/create-session`, {
        date,
        time,
        status,
        pointsCost,
        classId,
        maxAttendees,
        teacherId,
      });

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
          <DatePicker locale= "enGB" 
          selected={startDate}
          dateFormat="dd-MM-yyyy" 
          onChange={(date) => {
            setStartDate(date);
            setDate(date);
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
