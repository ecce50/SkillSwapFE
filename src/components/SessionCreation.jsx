import axios from "axios";
import {useContext, useState} from "react";
import { AuthContext } from "../context/Auth.context";

function SessionCreation({classId}) {

    const [date, setDate] = useState ("");
    const [time, setTime] = useState ("");
    const [status, setStatus] =useState ("");
    const [pointsCost, setPointsCost] = useState ("");
    const { authenticateUser } = useContext(AuthContext);

    const handleSessionCreation = async (e) => {

        e.preventDefault();

        try {

            console.log("Payload before axios request:", { date, time, status, pointsCost, classId });

            const res = await axios.post ("http://localhost:5005/session/session-creation",
                {
                    date,
                    time,
                    status,
                    pointsCost,
                    classId,
                }
            );
            console.log("Here is the axios session-creation result", res);

            await authenticateUser();
            
        } catch (error) {
            console.error ("This is the Session creation Create error", error);
        }

    }

  return (
    <div>
        <h2>Create a Session</h2>
        <form onSubmit={handleSessionCreation} >
            <label>Date</label>
            <input value={date} required onChange={(e) => {setDate (e.target.value);}}/>
            <label>Time</label>
            <input value={time} required onChange={(e) => {setTime (e.target.value);}}/>
            <label>Ideal for</label>
            <input value={status} onChange={(e) => {setStatus (e.target.value);}}/>
            <label>Points</label>
            <input value={pointsCost} required onChange={(e) => {setPointsCost (e.target.value);}}/>
            <button type="submit">Add a Session</button>
        </form>
    </div>
  )
}

export default SessionCreation;