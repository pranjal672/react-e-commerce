import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Card from "../component/Card"
import { supabase } from "../supabaseClient"


const Search = () => {
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const s = searchParams.get("s")

    useEffect(() => {
        const getProductData = async () => {
            const { data, error } = await supabase.from("products").select("*")
            if (error) console.log(error)
            setProducts(data)
        }
        getProductData()
    }, [])

    const filteredProduct = products?.filter(product => product.title.toLowerCase().includes(s.toLowerCase()))

    return (
        <main>
            <div className="container">
                <section className="search-result">
                    <h1>Search Results</h1>
                    <div className="result-container">
                        {
                            filteredProduct.length > 0
                                ? filteredProduct.map(product => <Card item={product} key={product.id} />)
                                : <p>No product matches the search!</p>
                        }
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Search