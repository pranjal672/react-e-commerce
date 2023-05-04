import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import CartContext from "../context/CartContext"
import { toast } from "react-toastify"

const Products = () => {
    const { cart, setCart } = useContext(CartContext)
    const [product, setProduct] = useState({})
    const productId = useParams()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${productId.id}`)
                const data = await response.json()
                setProduct(data)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct()
    }, [productId])

    const addToCart = (product) => {
        const cartDetail = {
            id: product.id,
            img: product.image,
            price: product.price,
            title: product.title,
            qty: 1
        }
        if (cart.length > 0 && cart.some((item) => item.id === product.id)) {
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
            setCart([...cart, cartDetail])
            // TODO: enter into supabase database
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
                                <p>{product?.price}$</p>
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