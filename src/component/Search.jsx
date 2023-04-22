import { FaSearch } from "react-icons/fa";

const Search = () => {
    return (
        <form className="nav-search">
            <input type="text" placeholder="Search for products..." />
            <button>
                <FaSearch />
            </button>
        </form>
    )
}

export default Search