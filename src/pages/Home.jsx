import { useContext, useEffect, useState } from "react"
import Card from "../component/Card"
import Sidebar from "../component/Sidebar"
import FilterContext from "../context/FilterContext"
import { supabase } from "../supabaseClient"


const Home = () => {
    const { globalFilter } = useContext(FilterContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProductData = async () => {
            const { data, error } = await supabase.from("products").select("*")
            if (error) console.log(error)
            setProducts(data)
        }
        getProductData()
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
