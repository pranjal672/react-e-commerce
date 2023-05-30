import { useContext, useState, useEffect } from "react"
import SessionContext from "../context/SessionContext"
import { useNavigate } from "react-router-dom"
import { supabase } from '../supabaseClient'
import CartContext from "../context/CartContext"

const Checkout = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL
    const navigate = useNavigate()
    const { session } = useContext(SessionContext)
    const { cart } = useContext(CartContext)
    const [address, setAddress] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)

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

    const checkout = async () => {
        setLoading(true)
        try {
            const response = await fetch(serverUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ items: cart })
            })
            const result = await response.json()
            if (result.url) {
                window.location.assign(result.url)
            } else throw new Error("Something went wrong try again")
        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

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
                    </section>
                    <aside>
                        <h3>Sub Total</h3>
                        <div className="place-order">
                            <p className="price"><span>&#8377;</span>{totalPrice}</p>
                            <div>
                                <button disabled={loading} onClick={checkout} className="btn">{loading ? "Processing Payment..." : "Pay Now"}</button>
                            </div>
                        </div>
                    </aside>
                </section>
            </div>
        </main>
    )
}

export default Checkout