'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchInput = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${query}`);
    // Aquí, añadir la lógica de búsqueda (llamada a API, etc.)
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
      <div className="flex w-full max-w-2xl rounded-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services or helpers..."
          className="flex-grow p-3 text-black dark:text-white bg-white dark:bg-gray-700 rounded-l-md focus:outline-none "
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-red-600 text-white dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 rounded-r-md focus:outline-none"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
