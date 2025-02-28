"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log(`Searching for: ${query}`);
    // Lógica adicional para realizar la búsqueda
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex w-full max-w-2xl rounded-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services or helpers..."
          className="flex-grow p-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-700"
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-red-600 text-white dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 rounded-r-lg focus:outline-none"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
