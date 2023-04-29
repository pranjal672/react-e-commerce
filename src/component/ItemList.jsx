
const ItemList = ({ items, deleteItem, moveList, isCart = false }) => {

    return (
        <>
            {items?.map((cartItem) => (
                <div className="cart-container" key={cartItem.id}>
                    <div className="cartimg-container">
                        <img src={cartItem.img} alt="cartimg" />
                    </div>
                    <div className="cart-desc">
                        <h2>{cartItem.title}</h2>
                        <div>
                            <p className="qty">Qty : {cartItem.qty}</p>
                            <p><button onClick={() => deleteItem(cartItem.id)} className="btn-link">delete</button></p>
                            {
                                isCart && <p><button onClick={() => moveList(cartItem.id)} className="btn-link">save for later</button></p>

                            }
                            {
                                !isCart && <p><button onClick={() => moveList(cartItem.id)} className="btn-link">move to cart</button></p>
                            }
                        </div>
                    </div>
                    <div className="cart-price">
                        <p>
                            $ {cartItem.price}
                        </p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ItemList