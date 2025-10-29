import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import SpaceScene from './components/SpaceScene';
import PlanetInfo from './components/PlanetInfo';
import PlanetSelector from './components/PlanetSelector';
import SearchBar from './components/SearchBar';
import './App.css';

/**
 * Main App component that serves as the entry point for the Space Station Explorer application
 * @returns {JSX.Element} The main application component
 */
function App() {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches planet data from the backend API
   */
  const fetchPlanets = useCallback(async () => {
    try {
      const response = await axios.get('/api/planets');
      setPlanets(response.data);
      setFilteredPlanets(response.data); // Initialize with all planets
      // Default to Earth (index 2) if it exists, otherwise use the first planet
      const earth = response.data.find(planet => planet.id === 'earth');
      setSelectedPlanet(earth || response.data[0] || null);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching planets:', err);
      setError('Failed to load planets. Make sure the server is running.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  /**
   * Handles the selection of a planet
   * @param {string} planetId - The ID of the selected planet
   */
  const handlePlanetSelect = useCallback((planetId) => {
    const planet = planets.find(p => p.id === planetId);
    if (planet) {
      setSelectedPlanet(planet);
    }
  }, [planets]);

  /**
   * Handles the search functionality
   * @param {Array} filtered - Array of filtered planets
   * @param {string} searchTerm - Current search term
   */
  const handleSearch = useCallback((filtered, searchTerm) => {
    setFilteredPlanets(filtered);
    
    // If current selected planet is not in filtered results, 
    // select the first result or clear selection
    if (selectedPlanet && !filtered.includes(selectedPlanet) && searchTerm) {
      setSelectedPlanet(filtered[0] || null);
    } else if (!searchTerm && selectedPlanet) {
      // If search is cleared, ensure selected planet is still valid
      const validPlanet = planets.find(p => p.id === selectedPlanet.id);
      if (validPlanet) {
        setSelectedPlanet(validPlanet);
      }
    }
  }, [selectedPlanet, planets]);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading Space Station Explorer...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🚀 Space Station Explorer</h1>
        <p>Explore the Planets of Our Solar System</p>
      </header>
      
      <SearchBar 
        planets={planets}
        onSearch={handleSearch}
      />
      
      <PlanetSelector 
        planets={filteredPlanets}
        selectedPlanet={selectedPlanet}
        onSelectPlanet={handlePlanetSelect}
      />
      
      <SpaceScene planet={selectedPlanet} />
      
      {selectedPlanet && <PlanetInfo planet={selectedPlanet} />}
      
      <div className="controls-info">
        <p>🖱️ Click and drag to rotate | Scroll to zoom</p>
      </div>
    </div>
  );
}

export default App;
