import { Link } from "react-router-dom"
import Search from "./Search"
import CartContext from "../context/CartContext"
import SessionContext from "../context/SessionContext"
import { useContext, useEffect, useState } from "react"
import { FaShoppingCart, FaAlignJustify, FaMixer, FaOpencart } from "react-icons/fa"
import { supabase } from "../supabaseClient"

const Navbar = () => {
    const { session } = useContext(SessionContext)
    const [profile, setProfile] = useState([])
    const [display, setDisplay] = useState(false)
    const [cartTotal, setCartTotal] = useState(0)
    const { cart, setCart, setWishList } = useContext(CartContext)

    useEffect(() => {
        const qty = cart.reduce((acc, cur) => acc + cur.qty, 0)
        setCartTotal(qty)
    }, [cart])

    useEffect(() => {
        const getProfile = async () => {
            const { data, error } = await supabase.from("profiles").select("*").eq("id", session?.user?.id)
            if (error) console.log(error)
            setProfile(...data)
        }
        const getCartData = async () => {
            const { data, error } = await supabase.from("cart").select("*").eq("user_id", session?.user.id)
            if (error) console.error(error)
            setCart(data)
        }
        const getWishData = async () => {
            const { data, error } = await supabase.from("wishlist").select("*").eq("user_id", session?.user.id)
            if (error) console.error(error)
            setWishList(data)
        }
        session && getProfile()
        session && getWishData()
        session && getCartData()
    }, [session])

    const logOut = () => {
        setDisplay(prev => !prev)
        supabase.auth.signOut()
        navigate("/")
    }

    return (
        <header>
            <div className="container">
                <nav>
                    <Link to="/" className="nav-logo"><FaOpencart /><span>Shopcart</span></Link>

                    <Search />

                    <div className="flex">
                        <Link className="nav-cart" to="/cart"><FaShoppingCart /><span className="nav-logo-txt">Cart</span><span className="nav-cart-num">{cartTotal}</span></Link>

                        <button onClick={() => setDisplay(prev => !prev)} className="nav-btn">
                            {!display ? <FaAlignJustify /> : <FaMixer />}
                        </button>
                    </div>

                    <ul data-visible={display ? "true" : "false"} className="nav-mobile">
                        <li><Link to="/account" onClick={() => setDisplay(prev => !prev)}>Account</Link></li>
                        <li>{!session && <Link to="/login" onClick={() => setDisplay(prev => !prev)}>Login</Link>}
                        </li>
                        <li>{session && <button style={{ color: "white", fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }} onClick={() => logOut()}>Logout</button>}
                        </li>
                    </ul>
                    <ul className="nav-desktop">
                        <li><Link to="/account">Account</Link></li>
                        <li>{!session && <Link to="/login">Login</Link>}
                        </li>
                        <li>{session && <button style={{ color: "white", fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }} onClick={() => logOut()}>Logout</button>}
                        </li>
                    </ul>
                </nav>
            </div>
        </header >
    )
}

export default Navbar