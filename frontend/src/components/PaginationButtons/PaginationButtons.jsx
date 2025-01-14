import "./PaginationButtons.css";

const PaginationButton = ({ changePage, pageNumber, page }) => {
  page = parseInt(page);

  const onClick = () => {
    if (pageNumber !== page) {
      changePage(page);
    }
  };

  return (
    <button onClick={onClick} className={pageNumber == page ? "active" : ""}>
      {page}
    </button>
  );
};

const StartButtons = ({ changePage, pageNumber }) => {
  return pageNumber <= 3 ? (
    <>
      {Array.from({ length: 2 }, (_, index) => (
        <PaginationButton
          changePage={changePage}
          pageNumber={pageNumber}
          page={index + 2}
          key={index}
        />
      ))}
      <p className="ellipsis">...</p>
    </>
  ) : null;
};

const MiddleButtons = ({ changePage, pageNumber, totalPages }) => {
  return pageNumber > 3 && pageNumber < totalPages - 2 ? (
    <>
      <p className="ellipsis">...</p>
      {Array.from({ length: 1 }, (_, index) => (
        <PaginationButton
          changePage={changePage}
          pageNumber={pageNumber}
          page={pageNumber}
          key={index}
        />
      ))}
      <p className="ellipsis">...</p>
    </>
  ) : null;
};

const EndButtons = ({ changePage, pageNumber, totalPages }) => {
  return pageNumber >= totalPages - 2 ? (
    <>
      <p className="ellipsis">...</p>
      {Array.from({ length: 2 }, (_, index) => (
        <PaginationButton
          changePage={changePage}
          pageNumber={pageNumber}
          page={totalPages - 1 + index}
          key={index}
        />
      ))}
    </>
  ) : null;
};

const PaginationButtons = ({ changePage, pageNumber, totalPages }) => {
  pageNumber = parseInt(pageNumber);

  return (
    <div className="pagination-container">
      {pageNumber > 1 && (
        <button
          onClick={() => changePage(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          &lt;
        </button>
      )}

      <PaginationButton
        changePage={changePage}
        pageNumber={pageNumber}
        page={1}
      />

      <StartButtons changePage={changePage} pageNumber={pageNumber} />
      <MiddleButtons
        changePage={changePage}
        pageNumber={pageNumber}
        totalPages={totalPages}
      />
      <EndButtons
        changePage={changePage}
        pageNumber={pageNumber}
        totalPages={totalPages}
      />

      <PaginationButton
        changePage={changePage}
        pageNumber={pageNumber}
        page={totalPages}
      />

      {pageNumber < totalPages && (
        <button
          onClick={() => changePage(pageNumber + 1)}
          disabled={pageNumber === totalPages}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default PaginationButtons;
