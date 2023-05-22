import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CartContext from "../context/CartContext"
import { toast } from "react-toastify"
import { supabase } from "../supabaseClient"
import SessionContext from "../context/SessionContext"

const Products = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [btnEnable, setBtnEnable] = useState(true)
    const { session } = useContext(SessionContext)
    const { cart, setCart } = useContext(CartContext)
    const [product, setProduct] = useState({})
    const productId = useParams()

    useEffect(() => {
        setLoading(true)
        const getProduct = async () => {
            const { data, error } = await supabase.from("products").select("*").eq("id", productId.id)
            if (error) console.log(error)
            setProduct(data[0])
            setLoading(false)
        }
        getProduct()
    }, [productId])

    const addToCart = async (product) => {
        const cartDetail = {
            img: product.image,
            price: product.price,
            title: product.title,
            qty: 1,
            user_id: session?.user.id,
            product_id: product.id
        }
        if (cart.length > 0 && cart.some((item) => item.product_id === product.id)) {
            toast.error('Product already in Cart!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            if (!!session) {
                setBtnEnable(false)
                const { data, error } = await supabase.from("cart").insert([cartDetail]).select()
                if (error) console.error(error)
                setCart([...cart, data[0]])
                setBtnEnable(true)
            } else {
                toast.error('User not logged in!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/login")
            }
        }
    }

    return (
        <main>
            <div className="container">
                {
                    loading
                        ? <p className="center bold">loading...</p>
                        : <>
                            <section className="product">
                                <aside>
                                    <img src={product?.image} alt="product_img" />
                                </aside>
                                <article>
                                    <div className="product-details">
                                        <p>{product?.category}</p>
                                        <h1>{product?.title}</h1>
                                        <p>{product?.description}</p>
                                        <div className="btn-container">
                                            <p><span>&#8377;</span>{product?.price}</p>
                                            <p>
                                                <button disabled={btnEnable ? false : true} onClick={() => addToCart(product)} className="btn">Add to cart</button>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </section>
                        </>
                }
            </div>
        </main>
    )
}

export default Products