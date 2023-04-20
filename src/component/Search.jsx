import { FaSearch } from "react-icons/fa";

const Search = () => {
    return (
        <form className="search">
            <input type="text" placeholder="Search for products..." />
            <button>
                <FaSearch />
            </button>
        </form>
    )
}

export default Search