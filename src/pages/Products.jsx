import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CartContext from "../context/CartContext"
import { toast } from "react-toastify"
import { supabase } from "../supabaseClient"
import SessionContext from "../context/SessionContext"

const Products = () => {
    const navigate = useNavigate()
    const { session } = useContext(SessionContext)
    // const { dataCart, localCart, setDataCart, setLocalCart } = useContext(CartContext)
    const { cart, setCart } = useContext(CartContext)
    const [product, setProduct] = useState({})
    const productId = useParams()

    useEffect(() => {
        // const getProduct = async () => {
        //     try {
        //         const response = await fetch(`https://fakestoreapi.com/products/${productId.id}`)
        //         const data = await response.json()
        //         setProduct(data)
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }
        const getProduct = async () => {
            const { data, error } = await supabase.from("products").select("*").eq("id", productId.id)
            if (error) console.log(error)
            setProduct(data[0])
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
                const { data, error } = await supabase.from("cart").insert([cartDetail]).select()
                if (error) console.error(error)
                setCart([...cart, data[0]])
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
                // setCart([...cart, cartDetail])
                // if (localStorage.getItem('cart')) {
                //     const oldCartItems = JSON.parse(localStorage.getItem('cart'));
                //     localStorage.setItem('cart', JSON.stringify([...oldCartItems, cartDetail]))
                // } else {
                //     localStorage.setItem('cart', JSON.stringify([cartDetail]))
                // }
            }
        }
    }

    return (
        <main>
            <div className="container">
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
                                    <button onClick={() => addToCart(product)} className="btn">Add to cart</button>
                                </p>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </main>
    )
}

export default Products