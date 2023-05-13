import { useContext } from "react";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import SessionContext from "../context/SessionContext";

const Profile = () => {
    const { session } = useContext(SessionContext)
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState("")
    const [fullName, setFullName] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [websiteUrl, setWebsiteUrl] = useState("")

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.from("profiles").update({
            updated_at: new Date(),
            username: userName,
            full_name: fullName,
            avatar_url: avatarUrl,
            website: websiteUrl
        }).eq("id", session?.user.id)
        if (error) console.error(error)
        else {
            alert('Profile updated!')
        }
        setLoading(false)
    }

    return (
        <main>
            <div className="container">
                <div className='profile'>
                    <div className="form-container">
                        <h1>Update Profile</h1>
                        <form className="form-widget" onSubmit={handleUpdateProfile}>
                            <div className="profile-div">
                                <label htmlFor={userName} style={{ fontWeight: "bold" }}>User Name</label>
                                <input
                                    className="inputField"
                                    type="text"
                                    placeholder="Your User Name"
                                    value={userName}
                                    required={true}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="profile-div">
                                <label htmlFor={fullName} style={{ fontWeight: "bold" }}>Full Name</label>
                                <input
                                    className="inputField"
                                    type="text"
                                    placeholder="Your Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="profile-div">
                                <label htmlFor={avatarUrl} style={{ fontWeight: "bold" }}>Avatar URL</label>
                                <input
                                    className="inputField"
                                    type="text"
                                    placeholder="Your Avatar URL"
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                />
                            </div>
                            <div className="profile-div">
                                <label htmlFor={websiteUrl} style={{ fontWeight: "bold" }}>Website URL</label>
                                <input
                                    className="inputField"
                                    type="text"
                                    placeholder="Your Website URL"
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                />
                            </div>
                            <div className="center">
                                <button className="btn" disabled={loading}>
                                    {loading ? <span>Loading</span> : <span>Update Profile</span>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default Profile