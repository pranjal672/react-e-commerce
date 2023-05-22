import { Link, useNavigate } from "react-router-dom"
import Search from "./Search"
import CartContext from "../context/CartContext"
import SessionContext from "../context/SessionContext"
import { useContext, useEffect, useState } from "react"
import { FaShoppingCart, FaAlignJustify, FaMixer, FaOpencart } from "react-icons/fa"
import { supabase } from "../supabaseClient"
import { RiLogoutCircleRLine, RiLoginCircleLine } from "react-icons/ri"

const Navbar = () => {
    const navigate = useNavigate()
    const { session } = useContext(SessionContext)
    const [display, setDisplay] = useState(false)
    const [cartTotal, setCartTotal] = useState(0)
    const { cart, setCart, setWishList } = useContext(CartContext)

    useEffect(() => {
        const qty = cart.reduce((acc, cur) => acc + cur.qty, 0)
        setCartTotal(qty)
    }, [cart])

    useEffect(() => {
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
                        <li>{!session ? <Link to="/login" onClick={() => setDisplay(prev => !prev)}>Login</Link> : <button style={{ fontWeight: "bold", color: "white" }} onClick={() => logOut()}>Logout</button>}
                        </li>
                    </ul>
                    <ul className="nav-desktop">
                        <li><Link to="/account">Account</Link></li>
                        {!session ? <li data-tooltip="Login" className="logout"><Link to="/login"><RiLoginCircleLine /></Link></li> : <li data-tooltip="Logout" className="logout">{session && <button onClick={() => logOut()}><RiLogoutCircleRLine /></button>}
                        </li>}
                    </ul>
                </nav>
            </div>
        </header >
    )
}

export default Navbar