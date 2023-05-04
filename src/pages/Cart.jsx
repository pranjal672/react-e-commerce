import { useContext, useEffect, useState } from "react"
import CartContext from "../context/CartContext"
import ItemList from "../component/ItemList"
import { toast } from "react-toastify"

const Cart = () => {
    const { cart, setCart, wishList, setWishList } = useContext(CartContext)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const subtotal = cart?.reduce((acc, cur) => acc + Number(cur.price) * Number(cur.qty), 0)
        setTotalPrice(subtotal)
    }, [cart])

    const deleteCartItem = (id) => {
        const filterCart = cart?.filter(cartItem => cartItem.id !== id)
        setCart(filterCart)
    }

    const deleteWishItem = (id) => {
        const filterCart = wishList?.filter(cartItem => cartItem.id !== id)
        setWishList(filterCart)
    }

    const reduceQty = (id) => {
        const cartProduct = cart?.filter(cartItem => cartItem.id === id)[0]
        if (cartProduct.qty > 1 && cartProduct.qty <= 10) {
            cartProduct.qty--
            const newCart = [...cart]
            setCart(newCart)
        } else {
            const filterCart = cart?.filter(cartItem => cartItem.id !== id)
            setCart(filterCart)
        }
    }

    const addQty = (id) => {
        const cartProduct = cart?.filter(cartItem => cartItem.id === id)[0]
        if (cartProduct.qty >= 1 && cartProduct.qty < 10) {
            cartProduct.qty++;
            const newCart = [...cart]
            setCart(newCart)
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
    }

    const addToWishList = (id) => {
        const filterWishList = cart?.filter(cartItem => cartItem.id === id)[0];
        if (wishList?.some(item => item.id === filterWishList.id)) {
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
        }
    }

    const returnToCart = (id) => {
        const filterCart = wishList?.filter(cartItem => cartItem.id === id)[0];
        if (cart?.some(item => item.id === filterCart.id)) {
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
        }
    }

    return (
        <main>
            <div className="container">
                <section className="cart-main mb">
                    <div className="cart-list">
                        <h1>Shoping Cart</h1>
                        {cart.length > 0
                            ? <ItemList items={cart} deleteItem={deleteCartItem} moveList={addToWishList} isCart reduce={reduceQty} add={addQty} />
                            : <p>Cart Empty!</p>
                        }
                    </div>
                    <div className="cart-subtotal">
                        <div>
                            <h2>Sub Total</h2>
                            <p>$ {totalPrice}</p>
                        </div>
                        <p>
                            <button className="btn">PAY NOW</button>
                        </p>
                    </div>
                </section>
                <hr />
                <section className="cart-main mt">
                    <div className="cart-list">
                        <h1>Wishlist</h1>
                        {wishList.length > 0
                            ? <ItemList items={wishList} deleteItem={deleteWishItem} moveList={returnToCart} />
                            : <p>No items saved for later!</p>
                        }
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Cart