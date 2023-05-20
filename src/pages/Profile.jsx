import { useContext, useEffect } from "react";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import SessionContext from "../context/SessionContext";

const Profile = () => {
    const [profile, setProfile] = useState([])
    const { session } = useContext(SessionContext)
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(false)
    const [userName, setUserName] = useState("")
    const [fullName, setFullName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        const getProfile = async () => {
            const { data, error } = await supabase.from("profiles").select("*").eq("id", session?.user.id)
            if (error) console.log(error)
            setProfile(data[0])
        }

        session && getProfile()
    }, [session])

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.from("profiles").update({
            updated_at: new Date(),
            username: userName,
            fullname: fullName,
            address: address,
            email: email,
            phone: phone
        }).eq("id", session?.user.id)
        if (error) console.error(error)
        else {
            alert('Profile updated!')
        }
        setLoading(false)
    }

    return (
        <section>
            <form className='profile' onSubmit={handleUpdateProfile}>
                <section className="profile-element">
                    <h3>Username</h3>
                    <p>
                        <input value={userName} disabled={active ? false : true} type="text" placeholder={profile?.username ? profile?.username : "...add username"} onChange={(e) => setUserName(e.target.value)} required />
                    </p>
                </section>
                <section className="profile-element">
                    <h3>Fullname</h3>
                    <p>
                        <input value={fullName} disabled={active ? false : true} type="text" placeholder={profile?.fullname ? profile?.fullname : "...add fullname"} onChange={(e) => setFullName(e.target.value)} />
                    </p>
                </section>
                <section className="profile-element">
                    <h3>Address</h3>
                    <p>
                        <input value={address} disabled={active ? false : true} type="text" placeholder={profile?.address ? profile?.address : "...add address"} onChange={(e) => setAddress(e.target.value)} required />
                    </p>
                </section>
                <section className="profile-element">
                    <h3>Email</h3>
                    <p>
                        <input value={email} disabled={active ? false : true} type="email" placeholder={profile?.email ? profile?.email : "...add email"} onChange={(e) => setEmail(e.target.value)} required />
                    </p>
                </section>
                <section className="profile-element">
                    <h3>Phone Number</h3>
                    <p>
                        <input value={phone} disabled={active ? false : true} type="number" placeholder={profile?.phone ? profile?.phone : "...add phone number"} onChange={(e) => setPhone(e.target.value)} />
                    </p>
                </section>
                <section className="flex">
                    {!active && <button type="button" onClick={() => setActive(prev => !prev)} className="btn">Edit</button>}
                    {active && <>
                        <button type="button" onClick={() => setActive(prev => !prev)} className="btn">Cancel</button>
                        <button disabled={loading ? true : false} type="submit" className="btn">Update Profile</button>
                    </>}
                </section>
            </form>
        </section>
    )
}

export default Profile