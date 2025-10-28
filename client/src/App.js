import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpaceScene from './components/SpaceScene';
import PlanetInfo from './components/PlanetInfo';
import PlanetSelector from './components/PlanetSelector';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await axios.get('/api/planets');
      setPlanets(response.data);
      setSelectedPlanet(response.data[2]); // Default to Earth
      setLoading(false);
    } catch (err) {
      console.error('Error fetching planets:', err);
      setError('Failed to load planets. Make sure the server is running.');
      setLoading(false);
    }
  };

  const handlePlanetSelect = (planetId) => {
    const planet = planets.find(p => p.id === planetId);
    setSelectedPlanet(planet);
  };

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
      
      <PlanetSelector 
        planets={planets}
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
