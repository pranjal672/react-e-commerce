import { Link } from "react-router-dom"
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"

const Card = ({ item }) => {

    // const count = item?.rating?.rate
    const count = item.reviewRating

    return (
        <div className="card">
            <Link to={`/products/${item.id}`}>
                <div className="pic">
                    <img src={item.image} alt="product_image" />
                </div>
            </Link>
            <div className="card-content">
                <Link to={`/products/${item.id}`}><h3 className="cutoff-text">{item.title}</h3></Link>
                <p><span>&#8377;</span>{item.price}</p>
                <p className="rating-container">
                    <span>
                        {count > 1 ? <FaStar className="gold" /> : count > 0.5 ? <FaStarHalfAlt className="gold" /> : <FaRegStar />}
                    </span>
                    <span>
                        {count > 2 ? <FaStar className="gold" /> : count > 1.5 ? <FaStarHalfAlt className="gold" /> : <FaRegStar />}
                    </span>
                    <span>
                        {count > 3 ? <FaStar className="gold" /> : count > 2.5 ? <FaStarHalfAlt className="gold" /> : <FaRegStar />}
                    </span>
                    <span>
                        {count > 4 ? <FaStar className="gold" /> : count > 3.5 ? <FaStarHalfAlt className="gold" /> : <FaRegStar />}
                    </span>
                    <span>
                        {count === 5 ? <FaStar className="gold" /> : count > 4.5 ? <FaStarHalfAlt className="gold" /> : <FaRegStar />}
                    </span>
                    <span>{`(${item.reviewCount})`}</span>
                </p>
            </div>
        </div>
    )
}

export default Card