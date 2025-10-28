import React from 'react';
import './PlanetSelector.css';

function PlanetSelector({ planets, selectedPlanet, onSelectPlanet }) {
  return (
    <div className="planet-selector">
      {planets.map(planet => (
        <button
          key={planet.id}
          className={`planet-button ${selectedPlanet?.id === planet.id ? 'active' : ''}`}
          onClick={() => onSelectPlanet(planet.id)}
          title={planet.name}
        >
          <div 
            className="planet-icon" 
            style={{ backgroundColor: planet.color }}
          />
          <span className="planet-name">{planet.name}</span>
        </button>
      ))}
    </div>
  );
}

export default PlanetSelector;
