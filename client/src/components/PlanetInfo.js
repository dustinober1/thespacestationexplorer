import React from 'react';
import PropTypes from 'prop-types';
import './PlanetInfo.css';

/**
 * PlanetInfo component displays detailed information about a selected planet
 * @param {Object} planet - The planet object containing its properties
 * @returns {JSX.Element|null} The planet info component or null if no planet is provided
 */
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
          <span className="value">
            {planet.moons && planet.moons.length > 0
              ? planet.moons.map((moon, index) => moon.name).join(', ')
              : 'None'}
          </span>
        </div>
        {planet.gravity !== undefined && (
          <div className="info-item">
            <span className="label">Surface Gravity:</span>
            <span className="value">{planet.gravity} m/s²</span>
          </div>
        )}
        {planet.density !== undefined && (
          <div className="info-item">
            <span className="label">Density:</span>
            <span className="value">{planet.density} g/cm³</span>
          </div>
        )}
        {planet.escapeVelocity !== undefined && (
          <div className="info-item">
            <span className="label">Escape Velocity:</span>
            <span className="value">{planet.escapeVelocity} km/s</span>
          </div>
        )}
        {planet.axialTilt !== undefined && (
          <div className="info-item">
            <span className="label">Axial Tilt:</span>
            <span className="value">{planet.axialTilt}°</span>
          </div>
        )}
      </div>
      
      <div className="facts-section">
        <h3>🌟 Interesting Facts</h3>
        <ul>
          {planet.facts && planet.facts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

PlanetInfo.propTypes = {
  planet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    diameter: PropTypes.number.isRequired,
    mass: PropTypes.string.isRequired,
    distanceFromSun: PropTypes.number.isRequired,
    orbitalPeriod: PropTypes.number.isRequired,
    rotationPeriod: PropTypes.number.isRequired,
    temperature: PropTypes.oneOfType([
      PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
      }),
      PropTypes.number
    ]),
    gravity: PropTypes.number,
    density: PropTypes.number,
    escapeVelocity: PropTypes.number,
    axialTilt: PropTypes.number,
    moons: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ),
    color: PropTypes.string,
    texture: PropTypes.string,
    hasRings: PropTypes.bool,
    type: PropTypes.string,
    facts: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

export default PlanetInfo;
