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
        <h2>Class Sessions</h2>
        {sessions.length === 0 ? (
            <p>No Sessions Listed</p>
        ):(
            sessions.map((aSession) => (
                <div key={aSession._id}>
                    <h2>Session Date: {aSession.date} </h2>
                    <h2>Session Time: {aSession.time}</h2>
                    <h2>Session Level: {aSession.status}</h2>
                    <h2>Session Cost: {aSession.pointsCost} points</h2>

                    <button onClick={() => deleteSession(aSession._id)}>Delete Session</button>
                </div>

            ))
        )}
    </div>
  )
}

export default ClassSessions
