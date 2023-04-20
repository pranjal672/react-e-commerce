import { useState, useEffect, useContext } from "react";
import FilterContext from "../context/FilterContext";

const Sidebar = () => {
    let id = 0;
    const { setGlobalFilter } = useContext(FilterContext)
    const [filters, setFilters] = useState([])
    const [filterList, setFilterList] = useState([])

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
        <aside>
            <h2>Filter by</h2>
            <section>
                <h3 className="category-type">Category</h3>
                <ul className="filters">
                    {filters.map((filter) => (
                        <li className="btn" key={++id}>
                            <button id={filterList.includes(filter) ? "btn-active" : ""} onClick={() => createFilterList(filter)}>{filter}</button>
                        </li>
                    ))}
                </ul>
            </section>
        </aside>
    )
}

export default Sidebar