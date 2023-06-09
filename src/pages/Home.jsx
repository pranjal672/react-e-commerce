import { useState, useEffect, useContext } from "react";
import Sidebar from "../component/Sidebar";
import { supabase } from "../supabaseClient";
import Products from "../component/Products";
import FilterContext from "../context/FilterContext";
import Pagination from "../component/Pagination";

const Home = () => {
    const [loading, setLoading] = useState(false)
    const { globalFilter } = useContext(FilterContext)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(6)

    useEffect(() => {
        setLoading(true)
        const getProductData = async () => {
            const { data, error } = await supabase.from("products").select("*")
            if (error) console.log(error)
            setProducts(data)
            setFilteredProducts(data)
            setLoading(false)
        }
        getProductData()
    }, [])

    useEffect(() => {
        if (globalFilter.length > 0) {
            const filter = products?.filter(product => globalFilter.includes(product.category))
            setFilteredProducts(filter)
        } else {
            setFilteredProducts(products)
        }
        setCurrentPage(1)
        window.scrollTo(0, 0)
    }, [globalFilter])

    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstPost, indexOfLastPost)

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
                {!loading
                    ? <>
                        <section className="hero">
                            <Sidebar />
                            <Products products={currentProducts} />
                        </section>
                        <Pagination postPerPage={postPerPage} totalPost={filteredProducts.length} paginate={paginate} currentPage={currentPage} paginateUp={paginateUp} paginateDown={paginateDown} />
                    </>
                    : <p className="center bold">loading...</p>}
            </div>
        </main>
    )
}

export default Home
