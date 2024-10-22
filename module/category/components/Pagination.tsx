import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate, itemsPerPage, setItemsPerPage }) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-500"
        >
          Previous
        </button>
        <div className="space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"} rounded-lg`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-gray-500"
        >
          Next
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <span>Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
