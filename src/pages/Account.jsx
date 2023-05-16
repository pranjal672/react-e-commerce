import { useContext, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import SessionContext from "../context/SessionContext";

const Account = () => {
    const navigate = useNavigate()

    const { session } = useContext(SessionContext)

    useEffect(() => {
        !session && navigate("/login")
    }, [])

    const logOut = () => {
        supabase.auth.signOut()
        navigate("/")
    }

    return (
        <main>
            <div className="container">
                <div className="dashboard">
                    <h1>User Dashboard</h1>
                    <div className="dashboard-container">
                        <div className="dashboard-element">
                            <p><Link to="/profile">My Profile</Link></p>
                        </div>
                        <div className="dashboard-element">
                            <p><Link to="/orders">My Orders</Link></p>
                        </div>
                    </div>
                    <p>
                        <button className="btn" onClick={() => logOut()}>Sign out</button>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Account