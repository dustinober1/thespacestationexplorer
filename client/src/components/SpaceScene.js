import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import AsteroidBelt from './AsteroidBelt';

/**
 * Planet component renders a single planet in the 3D scene
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
      return new THREE.MeshStandardMaterial({
        color: planet?.color || '#ffffff',
        roughness: 0.7,
        metalness: 0.2
      });
    } catch (error) {
      console.error('Error creating planet material:', error);
      return new THREE.MeshStandardMaterial({ color: '#ffffff' });
    }
  }, [planet?.color]);

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

function SpaceScene({ planet }) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, planet ? 8 : 20], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4FC3F7" />
        
        <Stars
          radius={300}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        {planet ? <Planet planet={planet} /> : <AsteroidBelt />}
        
        <OrbitControls
          enablePan={false}
          minDistance={planet ? 3 : 10}
          maxDistance={planet ? 15 : 50}
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
  })
};

export default SpaceScene;
