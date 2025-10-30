import React from "react";
import BookCard from "./BookCard";

function BookList({ books }) {
  if (!books.length) {
    return <p className="no-books">No books found. Try searching something!</p>;
  }

  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookCard
          key={index}
          title={book.title}
          author={book.author_name ? book.author_name.join(", ") : "Unknown Author"}
          year={book.first_publish_year || "N/A"}
          coverId={book.cover_i}
        />
      ))}
    </div>
  );
}

export default BookList;
