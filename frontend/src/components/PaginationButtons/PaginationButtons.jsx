const PaginationButtons = ({ currentPage, setCurrentPage, totalPages }) => {
    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return (
        <div className="pagination-controls">
            <button 
                onClick={() => changePage(currentPage - 1)} 
                disabled={currentPage === 1}>
                &lt;
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => changePage(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                >
                    {index + 1}
                </button>
            ))}

            <button 
                onClick={() => changePage(currentPage + 1)} 
                disabled={currentPage === totalPages}>
                &gt;
            </button>
        </div>
    )
}