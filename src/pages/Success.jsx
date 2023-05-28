import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import SessionContext from "../context/SessionContext";
import { supabase } from "../supabaseClient";

const Success = () => {
    const { setCart } = useContext(CartContext)
    const { session } = useContext(SessionContext)

    const [cartData, setCartData] = useState([])
    const [address, setAddress] = useState("")
    const [orders, setOrders] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const getCartData = async () => {
            const { data, error } = await supabase.from("cart").select("*").eq("user_id", session?.user.id)
            if (error) console.log(error)
            setCartData(data)
        }
        session && getCartData()
    }, [session])

    useEffect(() => {
        const subtotal = cartData?.reduce((acc, cur) => acc + Number(cur.price) * Number(cur.qty), 0)
        setTotalPrice(Number.parseFloat(subtotal).toFixed(2))
    }, [cartData])

    useEffect(() => {
        const getAddress = async () => {
            const { data, error } = await supabase.from("profiles").select("address").eq("id", session?.user.id)
            if (error) console.log(error)
            setAddress(data[0].address)
        }
        session && getAddress()
    }, [totalPrice])

    useEffect(() => {
        const createOrder = async () => {
            const { data, error } = await supabase.from("orders").insert([
                {
                    user_id: session?.user.id,
                    order_date: new Date(),
                    total_amount: totalPrice,
                    payment_status: "PAID",
                    shipping_address: address,
                    order_status: "PROCESSING"
                }
            ]).select()
            if (error) console.log(error)
            setOrders(data[0])
        }
        session && createOrder()
    }, [address])

    useEffect(() => {
        const createOrderItems = async () => {
            for (const item of cartData) {
                const { error } = await supabase.from("orders_items").insert([
                    {
                        order_id: orders?.id,
                        product_id: item.product_id,
                        quantity: item.qty,
                        price: item.price
                    }
                ])
                if (error) console.log(error)
            }
        }

        const removeCart = async () => {
            await createOrderItems()
            const { error } = await supabase.from("cart").delete().eq("user_id", session?.user.id)
            if (error) console.log(error)
        }
        setCart([])
        session && removeCart()
    }, [orders])

    return (
        <main>
            <div className="container">
                <h1>Success!</h1>
            </div>
        </main>
    )
}

export default Success