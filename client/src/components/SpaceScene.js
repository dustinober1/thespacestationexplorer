import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import AsteroidBelt from './AsteroidBelt';
import OrbitalPaths from './OrbitalPaths';
import SpaceStations from './SpaceStations';

/**
 * Individual planet component in the 3D scene
 */
function Planet({ planet }) {
  const meshRef = useRef();
  
  // Memoize geometry to prevent unnecessary re-creation
  const geometry = useMemo(() => {
    if (!planet) return null;
    try {
      const size = Math.max(1, Math.log(planet.diameter) / 2);
      return new THREE.SphereGeometry(size, 64, 64);
    } catch (error) {
      console.error('Error creating planet geometry:', error);
      return null;
    }
  }, [planet]);

  // Memoize material to prevent unnecessary re-creation
  const material = useMemo(() => {
    try {
      // Adjust material properties based on planet type for more realistic appearance
      let materialParams = {
        color: planet?.color || '#ffffff',
        roughness: 0.7,
        metalness: 0.2
      };

      // Adjust properties for different planets to make them more realistic
      switch(planet?.id) {
        case 'earth':
          materialParams = {
            ...materialParams,
            roughness: 0.6,
            metalness: 0.1
          };
          break;
        case 'jupiter':
          materialParams = {
            ...materialParams,
            roughness: 0.8,
            metalness: 0.05
          };
          break;
        case 'saturn':
          materialParams = {
            ...materialParams,
            roughness: 0.9,
            metalness: 0.05
          };
          break;
        case 'mercury':
          materialParams = {
            ...materialParams,
            roughness: 0.9,
            metalness: 0.1
          };
          break;
        case 'venus':
          materialParams = {
            ...materialParams,
            roughness: 0.7,
            metalness: 0.1
          };
          break;
        case 'mars':
          materialParams = {
            ...materialParams,
            roughness: 0.8,
            metalness: 0.1
          };
          break;
        case 'uranus':
        case 'neptune':
          materialParams = {
            ...materialParams,
            roughness: 0.7,
            metalness: 0.15
          };
          break;
      }

      return new THREE.MeshStandardMaterial(materialParams);
    } catch (error) {
      console.error('Error creating planet material:', error);
      return new THREE.MeshStandardMaterial({ color: '#ffffff' });
    }
  }, [planet?.color, planet?.id]);

  // Memoize ring geometry if planet has rings
  const ringGeometry = useMemo(() => {
    if (planet?.hasRings) {
      try {
        const size = Math.max(1, Math.log(planet.diameter) / 2);
        return new THREE.RingGeometry(size * 1.5, size * 2.5, 64);
      } catch (error) {
        console.error('Error creating ring geometry:', error);
        return null;
      }
    }
    return null;
  }, [planet?.hasRings, planet?.diameter]);

  // Memoize ring material
  const ringMaterial = useMemo(() => {
    try {
      return new THREE.MeshStandardMaterial({
        color: "#DAA520",
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
    } catch (error) {
      console.error('Error creating ring material:', error);
      return new THREE.MeshStandardMaterial({ color: "#DAA520" });
    }
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  if (!planet || !geometry) return null;

  // Calculate planet size based on diameter (scaled down)
  const size = Math.max(1, Math.log(planet.diameter) / 2);

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} material={material} />
      
      {planet.hasRings && ringGeometry && (
        <mesh rotation={[Math.PI / 2, 0, 0]} geometry={ringGeometry} material={ringMaterial} />
      )}
      
      {/* Add space stations and satellites if the planet has moons */}
      {planet.moons && planet.moons.length > 0 && (
        <SpaceStations planet={planet} />
      )}
    </group>
  );
}

Planet.propTypes = {
  planet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    diameter: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    hasRings: PropTypes.bool
  })
};

/**
 * Solar system view with multiple planets and orbital paths
 */
function SolarSystem({ planets }) {
  const systemRef = useRef();
  
  useFrame(() => {
    if (systemRef.current) {
      // Slow rotation of the entire solar system
      systemRef.current.rotation.y += 0.0001;
    }
  });

  // Position planets based on their distance from the sun
  const positionedPlanets = useMemo(() => {
    return planets.map(planet => {
      // Scale the orbital distance to be visible in our 3D scene
      const scaledDistance = Math.min(50, planet.distanceFromSun / 10);
      // Add some vertical offset to avoid overlap
      const verticalOffset = planet.id === 'saturn' || planet.id === 'uranus' || planet.id === 'neptune' ? 1 : 0;
      
      return {
        ...planet,
        position: [
          Math.cos(planet.id.charCodeAt(0) * 0.1) * scaledDistance,
          verticalOffset,
          Math.sin(planet.id.charCodeAt(0) * 0.1) * scaledDistance
        ],
        size: Math.max(0.2, Math.log(planet.diameter) / 3) // Adjust size for solar system view
      };
    });
  }, [planets]);

  return (
    <group ref={systemRef}>
      {/* Sun at the center */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.5} />
      </mesh>

      {positionedPlanets.map(planet => {
        const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
        const material = new THREE.MeshStandardMaterial({
          color: planet.color,
          roughness: 0.7,
          metalness: 0.2
        });

        return (
          <group key={planet.id} position={planet.position}>
            <mesh geometry={geometry} material={material}>
              <meshStandardMaterial 
                color={planet.color} 
                roughness={0.7} 
                metalness={0.2}
              />
            </mesh>
            
            {planet.hasRings && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[planet.size * 1.5, planet.size * 2.5, 64]} />
                <meshStandardMaterial
                  color="#DAA520"
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            )}
            
            {/* Add space stations and satellites if the planet has moons */}
            {planet.moons && planet.moons.length > 0 && (
              <SpaceStations planet={planet} />
            )}
          </group>
        );
      })}
    </group>
  );
}

SolarSystem.propTypes = {
  planets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      diameter: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      distanceFromSun: PropTypes.number.isRequired,
      hasRings: PropTypes.bool
    })
  ).isRequired
};

/**
 * Main SpaceScene component that can show either individual planets or the entire solar system
 */
function SpaceScene({ planet, planets = [], showSolarSystem = false }) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ 
          position: showSolarSystem ? [0, 30, 60] : [0, 0, planet ? 8 : 20], 
          fov: showSolarSystem ? 60 : 60 
        }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#FDB813" /> {/* Sun */}
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <Stars
          radius={300}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        {showSolarSystem ? (
          <>
            <SolarSystem planets={planets} />
            <OrbitalPaths planets={planets} />
          </>
        ) : planet ? (
          <Planet planet={planet} />
        ) : (
          <AsteroidBelt />
        )}
        
        <OrbitControls
          enablePan={false}
          minDistance={showSolarSystem ? 10 : planet ? 3 : 10}
          maxDistance={showSolarSystem ? 200 : planet ? 15 : 50}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

SpaceScene.propTypes = {
  planet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    diameter: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    hasRings: PropTypes.bool
  }),
  planets: PropTypes.array,
  showSolarSystem: PropTypes.bool
};

export default SpaceScene;