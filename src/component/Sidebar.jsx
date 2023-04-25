import { useState, useEffect, useContext } from "react";
import FilterContext from "../context/FilterContext";
import { FaFilter, FaMixer } from "react-icons/fa";

const Sidebar = () => {
    let id = 0;
    const { setGlobalFilter } = useContext(FilterContext)
    const [filters, setFilters] = useState([])
    const [filterList, setFilterList] = useState([])

    const [display, setDisplay] = useState(false)

    useEffect(() => {
        const getFilters = async () => {
            const response = await fetch("https://fakestoreapi.com/products/categories")
            const data = await response.json()
            setFilters(data)
        }
        getFilters()
    }, [])

    const createFilterList = (filter) => {
        if (Array.isArray(filterList) && filterList.length > 0) {
            if (filterList.includes(filter)) {
                const oldFilter = [...filterList]
                const newFilter = oldFilter.filter(item => item !== filter)
                setFilterList(newFilter)
            } else {
                setFilterList(prev => [...prev, filter])
            }
        } else {
            setFilterList([filter])
        }
    }

    useEffect(() => {
        setGlobalFilter(filterList)
    }, [filterList])

    return (
        <>
            <button onClick={() => setDisplay(prev => !prev)} className="filter-btn">
                <FaFilter />
            </button>
            <aside data-visible={display ? "true" : "false"} className="sidebar">
                <div className="filter-header">
                    <h2>Filter by</h2>
                    <button onClick={() => setDisplay(prev => !prev)} className="close-filter">
                        <FaMixer />
                    </button>
                </div>
                <section>
                    <h3 className="category-type">Category</h3>
                    <ul className="filters">
                        {filters.map((filter) => (
                            <li key={++id}>
                                <button className={filterList.includes(filter) ? "btn btn-active" : "btn"} onClick={() => createFilterList(filter)}>{filter}</button>
                            </li>
                        ))}
                    </ul>
                </section>
                <div>
                    <button onClick={() => setDisplay(prev => !prev)} className="btn btn-active applybtn">
                        Apply
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar