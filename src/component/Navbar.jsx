import { Link } from "react-router-dom"
import Search from "./Search"
import CartContext from "../context/CartContext"
import { useContext, useState } from "react"
import { FaShoppingCart, FaAlignJustify, FaMixer } from "react-icons/fa"

const Navbar = () => {
    const [display, setDisplay] = useState(false)
    const { cart } = useContext(CartContext)

    return (
        <header>
            <div className="container">
                <nav>
                    <Link to="/" className="nav-logo">ps ecom</Link>
                    <Search />
                    <button onClick={() => setDisplay(prev => !prev)} className="nav-btn">
                        {!display ? <FaAlignJustify /> : <FaMixer />}
                    </button>
                    <ul className={display ? "nav-mobile" : "hide"}>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="nav-cart-container">
                            <FaShoppingCart />
                            <Link to="/cart"><span className="nav-cart-txt">Cart</span><span className="nav-cart-num">{cart.length}</span></Link>
                        </li>
                    </ul>
                    <ul className="nav-desktop">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="nav-cart-container">
                            <FaShoppingCart />
                            <Link to="/cart"><span className="nav-cart-txt">Cart</span><span className="nav-cart-num">{cart.length}</span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header >
    )
}

export default Navbar