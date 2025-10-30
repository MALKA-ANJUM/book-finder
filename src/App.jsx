import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a book title");
      return;
    }
    setPage(1); // reset to first page on new search
    fetchBooks(query, 1);
  };

  const fetchBooks = async (title, currentPage) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${title}&page=${currentPage}`
      );
      const data = await res.json();

      setBooks(data.docs.slice(0, 12)); // show only 12 books per page
      setNumFound(data.numFound);
    } catch (err) {
      setError("Failed to fetch books. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch new page whenever `page` changes
  useEffect(() => {
    if (query) fetchBooks(query, page);
  }, [page]);

  const totalPages = Math.ceil(numFound / 100); // API gives 100 per page

  return (
    <div className="app-container">
      <h1>📚 Book Finder</h1>

      <form onSubmit={searchBooks} className="search-form">
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading...</p> : <BookList books={books} />}

      {/* Pagination Controls */}
      {numFound > 0 && !loading && (
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            ⬅ Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
