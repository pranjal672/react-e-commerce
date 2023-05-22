import { useState, useEffect, useContext } from "react";
import FilterContext from "../context/FilterContext";
import { FaFilter, FaMixer } from "react-icons/fa";

const Sidebar = () => {
    let id = 0;
    const { setGlobalFilter } = useContext(FilterContext)
    const [filters] = useState(['electronics', 'jewelery', "men's clothing", "women's clothing"])
    const [filterList, setFilterList] = useState([])
    const [display, setDisplay] = useState(false)

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
            <div className="filter-btn-container">
                <button onClick={() => setDisplay(prev => !prev)} className="filter-btn">
                    <FaFilter />
                </button>
                <span>Filter</span>
            </div>
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
                                <button className={filterList.includes(filter) ? "alt-btn btn btn-active" : "alt-btn btn"} onClick={() => createFilterList(filter)}>{filter}</button>
                            </li>
                        ))}
                    </ul>
                </section>
                <div>
                    <button onClick={() => setDisplay(prev => !prev)} className="btn applybtn full-width">
                        Apply
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar