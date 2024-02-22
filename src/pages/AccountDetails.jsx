import React from 'react'
import {fetchSkillsByUserId, deleteUser} from "../utils/UserUtils";
import { AuthContext } from '../context/Auth.context';
import { useContext } from 'react';


function AccountDetails() {

    const { user, setUser } = useContext(AuthContext);
    

  return (
    <div>
        <button onClick={() => deleteUser(user._id)}>Delete</button>
        <button onClick={() => fetchSkillsByUserId(user._id)}> Fetch Skills</button>
    </div>
  )
}

export default AccountDetails