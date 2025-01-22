import React from "react";
import '../styles/pagination.css'
const PaginationComp = ({
    itemsPerPage,
    totalItems,
    paginate,
    currentPage,
    nextPage,
    prevPage,
  }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination">
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button onClick={prevPage} className="page-link">
              Previous
            </button>
          </li>
  
          {/* Page Numbers */}
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${number === currentPage ? "active" : ""}`}
            >
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
  
          {/* Next Button */}
          <li
            className={`page-item ${
              currentPage === pageNumbers.length ? "disabled" : ""
            }`}
          >
            <button onClick={nextPage} className="page-link">
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default PaginationComp;
  