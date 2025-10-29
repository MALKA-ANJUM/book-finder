import React, { useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("");
    const debounced = useDebounce(term, 500);

    React.useEffect(() => {
        onSearch(debounced.trim());
    }, [debounced]);

    return (
        <div className="searchbar">
        <label htmlFor="search" className="visually-hidden">
            Search books
        </label>
        <input
            id="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search by book title — try ‘Pride and Prejudice’"
            className="search-input"
            autoComplete="off"
        />
        </div>
    );
}
