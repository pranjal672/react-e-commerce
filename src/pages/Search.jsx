import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Card from "../component/Card"

const Search = () => {
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const s = searchParams.get("s")

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
                <section className="search-result">
                    <h1>Search Results</h1>
                    <div className="result-container">
                        {
                            products?.filter(product => product.title.toLowerCase().includes(s.toLowerCase())).map(product => <Card item={product} key={product.id} />)
                        }
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Search