import { FaRegMinusSquare, FaPlusSquare } from "react-icons/fa";

const ItemList = ({ items, deleteItem, moveList, isCart = false, reduce, add }) => {

    return (
        <>
            {items?.map((cartItem) => (
                <div className="item-container" key={cartItem.id}>
                    <div className="item-img">
                        <img src={cartItem.img} alt="product_pic" />
                    </div>
                    <div className="item-desc">
                        <h2>{cartItem.title}</h2>
                        <div>
                            {isCart && <div className="item-qty">
                                <p>Qty : </p>
                                <button onClick={() => reduce(cartItem.id)}><FaRegMinusSquare /></button>
                                <input type="number" value={cartItem.qty} min={1} max={10} disabled />
                                <button onClick={() => add(cartItem.id)}><FaPlusSquare /></button>
                            </div>}
                            <p><button onClick={() => deleteItem(cartItem.id)} className="item-btn">delete</button></p>
                            {
                                isCart && <p><button onClick={() => moveList(cartItem.id)} className="item-btn">save for later</button></p>

                            }
                            {
                                !isCart && <p><button onClick={() => moveList(cartItem.id)} className="item-btn">move to cart</button></p>
                            }
                        </div>
                    </div>
                    <div className="item-price">
                        <p><span>&#8377;</span>{cartItem.price}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ItemList