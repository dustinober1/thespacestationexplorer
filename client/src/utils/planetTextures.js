/**
 * Utilities for planet textures
 */

// Define texture mapping for planets
const textureMap = {
  mercury: 'mercury.jpg',
  venus: 'venus.jpg',
  earth: 'earth.jpg',
  mars: 'mars.jpg',
  jupiter: 'jupiter.jpg',
  saturn: 'saturn.jpg',
  uranus: 'uranus.jpg',
  neptune: 'neptune.jpg',
  pluto: 'pluto.jpg',
  ceres: 'ceres.jpg',
  haumea: 'haumea.jpg',
  makemake: 'makemake.jpg',
  eris: 'eris.jpg'
};

/**
 * Get the texture path for a given planet
 * @param {string} planetId - The ID of the planet
 * @returns {string} The path to the texture file
 */
export const getPlanetTexturePath = (planetId) => {
  const textureFile = textureMap[planetId];
  return textureFile ? `/textures/${textureFile}` : null;
};

/**
 * Check if a texture exists for a given planet
 * @param {string} planetId - The ID of the planet
 * @returns {boolean} Whether a texture exists for the planet
 */
export const hasPlanetTexture = (planetId) => {
  return !!textureMap[planetId];
};

/**
 * Get all available texture mappings
 * @returns {Object} Object mapping planet IDs to texture files
 */
export const getAllTextureMappings = () => {
  return { ...textureMap };
};