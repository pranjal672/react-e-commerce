import { useContext, useEffect, useState } from "react"
import Card from "../component/Card"
import Sidebar from "../component/Sidebar"
import FilterContext from "../context/FilterContext"


const Home = () => {
    const { globalFilter } = useContext(FilterContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products")
                const data = await response.json()
                setProducts(data)
            } catch (e) {
                console.log(e)
            }
        }
        getProducts()
    }, [])

    return (
        <main>
            <div className="container">
                <section className="hero">
                    <Sidebar />
                    <section className="content">
                        <h2>All Products</h2>
                        <section className="products">
                            {globalFilter.length > 0
                                ? products?.filter(product => globalFilter.includes(product.category)).map(product => <Card item={product} key={product.id} />)
                                : products?.map(product => <Card item={product} key={product.id} />)
                            }
                        </section>
                    </section>
                </section>
            </div>
        </main>
    )
}

export default Home
