import { createContext, useState } from "react";

const FilterContext = createContext([])

export const FilterProvider = ({ children }) => {
    const [globalFilter, setGlobalFilter] = useState([])

    return (
        <FilterContext.Provider value={{ globalFilter, setGlobalFilter }}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContext
