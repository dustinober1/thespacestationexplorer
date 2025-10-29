import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import { getPlanetTexturePath, hasPlanetTexture } from '../utils/planetTextures';

/**
 * TexturedPlanet component renders a planet with a realistic texture
 */
function TexturedPlanet({ planet, useTexture = true }) {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);
  const [textureError, setTextureError] = useState(false);
  
  // Try to load the texture if requested
  useEffect(() => {
    if (useTexture && hasPlanetTexture(planet.id)) {
      const texturePath = getPlanetTexturePath(planet.id);
      if (texturePath) {
        // For now, we'll use the color as a fallback, later textures can be loaded with TextureLoader
        // The texture loading would happen here if we had actual image files
        setTexture(null); // For now, we'll rely on the color approach
      } else {
        setTextureError(true);
      }
    } else {
      setTextureError(true); // If no texture mapping exists, use color fallback
    }
  }, [planet.id, useTexture]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  if (!planet) return null;

  // Calculate planet size based on diameter (scaled down)
  const size = Math.max(1, Math.log(planet.diameter) / 2);

  // Default to color if texture is not available
  const materialProps = !textureError && texture ? {
    map: texture,
    roughness: 0.7,
    metalness: 0.1
  } : {
    color: planet.color,
    roughness: 0.7,
    metalness: 0.2
  };

  // Apply more specific material properties based on the planet
  switch(planet.id) {
    case 'earth':
      materialProps.roughness = 0.6;
      materialProps.metalness = 0.1;
      break;
    case 'jupiter':
      materialProps.roughness = 0.8;
      materialProps.metalness = 0.05;
      break;
    case 'saturn':
      materialProps.roughness = 0.9;
      materialProps.metalness = 0.05;
      break;
    case 'mercury':
      materialProps.roughness = 0.9;
      materialProps.metalness = 0.1;
      break;
    case 'venus':
      materialProps.roughness = 0.7;
      materialProps.metalness = 0.1;
      break;
    case 'mars':
      materialProps.roughness = 0.8;
      materialProps.metalness = 0.1;
      break;
    case 'uranus':
    case 'neptune':
      materialProps.roughness = 0.7;
      materialProps.metalness = 0.15;
      break;
  }

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      
      {planet.hasRings && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.5, size * 2.5, 64]} />
          <meshStandardMaterial
            color="#DAA520"
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );
}

TexturedPlanet.propTypes = {
  planet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    diameter: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    hasRings: PropTypes.bool
  }).isRequired,
  useTexture: PropTypes.bool
};

export default TexturedPlanet;