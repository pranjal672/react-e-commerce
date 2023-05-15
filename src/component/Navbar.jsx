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
    const { cart } = useContext(CartContext)

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

        session && getProfile()
    }, [session])

    return (
        <header>
            <div className="container">
                <nav>
                    <Link to="/" className="nav-logo"><FaOpencart /><span className="nav-logo-txt">Shopcart</span></Link>
                    <Search />
                    <button onClick={() => setDisplay(prev => !prev)} className="nav-btn">
                        {!display ? <FaAlignJustify /> : <FaMixer />}
                    </button>
                    <ul data-visible={display ? "true" : "false"} className="nav-mobile">
                        <li>
                            {
                                !session
                                    ? <Link to="/login" onClick={() => setDisplay(prev => !prev)}>Login</Link>
                                    : <Link to="/account" onClick={() => setDisplay(prev => !prev)}>{profile.username}</Link>
                            }
                        </li>
                        <li>
                            <Link className="nav-cart" to="/cart" onClick={() => setDisplay(prev => !prev)}><FaShoppingCart /><span>Cart</span><span className="nav-cart-num">{cartTotal}</span></Link>
                        </li>
                    </ul>
                    <ul className="nav-desktop">
                        <li>
                            {
                                !session
                                    ? <Link to="/login">Login</Link>
                                    : <Link to="/account">{profile.username}</Link>
                            }
                        </li>
                        <li>
                            <Link className="nav-cart" to="/cart"><FaShoppingCart /><span>Cart</span><span className="nav-cart-num">{cartTotal}</span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header >
    )
}

export default Navbar