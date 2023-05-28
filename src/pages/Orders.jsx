import { useContext, useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import SessionContext from "../context/SessionContext"
import { Link } from "react-router-dom"

const Orders = () => {
    const { session } = useContext(SessionContext)
    const [ordersDetail, setOrdersDetail] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            const { data, error } = await supabase.from("orders").select("*").eq("user_id", session?.user.id)
            if (error) console.log(error)
            setOrdersDetail(data)
        }
        session && getOrders()
    }, [session])

    return (
        <main>
            <div className="container orders">
                <h3>My Orders</h3>
                <div className="orders-container">
                    {ordersDetail?.map(order =>
                        <div className="orders-details" key={order?.id}>
                            <div className="orders-list">
                                <p>Order Placed</p>
                                <p>{order?.order_date}</p>
                            </div>
                            <div className="orders-list">
                                <p>Total</p>
                                <p><span>&#8377;</span>{order?.total_amount}</p>
                            </div>
                            <div className="orders-list">
                                <p>Shipped to</p>
                                <p>{order?.shipping_address}</p>
                            </div>
                            <div className="orders-list">
                                <p>Order# {order?.id}</p>
                                <p><Link className="link" to={`/orderdetails/${order?.id}`}>View order details</Link></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Orders