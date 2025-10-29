import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './PlanetSelector.css';

/**
 * PlanetSelector component displays buttons to select different planets
 * @param {Array} planets - Array of planet objects
 * @param {Object} selectedPlanet - Currently selected planet object
 * @param {Function} onSelectPlanet - Function to call when a planet is selected
 * @returns {JSX.Element} The planet selector component
 */
function PlanetSelector({ planets, selectedPlanet, onSelectPlanet }) {
  // Memoize the grouped planets to prevent unnecessary recomputation
  const groupedPlanets = useMemo(() => {
    return planets.reduce((acc, planet) => {
      const type = planet.type || 'planet';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(planet);
      return acc;
    }, {});
  }, [planets]);

  return (
    <div className="planet-selector">
      {Object.entries(groupedPlanets).map(([type, planetList]) => (
        <div key={type} className="planet-group">
          <h2 className="planet-group-title">{type === 'planet' ? 'Planets' : 'Dwarf Planets'}</h2>
          <div className="planet-buttons">
            {planetList.map(planet => (
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
        </div>
      ))}
    </div>
  );
}

PlanetSelector.propTypes = {
  planets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      type: PropTypes.string
    })
  ).isRequired,
  selectedPlanet: PropTypes.shape({
    id: PropTypes.string
  }),
  onSelectPlanet: PropTypes.func.isRequired
};

export default PlanetSelector;
