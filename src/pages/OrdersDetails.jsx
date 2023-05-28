import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const OrdersDetails = () => {
    const orderId = useParams()
    const [order, setOrder] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        const getOrder = async () => {
            const { data, error } = await supabase.from("orders").select("*").eq("id", orderId.id)
            if (error) console.log(error)
            setOrder(data[0])
        }
        getOrder()
        const getOrderDetails = async () => {
            const { data, error } = await supabase.from("orders_items").select("*").eq("order_id", orderId.id)
            if (error) console.log(error)
            setOrderDetails(data)
        }
        getOrderDetails()
    }, [orderId])

    useEffect(() => {
        const getOrderItems = async (id, qty, price) => {
            const { data, error } = await supabase.from("products").select("*").eq("id", id)
            if (error) console.log(error)
            const newData = {
                id: id,
                title: data[0].title,
                image: data[0].image,
                price: price,
                qty: qty
            }
            return newData
        }
        const fetchOrderItems = async () => {
            const updatedOrderItems = []
            for (const order of orderDetails) {
                const newData = await getOrderItems(order.product_id, order.quantity, order.price)
                updatedOrderItems.push(newData)
            }
            setOrderItems([...orderItems, ...updatedOrderItems])
        }

        const cleanup = () => {
            setOrderItems([])
        }

        fetchOrderItems()

        return cleanup;
    }, [orderDetails])

    useEffect(() => {
        console.log(orderItems)
    }, [orderItems])

    return (
        <main>
            <div className="container">
                <section className="order-details">
                    <h1>Order Details</h1>
                    <p><span>Ordered on {order?.order_date}</span><span>|</span><span>Order # {order?.id}</span></p>
                    <div className="order-details-container">
                        <div>
                            <h3>Shipping Address</h3>
                            <p>{order?.shipping_address}</p>
                        </div>
                        <div>
                            <h3>Order summary</h3>
                            <p>Grand Total : {order?.total_amount}</p>
                        </div>
                    </div>
                    <div className="order-items-container">
                        {orderItems?.map(item =>
                            <div className="order-items" key={item.id}>
                                <div>
                                    <img src={item.image} alt="product_img" />
                                </div>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p><span>&#8377;</span>{item.price}</p>
                                    <p>x{item.qty}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default OrdersDetails