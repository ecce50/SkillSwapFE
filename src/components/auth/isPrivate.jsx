/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/Auth.context"
import { useNavigate } from "react-router-dom"


function IsPrivate({ children }) {
    const { isLoading, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            navigate("/login");
        }
    }, [isLoading, isLoggedIn]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {children}
        </div>
    );
}


/*
function IsPrivate({ children }) {
    const { isLoading, isLoggedIn } = useContext(AuthContext)
    const nav = useNavigate();

    if (isLoading) { // if the page is loading then show this
        return <p>Loading...</p>
    }
    if (!isLoggedIn) { // once the page has loaded and isLoading is true, then user goes through this if statement, check if not logged in
        //return null;
        nav("/login")
    }

    return <div>{children}</div> // user sent to the page in the IsPrivate
}
*/

export default IsPrivate