import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useNavigateSearch from "../hooks/useNavigateSearch";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";


const Search = () => {
    const divRef = useRef(null)
    const [showDiv, setShowDiv] = useState(false);
    const [searchText, setSearchText] = useState("")
    const [products, setProducts] = useState([])
    const navigateSearch = useNavigateSearch()

    useEffect(() => {
        // const getProducts = async () => {
        //     try {
        //         const response = await fetch("https://fakestoreapi.com/products")
        //         const data = await response.json()
        //         setProducts(data)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }
        const getProductData = async () => {
            const { data, error } = await supabase.from("products").select("*")
            if (error) console.log(error)
            setProducts(data)
        }
        getProductData()
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setShowDiv(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [divRef])

    useEffect(() => {
        if (searchText.length > 0) setShowDiv(true)
    }, [searchText])

    const searchProduct = (e) => {
        e.preventDefault()
        navigateSearch("/search", { s: searchText })
        setSearchText("")
    }

    return (
        <div className="nav-search-container">
            <form className="nav-search">
                <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search for products..." />
                <button onClick={searchProduct}>
                    <FaSearch />
                </button>
                {showDiv && <div ref={divRef} className="search-container">
                    {
                        products?.filter((product) => {
                            return searchText && product.title.toLowerCase().includes(searchText.toLowerCase())
                        }).slice(0, 10).map((product) =>
                            <Link onClick={() => setSearchText("")} to={`/products/${product.id}`} key={product.id}>
                                {product.title}
                            </Link>)
                    }
                </div>}
            </form>
        </div >
    )
}

export default Search