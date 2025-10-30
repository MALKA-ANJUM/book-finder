import React from "react";

function BookCard({ title, author, year, coverId }) {
  const coverImg = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div className="book-card">
      <img src={coverImg} alt={title} />
      <h3>{title}</h3>
      <p>{author}</p>
      <small>📅 {year}</small>
    </div>
  );
}

export default BookCard;
