import React from 'react';
import './PlanetInfo.css';

function PlanetInfo({ planet }) {
  if (!planet) return null;

  return (
    <div className="planet-info">
      <h2>{planet.name}</h2>
      <p className="description">{planet.description}</p>
      
      <div className="info-grid">
        <div className="info-item">
          <span className="label">Diameter:</span>
          <span className="value">{planet.diameter.toLocaleString()} km</span>
        </div>
        <div className="info-item">
          <span className="label">Mass:</span>
          <span className="value">{planet.mass}</span>
        </div>
        <div className="info-item">
          <span className="label">Distance from Sun:</span>
          <span className="value">{planet.distanceFromSun} million km</span>
        </div>
        <div className="info-item">
          <span className="label">Orbital Period:</span>
          <span className="value">{planet.orbitalPeriod} Earth days</span>
        </div>
        <div className="info-item">
          <span className="label">Rotation Period:</span>
          <span className="value">{Math.abs(planet.rotationPeriod)} hours</span>
        </div>
        <div className="info-item">
          <span className="label">Moons:</span>
          <span className="value">{planet.moons}</span>
        </div>
      </div>
      
      <div className="facts-section">
        <h3>🌟 Interesting Facts</h3>
        <ul>
          {planet.facts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlanetInfo;
