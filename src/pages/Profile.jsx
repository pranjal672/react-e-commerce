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
            username: userName ? userName : profile.username,
            fullname: fullName ? fullName : profile.fullname,
            address: address ? address : profile.address,
            email: email ? email : profile.email,
            phone: phone ? phone : profile.phone
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
                    <h3>Username</h3><span>{profile?.username ? profile?.username : "username not set."}</span>
                    <p>
                        <input value={userName} disabled={active ? false : true} type="text" onChange={(e) => setUserName(e.target.value)} />
                    </p>
                </section>
                <section className="profile-element">
                    <h3>Fullname</h3><span>{profile?.fullname ? profile?.fullname : "fullname not set."}</span>
                    <p>
                        <input value={fullName} disabled={active ? false : true} type="text" onChange={(e) => setFullName(e.target.value)} />
                    </p>
                </section>
                <section className="profile-element">
                    <h3>Address</h3><span>{profile?.address ? profile?.address : "address not set."}</span>
                    <p>
                        <input value={address} disabled={active ? false : true} type="text" onChange={(e) => setAddress(e.target.value)} />
                    </p>
                </section>
                <section className="profile-element">
                    <h3>Email</h3><span>{profile?.email ? profile?.email : "email not set."}</span>
                    <p>
                        <input value={email} disabled={active ? false : true} type="email" onChange={(e) => setEmail(e.target.value)} />
                    </p>
                </section>
                <section className="profile-element">
                    <h3>Phone Number</h3><span>{profile?.phone ? profile?.phone : "phone number not set."}</span>
                    <p>
                        <input value={phone} disabled={active ? false : true} type="tel" onChange={(e) => setPhone(e.target.value)} pattern="^(\+91|0)?[6789]\d{9}$" />
                    </p>
                </section>
                <section className="flex">
                    {!active && <button type="button" onClick={() => setActive(prev => !prev)} className="btn" disabled={session ? false : true}>Edit</button>}
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