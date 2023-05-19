import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ postPerPage, totalPost, paginate, currentPage, paginateUp, paginateDown }) => {
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <section>
            <ul className="pagination">
                <button disabled={currentPage === 1 ? true : false} onClick={() => paginateDown()}><FaAngleLeft /></button>
                {pageNumber.map(number => (
                    <li key={number} className={currentPage === number ? "black-btn" : ""}>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
                <button disabled={currentPage === Math.ceil(totalPost / postPerPage) ? true : false} onClick={() => paginateUp()}><FaAngleRight /></button>
            </ul>
        </section>
    )
}

export default Pagination