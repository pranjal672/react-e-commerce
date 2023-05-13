import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({ email })

        if (error) {
            alert(error.error_description || error.message)
        } else {
            alert('Check your email for the login link!')
        }
        setLoading(false)
    }

    // const registerFakeUser = async () => {

    //     const { error } = await supabase.auth.signUp({
    //         email: 'sapod34321@andorem.com',
    //         password: 'lolfaketroll@123'
    //     })

    //     if (error) {
    //         alert(error.error_description || error.message)
    //     } else {
    //         alert('Check your email for the confirmation!')
    //     }

    // }

    const loginFakeUser = async () => {

        const { error } = await supabase.auth.signInWithPassword({
            email: 'sapod34321@andorem.com',
            password: 'lolfaketroll@123'
        })

        if (error) {
            alert(error.error_description || error.message)
        } else {
            navigate("/")
        }

    }

    return (
        <div className='login'>
            <div className="form-container">
                <h1>Login</h1>
                <p>Sign in via magic link with your email below</p>
                <form className="form-widget" onSubmit={handleLogin}>
                    <div>
                        <input
                            className="inputField"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn full-width" disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Send magic link</span>}
                        </button>
                    </div>
                </form>
                <button className="btn full-width" onClick={() => loginFakeUser()}>
                    <span>Guest Login</span>
                </button>
            </div>
        </div>
    )
}