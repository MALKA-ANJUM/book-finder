import React from "react";

function coverUrl(cover_i, olid, size = "M") {
  if (cover_i)
    return `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`;
  if (olid) return `https://covers.openlibrary.org/olid/${olid}-${size}.jpg`;
  return null;
}

export default function BookCard({ book, isFav, onToggle }) {
    const title = book.title || "Untitled";
    const authors = book.author_name ? book.author_name.join(", ") : "Unknown";
    const cover = coverUrl(book.cover_i, book.cover_edition_key);

    return (
        <article className="card">
            <div className="card-top">
                <div className="cover">
                    {cover ? (
                        <img src={cover} alt={`Cover of ${title}`} />
                    ) : (
                        <div className="no-cover">No cover</div>
                    )}
                </div>

                <div className="card-body">
                    <h3 className="book-title">{title}</h3>
                    <div className="book-authors">{authors}</div>
                    <div className="book-meta">
                        First published: {book.first_publish_year || "—"}
                    </div>
                    <div className="book-meta">Editions: {book.edition_count || 0}</div>
                </div>
            </div>

            <div className="card-footer">
                <a
                    href={`https://openlibrary.org${book.key}`}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                >
                    View
                </a>
                <button onClick={onToggle} aria-pressed={isFav} className="fav-btn">
                    {isFav ? "★ Favorite" : "☆ Save"}
                </button>
            </div>
        </article>
    );
}
