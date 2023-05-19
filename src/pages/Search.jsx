import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../component/Card";
import { supabase } from "../supabaseClient";
import Pagination from "../component/Pagination";


const Search = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams()
    const s = searchParams.get("s")

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(6)

    useEffect(() => {
        setLoading(true)
        const getProductData = async () => {
            const { data, error } = await supabase.from("products").select("*")
            if (error) console.log(error)
            const searchProducts = data?.filter(product => product.title.toLowerCase().includes(s.toLowerCase()))
            setProducts(searchProducts)
            setLoading(false)
        }
        getProductData()
    }, [s])

    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (number) => {
        setCurrentPage(number)
        window.scrollTo(0, 0)
    }

    const paginateUp = () => {
        setCurrentPage(currentPage + 1)
        window.scrollTo(0, 0)
    }

    const paginateDown = () => {
        setCurrentPage(currentPage - 1)
        window.scrollTo(0, 0)
    }

    return (
        <main>
            <div className="container">
                <section className="search-result">
                    <h1>Search Results</h1>
                    <div className="result-container">
                        {
                            loading ? <p>searching...</p> : products.length > 0
                                ? currentProducts.map(product => <Card item={product} key={product.id} />)
                                : <p>No product matches the search!</p>
                        }
                    </div>
                </section>
                <Pagination postPerPage={postPerPage} totalPost={products.length} currentPage={currentPage} paginate={paginate} paginateUp={paginateUp} paginateDown={paginateDown} />
            </div>
        </main>
    )
}

export default Search