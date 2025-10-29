import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import Pagination from "./components/Pagination";

const PAGE_SIZE = 12;
export default function App() {
	const [query, setQuery] = useState("");
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [numFound, setNumFound] = useState(0);
	const [favorites, setFavorites] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem("favorites") || "[]");
		} catch {
			return [];
		}
	});
	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	useEffect(() => {
		if (!query) {
		setBooks([]);
		setNumFound(0);
		return;
		}
		const controller = new AbortController();

		async function fetchBooks() {
		setLoading(true);
		try {
			const start = (page - 1) * PAGE_SIZE;
			const res = await fetch(
			`https://openlibrary.org/search.json?title=${encodeURIComponent(
				query
			)}&limit=${PAGE_SIZE}&offset=${start}`,
			{ signal: controller.signal }
			);
			const data = await res.json();
			setBooks(data.docs || []);
			setNumFound(data.numFound || 0);
		} catch (err) {
			if (err.name !== "AbortError") console.error(err);
		} finally {
			setLoading(false);
		}
		}
		fetchBooks();
		return () => controller.abort();
	}, [query, page]);

	function toggleFavorite(key) {
		setFavorites((prev) =>
		prev.includes(key) ? prev.filter((k) => k !== key) : [key, ...prev]
		);
	}
	return (
		<div className="app-root">
			<header className="header">
				<div className="container">
					<h1 className="site-title">📚 Book Finder</h1>
					<p className="site-sub">Search books by title (Open Library)</p>
				</div>
			</header>

			<main className="container main">
				<SearchBar
					onSearch={(q) => {
						setQuery(q);
						setPage(1);
					}}
				/>

				<div className="meta-row">
					<div className="results-count">
						{numFound.toLocaleString()} results
					</div>
					<div className="favorites-count">Favorites: {favorites.length}</div>
				</div>

				<BookList
					books={books}
					loading={loading}
					favorites={favorites}
					onToggleFavorite={toggleFavorite}
				/>

				{numFound > PAGE_SIZE && (
				<Pagination
					page={page}
					perPage={PAGE_SIZE}
					total={numFound}
					onChange={(p) => setPage(p)}
				/>
				)}
			</main>

			<footer className="footer">
				<div className="container">Built with ❤️ using Open Library API</div>
			</footer>
		</div>
	);
}
