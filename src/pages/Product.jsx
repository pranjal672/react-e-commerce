import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Products = () => {
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
    }, [])

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
                                    <button className="btn">Add to cart</button>
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