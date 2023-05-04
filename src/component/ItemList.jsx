import { FaRegMinusSquare, FaPlusSquare } from "react-icons/fa";

const ItemList = ({ items, deleteItem, moveList, isCart = false, reduce, add }) => {

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
                            {isCart && <div className="qty">
                                <p>Qty : </p>
                                <button onClick={() => reduce(cartItem.id)}><FaRegMinusSquare /></button>
                                <input type="number" value={cartItem.qty} min={1} max={10} disabled />
                                <button onClick={() => add(cartItem.id)}><FaPlusSquare /></button>
                            </div>}
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