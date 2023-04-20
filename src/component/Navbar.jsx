import { Link } from "react-router-dom"
import Search from "./Search"
import CartContext from "../context/CartContext"
import { useContext, useState } from "react"
import { FaShoppingCart, FaAlignJustify } from "react-icons/fa"

const Navbar = () => {
    const [display, setDisplay] = useState(false)
    const { cart } = useContext(CartContext)

    return (
        <header>
            <div className="container">
                <nav>
                    <Link to="/" className="nav-logo">E Store</Link>
                    <Search />
                    <button onClick={() => setDisplay(prev => !prev)} className="nav-btn">
                        <FaAlignJustify />
                    </button>
                    <ul className={display ? "nav-mobile" : "hide"}>
                        <li>
                            <Link to="/login" className="link">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="link">Register</Link>
                        </li>
                        <li className="cart-container">
                            <FaShoppingCart />
                            <Link to="/cart" className="link"><span className="cart-txt">Cart</span><span className="cart-num">{cart.length}</span></Link>
                        </li>
                    </ul>
                    <ul className="nav-desktop">
                        <li>
                            <Link to="/login" className="link">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="link">Register</Link>
                        </li>
                        <li className="cart-container">
                            <FaShoppingCart />
                            <Link to="/cart" className="link"><span className="cart-txt">Cart</span><span className="cart-num">{cart.length}</span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header >
    )
}

export default Navbar