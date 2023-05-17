import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SessionContext from "../context/SessionContext";

const Account = () => {
    const navigate = useNavigate()

    const { session } = useContext(SessionContext)

    useEffect(() => {
        !session && navigate("/login")
    }, [])

    return (
        <main>
            <div className="container">
                <div className="dashboard">
                    <h1>User Dashboard</h1>
                    <div className="dashboard-container">
                        <div className="dashboard-element">
                            <p><Link to="/profile">Profile</Link></p>
                        </div>
                        <div className="dashboard-element">
                            <p><Link to="/orders">Orders</Link></p>
                        </div>
                        <div className="dashboard-element">
                            <p><Link to="/cart?focus=true">Wishlist</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Account