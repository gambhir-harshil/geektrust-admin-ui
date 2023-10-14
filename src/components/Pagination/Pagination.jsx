import "./Pagination.css";
export default function Pagination({ itemsPerPage, state, dispatch }) {
  const { currentPage, totalItems } = state;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  function handlePagination(page) {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  }

  function renderPaginationButtons() {
    const pageButtons = [];

    pageButtons.push(
      <button
        key="first"
        onClick={() => handlePagination(1)}
        className={currentPage === 1 ? "disabled" : ""}
      >
        <i className="fas fa-angle-double-left"></i>
      </button>
    );

    pageButtons.push(
      <button
        key="previous"
        onClick={() => handlePagination(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : ""}
      >
        <i className="fas fa-angle-left"></i>
      </button>
    );

    for (let page = 1; page <= totalPages; page++) {
      pageButtons.push(
        <button
          key={page}
          onClick={() => handlePagination(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      );
    }

    pageButtons.push(
      <button
        key="next"
        onClick={() => handlePagination(currentPage + 1)}
        className={currentPage === totalPages ? "disabled" : ""}
      >
        <i className="fas fa-angle-right"></i>
      </button>
    );

    pageButtons.push(
      <button
        key="last"
        onClick={() => handlePagination(totalPages)}
        className={currentPage === totalPages ? "disabled" : ""}
      >
        <i className="fas fa-angle-double-right"></i>
      </button>
    );

    return pageButtons;
  }

  return <div className="pagination">{renderPaginationButtons()}</div>;
}
