import { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
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
    }, [session])


    return (
        <main>
            <div className="container">
                <div className="dashboard">
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <p>Hello {profile?.username}</p>
                        </div>
                        <div className="dashboard-element">
                            <p><Link to="/account/profile">Profile</Link></p>
                        </div>
                        <div className="dashboard-element">
                            <p><Link to="/account/orders">Orders</Link></p>
                        </div>
                        <div className="dashboard-element">
                            <p><Link to="/cart?focus=true">Wishlist</Link></p>
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