const Pagination = ({ postPerPage, totalPost, paginate }) => {
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <section>
            <ul className="pagination">
                {pageNumber.map(number => (
                    <li key={number}>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Pagination