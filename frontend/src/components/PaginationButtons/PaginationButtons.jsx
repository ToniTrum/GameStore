import "./PaginationButtons.css"

const PaginationButton = ({changePage, currentPage, page}) => {
    const onClick = () => {
        if (currentPage !== page) {
            changePage(page)
        }
    }

    return (
        <button
            onClick={onClick}
            className={currentPage === page ? "active" : ""}
        >
            {page}
        </button>
    )
}

const StartButtons = ({changePage, currentPage}) => {
    return (
        currentPage <= 5 
            ? (
                <>
                {Array.from({ length: 4 }, (_, index) => (
                    <PaginationButton 
                        changePage={changePage} 
                        currentPage={currentPage} 
                        page={index + 2}
                        key={index} 
                    />
                ))}
                <p className="ellipsis">...</p>
                </>
            )
            : null
    )
}

const MiddleButtons = ({changePage, currentPage, totalPages}) => {
    return (
        currentPage > 5 && currentPage < totalPages - 4
            ? (
                <>
                <p className="ellipsis">...</p>
                {Array.from({ length: 3 }, (_, index) => (
                    <PaginationButton 
                        changePage={changePage} 
                        currentPage={currentPage} 
                        page={currentPage - 1 + index} 
                        key={index} 
                    />
                ))}
                <p className="ellipsis">...</p>
                </>
            )
            : null
    )
}

const EndButtons = ({changePage, currentPage, totalPages}) => {
    return (
        currentPage >= totalPages - 4
            ? (
                <>
                <p className="ellipsis">...</p>
                {Array.from({ length: 4 }, (_, index) => (
                    <PaginationButton 
                        changePage={changePage} 
                        currentPage={currentPage} 
                        page={totalPages - 4 + index}
                        key={index} 
                    />
                ))}
                </>
            )
            : null
    )
}

const PaginationButtons = ({ currentPage, setCurrentPage, totalPages }) => {
    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return (
        <div className="pagination-container">
            {currentPage > 1 && (
                <button 
                    onClick={() => changePage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    >
                        &lt;
                </button>
            )}

            <PaginationButton changePage={changePage} currentPage={currentPage} page={1} />

            <StartButtons changePage={changePage} currentPage={currentPage} />
            <MiddleButtons changePage={changePage} currentPage={currentPage} totalPages={totalPages} />
            <EndButtons changePage={changePage} currentPage={currentPage} totalPages={totalPages} />

            <PaginationButton changePage={changePage} currentPage={currentPage} page={totalPages} />

            {currentPage < totalPages && (
                <button 
                    onClick={() => changePage(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    >
                        &gt;
                </button>
            )}
        </div>
    )
}

export default PaginationButtons