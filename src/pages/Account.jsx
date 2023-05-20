import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SessionContext from "../context/SessionContext";
import { supabase } from "../supabaseClient";

const Account = () => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState([])
    const { session } = useContext(SessionContext)

    useEffect(() => {
        const getProfile = async () => {
            const { data, error } = await supabase.from("profiles").select("*").eq("id", session?.user.id)
            if (error) console.log(error)
            setProfile(data[0])
        }

        session && getProfile()
        !session && navigate("/login")
    }, [session])

    return (
        <main>
            <div className="container">
                <div className="dashboard">
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <p><span>Welcome</span> <span>{profile?.username}</span></p>
                        </div>
                        <div className="dashboard-element">
                            <p><Link to="/account/profile">My Profile</Link></p>
                        </div>
                        <div className="dashboard-element">
                            <p><Link to="/account/orders">My Orders</Link></p>
                        </div>
                        <div className="dashboard-element">
                            <p><Link to="/cart?focus=true">My Wishlist</Link></p>
                        </div>
                    </div>
                    <div className="profile-container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Account