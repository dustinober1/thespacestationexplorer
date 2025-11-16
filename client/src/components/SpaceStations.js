import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

import PropTypes from 'prop-types';

// Moon texture mapping
const moonTextureMap = {
  'Moon': '/textures/8k_moon.jpg'
};

/**
 * SpaceStations component displays space stations and satellites orbiting planets
 * @param {Object} planet - The planet around which to show satellites
 * @param {Array} celestialObjects - Array of space stations and satellites
 * @returns {JSX.Element} Space stations and satellites component
 */
function SpaceStations({ planet, celestialObjects = [] }) {
  // Generate orbits for satellites
  const satelliteOrbits = useMemo(() => {
    if (!planet || !planet.moons || planet.moons.length === 0) return [];
    
    return planet.moons.map((moon, index) => {
      // Calculate orbital distance based on position in the array
      const baseDistance = Math.max(1, Math.log(planet.diameter) / 2) * 1.5;
      // Make Moon orbit much farther for better visibility
      const distance = moon.name === 'Moon'
        ? baseDistance + 1.5  // Moon gets extra distance
        : baseDistance + (index * 0.5); // Other moons
      const orbitPoints = [];
      const segments = 64;
      
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        orbitPoints.push([x, 0, z]);
      }
      
      return {
        id: `${planet.id}-${moon.name}`,
        name: moon.name,
        points: orbitPoints,
        distance: distance,
        angle: index * (Math.PI * 2 / planet.moons.length) // Stagger initial positions
      };
    });
  }, [planet]);

  // Generate positions for satellites in their orbits
  const satellitePositions = useMemo(() => {
    return satelliteOrbits.map((orbit, index) => {
      // Calculate position based on orbital angle
      const position = [
        Math.cos(orbit.angle + index * 0.5) * orbit.distance,
        0.2 * Math.sin(index), // Slight vertical variation
        Math.sin(orbit.angle + index * 0.5) * orbit.distance
      ];
      
      return {
        ...orbit,
        position: position
      };
    });
  }, [satelliteOrbits]);

  // For now, just show the orbits and placeholder for satellites
  return (
    <>
      {/* Render orbital paths */}
      {satelliteOrbits.map((orbit) => (
        <Line
          key={`orbit-${orbit.id}`}
          points={orbit.points}
          color="#4FC3F7"
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      ))}
      
      {/* Render satellites/moons as spheres */}
      {satellitePositions.map((sat, index) => {
        // Load texture for the Moon
        const moonTexture = useMemo(() => {
          if (sat.name === 'Moon' && moonTextureMap[sat.name]) {
            const loader = new THREE.TextureLoader();
            const texture = loader.load(moonTextureMap[sat.name]);
            texture.colorSpace = THREE.SRGBColorSpace;
            return texture;
          }
          return null;
        }, [sat.name]);

        // Determine size - Moon should be bigger
        const isMoon = sat.name === 'Moon';
        const size = isMoon ? 0.3 : 0.1; // 3x bigger for the Moon!

        return (
          <mesh key={`sat-${sat.id}`} position={sat.position}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial
              map={moonTexture}
              color={moonTexture ? '#ffffff' : '#C0C0C0'}
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>
        );
      })}
    </>
  );
}

SpaceStations.propTypes = {
  planet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    diameter: PropTypes.number.isRequired,
    moons: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        facts: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }),
  celestialObjects: PropTypes.array
};

export default SpaceStations;