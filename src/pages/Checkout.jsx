import { useContext } from "react"
import SessionContext from "../context/SessionContext"
import { useNavigate } from "react-router-dom"

const Checkout = () => {
    const navigate = useNavigate()
    const { session } = useContext(SessionContext)

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
                            <p>address text</p>
                        </div>
                        <div className="checkout-cart">
                            <h3>Items Info</h3>
                            <div className="cart-container">
                                cart items details
                            </div>
                        </div>
                        <div className="checkout-payment">
                            <h3>Payment Mode</h3>
                            <div className="payment-container">
                                payment mode details
                            </div>
                        </div>
                    </section>
                    <aside>
                        <h3>Order Info</h3>
                        <div className="place-order">
                            <p>Total</p>
                            <button className="btn">Place Order</button>
                        </div>
                    </aside>
                </section>
            </div>
        </main>
    )
}

export default Checkout