import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import PropTypes from 'prop-types';

/**
 * OrbitalPaths component renders orbital paths for planets around the sun
 * @param {Array} planets - Array of planet objects to create orbits for
 * @returns {JSX.Element} The orbital paths component
 */
function OrbitalPaths({ planets }) {
  // Memoize orbital path calculations to prevent unnecessary re-computation
  const orbitalPaths = useMemo(() => {
    return planets.map((planet, index) => {
      // Scale the orbital distance to be visible in our 3D scene
      // The real distances would be too large to visualize properly
      const scaledDistance = Math.min(50, planet.distanceFromSun / 10);
      
      // Create points for the orbital path (a circle)
      const points = [];
      const segments = 128; // Number of segments in the orbit
      
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * scaledDistance;
        const z = Math.sin(angle) * scaledDistance;
        points.push([x, 0, z]);
      }

      return {
        id: planet.id,
        points,
        color: planet.color || '#ffffff',
        distance: scaledDistance
      };
    });
  }, [planets]);

  return (
    <>
      {orbitalPaths.map((orbit) => (
        <Line
          key={orbit.id}
          points={orbit.points}
          color={orbit.color}
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      ))}
    </>
  );
}

OrbitalPaths.propTypes = {
  planets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      distanceFromSun: PropTypes.number.isRequired,
      color: PropTypes.string
    })
  ).isRequired
};

export default OrbitalPaths;