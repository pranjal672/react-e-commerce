import { useContext, useState, useEffect } from "react"
import SessionContext from "../context/SessionContext"
import { useNavigate } from "react-router-dom"
import { supabase } from '../supabaseClient'
import CartContext from "../context/CartContext"

const Checkout = () => {
    const navigate = useNavigate()
    const { session } = useContext(SessionContext)
    const { cart } = useContext(CartContext)
    const [address, setAddress] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const getAddress = async () => {
            const { data, error } = await supabase.from("profiles").select("address").eq("id", session?.user.id)
            if (error) console.log(error)
            setAddress(data[0].address)
        }
        session && getAddress()
    }, [session])

    useEffect(() => {
        const subtotal = cart?.reduce((acc, cur) => acc + Number(cur.price) * Number(cur.qty), 0)
        setTotalPrice(Number.parseFloat(subtotal).toFixed(2))
    }, [cart])

    return (
        <main>
            <div className='container checkout'>
                <h1>Confirm Order Details</h1>
                <section className="checkout-container">
                    <section>
                        <div className="checkout-address">
                            <div className="checkout-address-header">
                                <h3>Address</h3>
                                <button onClick={() => session && navigate("/account/profile")} className="bold">Change</button>
                            </div>
                            <p>{address}</p>
                        </div>
                        <div className="checkout-cart">
                            <h3>Items Info</h3>
                            <section className="cart-container">
                                {cart?.map(cartItem =>
                                    <div className="item-container" key={cartItem.id}>
                                        <div className="item-img">
                                            <img src={cartItem.img} alt="product_pic" />
                                        </div>
                                        <div className="item-desc">
                                            <h2>{cartItem.title}</h2>
                                            <p className="bold">x {cartItem.qty}</p>
                                        </div>
                                        <div className="item-price">
                                            <p><span>&#8377;</span>{cartItem.price * cartItem.qty}</p>
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>
                        <div className="checkout-payment">
                            <h3>Payment Mode</h3>
                            <form className="payment-container">
                                <div className="radio-btn">
                                    <input type="radio" id="cod" name="payment_mode" value="cod" />
                                    <label htmlFor="cod">Cash on Delivery</label>
                                </div>
                                <div>
                                    <button className="btn">Place Order</button>
                                </div>
                            </form>
                        </div>
                    </section>
                    <aside>
                        <h3>Sub Total</h3>
                        <div className="place-order">
                            <p className="price"><span>&#8377;</span>{totalPrice}</p>
                        </div>
                    </aside>
                </section>
            </div>
        </main>
    )
}

export default Checkout