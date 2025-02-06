import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';

/**
 * @param {Object} props
 * @param {function(string):void} props.onSearch - Function to call when a search is performed.
 * @param {boolean} props.isLoading - Indicates whether the search is currently loading.
 */
export function SearchBar({ onSearch, isLoading }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  const handleClear = () => {
    setUsername('');
  };

  return (
    <div className="relative flex items-center w-full max-w-md">
      <Search className="absolute left-4 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search GitHub users..."
        className="w-full py-2 pl-12 pr-12 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {username && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-16 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      <button
        onClick={handleSubmit}
        disabled={!username.trim() || isLoading}
        className="absolute right-2 px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-sm font-medium"
      >
        {isLoading ? '...' : 'Search'}
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
