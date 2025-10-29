import React from "react";
import BookCard from "./BookCard";

export default function BookList({
    books,
    loading,
    favorites,
    onToggleFavorite,
}) {
    if (loading) return <div className="empty-state">Loading…</div>;
    if (!books || books.length === 0)
        return <div className="empty-state">No results — try another title.</div>;

    return (
        <div className="book-grid">
        {books.map((book) => (
            <BookCard
            key={book.key}
            book={book}
            isFav={favorites.includes(book.key)}
            onToggle={() => onToggleFavorite(book.key)}
            />
        ))}
        </div>
    );
}
