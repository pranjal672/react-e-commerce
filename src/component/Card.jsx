import { Link } from "react-router-dom"
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"

const Card = ({ item }) => {

    const count = item?.rating?.rate

    return (
        <div className="card">
            <Link to={`products/${item.id}`}>
                <div className="pic">
                    <img src={item.image} alt="product_image" />
                </div>
            </Link>
            <div className="card-content">
                <Link to={`products/${item.id}`}><h3 className="cutoff-text">{item.title}</h3></Link>
                <p>{item.price} $</p>
                <p>
                    <span>
                        {count > 1 ? <FaStar /> : count > 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                    </span>
                    <span>
                        {count > 2 ? <FaStar /> : count > 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                    </span>
                    <span>
                        {count > 3 ? <FaStar /> : count > 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                    </span>
                    <span>
                        {count > 4 ? <FaStar /> : count > 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                    </span>
                    <span>
                        {count === 5 ? <FaStar /> : count > 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Card