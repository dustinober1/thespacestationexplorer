/**
 * Utility functions for validating planet data
 */

/**
 * Validates a single planet object
 * @param {Object} planet - The planet object to validate
 * @returns {Array} Array of validation errors, empty if valid
 */
export const validatePlanet = (planet) => {
  const errors = [];

  if (!planet.id || typeof planet.id !== 'string') {
    errors.push('Planet id is required and must be a string');
  }

  if (!planet.name || typeof planet.name !== 'string') {
    errors.push('Planet name is required and must be a string');
  }

  if (typeof planet.diameter !== 'number' || planet.diameter <= 0) {
    errors.push('Planet diameter is required and must be a positive number');
  }

  if (!planet.description || typeof planet.description !== 'string') {
    errors.push('Planet description is required and must be a string');
  }

  if (!planet.color || typeof planet.color !== 'string') {
    errors.push('Planet color is required and must be a string');
  }

  if (planet.mass && typeof planet.mass !== 'string') {
    errors.push('Planet mass must be a string if provided');
  }

  if (planet.distanceFromSun !== undefined && typeof planet.distanceFromSun !== 'number') {
    errors.push('Planet distanceFromSun must be a number if provided');
  }

  if (planet.orbitalPeriod !== undefined && typeof planet.orbitalPeriod !== 'number') {
    errors.push('Planet orbitalPeriod must be a number if provided');
  }

  if (planet.rotationPeriod !== undefined && typeof planet.rotationPeriod !== 'number') {
    errors.push('Planet rotationPeriod must be a number if provided');
  }

  if (planet.temperature) {
    if (typeof planet.temperature === 'object') {
      if (planet.temperature.min !== undefined && typeof planet.temperature.min !== 'number') {
        errors.push('Planet temperature.min must be a number if provided');
      }
      if (planet.temperature.max !== undefined && typeof planet.temperature.max !== 'number') {
        errors.push('Planet temperature.max must be a number if provided');
      }
    } else if (typeof planet.temperature !== 'number') {
      errors.push('Planet temperature must be an object or number');
    }
  }

  if (planet.moons && !Array.isArray(planet.moons)) {
    errors.push('Planet moons must be an array');
  }

  if (planet.facts && !Array.isArray(planet.facts)) {
    errors.push('Planet facts must be an array');
  }

  return errors;
};

/**
 * Validates the entire planets array
 * @param {Array} planets - Array of planet objects to validate
 * @returns {Array} Array of validation results for each planet
 */
export const validatePlanetsData = (planets) => {
  if (!Array.isArray(planets)) {
    return [{ errors: ['Planets data must be an array'], planetId: null }];
  }

  return planets.map(planet => {
    const errors = validatePlanet(planet);
    return {
      planetId: planet.id || 'unknown',
      errors,
      isValid: errors.length === 0
    };
  });
};

/**
 * Validates all planets and logs errors for debugging
 */
export const validateAndLogPlanets = (planets) => {
  const results = validatePlanetsData(planets);
  const invalidPlanets = results.filter(result => !result.isValid);

  if (invalidPlanets.length > 0) {
    console.warn('Invalid planets found:', invalidPlanets);
    return false;
  }

  return true;
};