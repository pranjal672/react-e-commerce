import SessionContext from "../context/SessionContext"
import { useContext } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate, Link } from "react-router-dom"

const Account = () => {
    const { session } = useContext(SessionContext)
    const { user } = session
    const navigate = useNavigate()

    const logOut = () => {
        // if (localStorage.getItem("cart")) localStorage.removeItem("cart")
        supabase.auth.signOut()
        navigate("/")
    }

    return (
        <main>
            <div className="container">
                <h1>User Dashboard</h1>
                <div className="dashboard">
                    <div className="dashboard-element">
                        <p><Link to="/profile">My Profile</Link></p>
                    </div>
                    <div className="dashboard-element">
                        <p><Link to="/orders">My Orders</Link></p>
                    </div>
                </div>
                <button className="btn" onClick={() => logOut()}>Sign out</button>
            </div>
        </main>
    )
}

export default Account