import { Link } from "react-router-dom"
import Search from "./Search"
import CartContext from "../context/CartContext"
import { useContext, useEffect, useState } from "react"
import { FaShoppingCart, FaAlignJustify, FaMixer, FaOpencart } from "react-icons/fa"

const Navbar = () => {
    const [display, setDisplay] = useState(false)
    const [cartTotal, setCartTotal] = useState(0)
    const { cart } = useContext(CartContext)

    useEffect(() => {
        const qty = cart.reduce((acc, cur) => acc + cur.qty, 0)
        setCartTotal(qty)
    }, [cart])

    return (
        <header>
            <div className="container">
                <nav>
                    <Link to="/" className="nav-logo"><FaOpencart className="logo" /><span className="logo-text">shop</span></Link>
                    <Search />
                    <button onClick={() => setDisplay(prev => !prev)} className="nav-btn">
                        {!display ? <FaAlignJustify /> : <FaMixer />}
                    </button>
                    <ul data-visible={display ? "true" : "false"} className="nav-mobile">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link className="nav-cart-container" to="/cart"><FaShoppingCart /><span className="nav-cart-txt">cart</span><span className="nav-cart-num">{cartTotal}</span></Link>
                        </li>
                    </ul>
                    <ul className="nav-desktop">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link className="nav-cart-container" to="/cart"><FaShoppingCart /><span className="nav-cart-txt">cart</span><span className="nav-cart-num">{cartTotal}</span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header >
    )
}

export default Navbar