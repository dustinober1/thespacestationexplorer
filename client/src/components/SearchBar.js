import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

/**
 * SearchBar component allows users to search for planets
 * @param {Array} planets - Array of planet objects to search through
 * @param {Function} onSearch - Function to call when search term changes
 * @returns {JSX.Element} The search bar component
 */
function SearchBar({ planets, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    // Filter planets based on search term
    const filteredPlanets = planets.filter(planet =>
      planet.name.toLowerCase().includes(value.toLowerCase()) ||
      planet.description.toLowerCase().includes(value.toLowerCase()) ||
      (planet.type && planet.type.toLowerCase().includes(value.toLowerCase()))
    );
    
    onSearch(filteredPlanets, value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch(planets, '');
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search for planets..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button className="clear-search-button" onClick={clearSearch} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  planets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;