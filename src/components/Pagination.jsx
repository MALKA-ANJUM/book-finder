import React from "react";

export default function Pagination({ page, perPage, total, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <nav className="pagination">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Prev
      </button>
      <div className="page-info">
        Page {page} of {totalPages}
      </div>
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </nav>
  );
}
