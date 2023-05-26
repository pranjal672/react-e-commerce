import { useContext, useEffect, useRef, useState } from "react"
import CartContext from "../context/CartContext"
import ItemList from "../component/ItemList"
import { toast } from "react-toastify"
import { supabase } from "../supabaseClient"
import { useLocation, useNavigate } from "react-router-dom"

const Cart = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const wishlistRef = useRef(null)
    const { cart, setCart, wishList, setWishList } = useContext(CartContext)
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const shouldFocus = searchParams.get('focus');
        if (shouldFocus) {
            wishlistRef.current.focus();
        }
    }, [location])

    useEffect(() => {
        const subtotal = cart?.reduce((acc, cur) => acc + Number(cur.price) * Number(cur.qty), 0)
        setTotalPrice(Number.parseFloat(subtotal).toFixed(2))
    }, [cart])

    const deleteCartItem = async (id) => {
        const filterCart = cart?.filter(cartItem => cartItem.id !== id)
        setCart(filterCart)
        const { error } = await supabase.from("cart").delete().eq("id", id)
        if (error) console.log(error)
    }

    const deleteWishItem = async (id) => {
        const filterCart = wishList?.filter(cartItem => cartItem.id !== id)
        setWishList(filterCart)
        const { error } = await supabase.from("wishlist").delete().eq("id", id)
        if (error) console.log(error)
    }

    const reduceQty = async (id) => {
        setLoading(true)
        const cartProduct = cart?.filter(cartItem => cartItem.id === id)[0]
        if (cartProduct.qty > 1 && cartProduct.qty <= 10) {
            cartProduct.qty--
            const newCart = [...cart]
            setCart(newCart)
            const { error } = await supabase.from("cart").update({ qty: cartProduct.qty }).eq("id", id)
            if (error) console.log(error)
        } else {
            const filterCart = cart?.filter(cartItem => cartItem.id !== id)
            setCart(filterCart)
            const { error } = await supabase.from("cart").delete().eq("id", id)
            if (error) console.log(error)
        }
        setLoading(false)
    }

    const addQty = async (id) => {
        setLoading(true)
        const cartProduct = cart?.filter(cartItem => cartItem.id === id)[0]
        if (cartProduct.qty >= 1 && cartProduct.qty < 10) {
            cartProduct.qty++;
            const newCart = [...cart]
            setCart(newCart)
            const { error } = await supabase.from("cart").update({ qty: cartProduct.qty }).eq("id", id)
            if (error) console.log(error)
        } else {
            toast.error('Limit reached for this product!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setLoading(false)
    }

    const addToWishList = async (id) => {
        const filterWishList = cart?.filter(cartItem => cartItem.id === id)[0];
        if (wishList?.some(item => item.product_id === filterWishList.product_id)) {
            toast.error('Product already exists in your Wishlist!', {
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
            setWishList([...wishList, filterWishList])
            const filterCart = cart?.filter(cartItem => cartItem.id !== id)
            setCart(filterCart)
            const { err } = await supabase.from("wishlist").insert([filterWishList]).eq("id", id)
            if (err) console.log(err)
            const { error } = await supabase.from("cart").delete().eq("id", id)
            if (error) console.log(error)
        }
    }

    const returnToCart = async (id) => {
        const filterCart = wishList?.filter(cartItem => cartItem.id === id)[0];
        if (cart?.some(item => item.product_id === filterCart.product_id)) {
            toast.error('Product already exists in your Cart!', {
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
            setCart([...cart, filterCart])
            const filterWishList = wishList?.filter(cartItem => cartItem.id !== id)
            setWishList(filterWishList)
            const { err } = await supabase.from("cart").insert([filterCart]).eq("id", id)
            if (err) console.log(err)
            const { error } = await supabase.from("wishlist").delete().eq("id", id)
            if (error) console.log(error)
        }
    }

    const cartPurchase = () => {
        if (cart?.length > 0) {
            navigate("/checkout")
        } else {
            toast.error('Cart Empty!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <main>
            <div className="container">
                <section className="cart-container">
                    <div className="cart-main-container">
                        <section className="cart-main mb">
                            <div className="cart-list">
                                <h2>Shoping Cart</h2>
                                <div className="cart">
                                    {cart.length > 0
                                        ? <ItemList items={cart} deleteItem={deleteCartItem} moveList={addToWishList} isCart reduce={reduceQty} add={addQty} loading={loading} />
                                        : <p>Cart Empty!</p>
                                    }
                                </div>
                            </div>
                        </section>
                        <hr />
                        <section className="cart-main mt">
                            <div ref={wishlistRef} tabIndex={-1} autoFocus className="cart-list">
                                <h2>Wishlist</h2>
                                <div className="cart">
                                    {wishList.length > 0
                                        ? <ItemList items={wishList} deleteItem={deleteWishItem} moveList={returnToCart} />
                                        : <p>No items saved for later!</p>
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="cart-subtotal">
                        <h2>Sub Total</h2>
                        <p><span>&#8377;</span>{totalPrice}</p>
                        <button onClick={() => cartPurchase()} className="btn">Proceed to Checkout</button>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Cart