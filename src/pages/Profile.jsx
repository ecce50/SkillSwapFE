/* eslint-disable no-unused-vars */
import { AuthContext } from "../context/Auth.context"
import { useContext } from "react"
import Navbar from "../components/Navbar"
import Logout from "../components/Logout"

function Profile() {
    const { authenticateUser, user } = useContext(AuthContext)

 
 
    return (
        <>
        <Navbar/>
        <div>Profile</div>
            <h3>Welcome {user ? user.email : null} </h3>
        <Logout/>
      </>
  )
}

export default Profile