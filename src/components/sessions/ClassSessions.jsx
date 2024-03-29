import React, { useEffect, useState } from 'react'
import {
    fetchSessionsByClassId,
    deleteSession,
} from '../../utils/SessionUtils';
 

function ClassSessions({classId}) {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try{
                const sessions = await fetchSessionsByClassId(classId);
                setSessions(sessions);
            } catch (error) {
                console.error("Error when fetching the sessions:", error);
            }
        };

        fetchSessions();
    }, [classId]);

    const deleteSessionAPI = async (sessionId) => {
        try {
            await deleteSession(sessionId);
        } catch (error) {
            console.error("Error when deleting session:", error);
        }
    };


  return (
    <div>
        <h2>Sessions</h2>
        {sessions.length === 0 ? (
            <p>No sessions listed</p>
        ):(
            sessions.map((aSession) => (
                <div key={aSession._id}>
                    <p className="labelTitle">Date {aSession.date} </p>
                    <p>Time {aSession.time}</p>
                    <p>Level {aSession.status}</p>
                    <p>Cost {aSession.pointsCost} points</p>

                    <button onClick={() => deleteSession(aSession._id)}>Delete session</button>
                </div>

            ))
        )}
    </div>
  )
}

export default ClassSessions
