import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useLoader } from '@react-three/drei';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import AsteroidBelt from './AsteroidBelt';
import OrbitalPaths from './OrbitalPaths';
import SpaceStations from './SpaceStations';

// Planet texture mapping
const textureMap = {
  mercury: '/textures/8k_mercury.jpg',
  venus: '/textures/venus.jpg',
  earth: '/textures/8k_earth_clouds.jpg',
  mars: '/textures/mars.jpg',
  jupiter: '/textures/jupiter.jpg',
  saturn: '/textures/saturn.jpg',
  uranus: '/textures/uranus.jpg',
  neptune: '/textures/neptune.jpg',
  pluto: '/textures/pluto.jpg',
  ceres: '/textures/ceres.jpg',
  haumea: '/textures/haumea.jpg',
  makemake: '/textures/makemake.jpg',
  eris: '/textures/eris.jpg',
  sun: '/textures/sun_solarsystemscope.jpg'
};

/**
 * Sun component with texture and glow effect
 */
function Sun() {
  const meshRef = useRef();

  // Load sun texture
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    try {
      const texturePath = textureMap['sun'];
      const loadedTexture = loader.load(texturePath);
      loadedTexture.colorSpace = THREE.SRGBColorSpace;
      return loadedTexture;
    } catch (error) {
      console.warn('Texture not found for sun, using color fallback');
      return null;
    }
  }, []);

  // Sun geometry - larger than planets
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(4, 64, 64);
  }, []);

  // Sun material with emissive glow
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      color: '#FFFFFF',
      emissive: '#FFA500',
      emissiveIntensity: 1.5, // Balanced - texture visible!
      roughness: 0.3, // Smooth but not mirror-like
      metalness: 0.4 // Reflective but not overdone
    });
  }, [texture]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material}>
      {/* Add point light to simulate sun's glow - balanced */}
      <pointLight intensity={2.5} color="#FFFFFF" distance={100} decay={2} />
    </mesh>
  );
}

/**
 * Individual planet component in the 3D scene
 */
function Planet({ planet }) {
  const meshRef = useRef();

  // Load planet texture with error handling using THREE.TextureLoader
  const texturePath = textureMap[planet?.id];
  const texture = useMemo(() => {
    if (!texturePath) return null;

    const loader = new THREE.TextureLoader();
    try {
      const loadedTexture = loader.load(texturePath);
      // Ensure the texture is correctly formatted
      loadedTexture.colorSpace = THREE.SRGBColorSpace;
      return loadedTexture;
    } catch (error) {
      console.warn(`Texture not found for ${planet?.id}, using color fallback`);
      return null;
    }
  }, [texturePath]);

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

  // Memoize material with texture or color fallback
  const material = useMemo(() => {
    try {
      const materialParams = {
        map: texture,
        color: planet?.color || '#ffffff',
        roughness: 0.7,
        metalness: 0.2
      };

      // Adjust properties for different planets
      switch(planet?.id) {
        case 'earth':
          materialParams.roughness = 0.5; // Smoother, more reflective
          materialParams.metalness = 0.25;
          break;
        case 'jupiter':
        case 'saturn':
          materialParams.roughness = 0.8;
          materialParams.metalness = 0.05;
          break;
        case 'venus':
          materialParams.roughness = 0.7;
          materialParams.metalness = 0.1;
          break;
        case 'mars':
          materialParams.roughness = 0.8;
          materialParams.metalness = 0.1;
          break;
        case 'uranus':
        case 'neptune':
          materialParams.roughness = 0.7;
          materialParams.metalness = 0.15;
          break;
        default:
          break;
      }

      return new THREE.MeshStandardMaterial(materialParams);
    } catch (error) {
      console.error('Error creating planet material:', error);
      return new THREE.MeshStandardMaterial({ color: planet?.color || '#ffffff' });
    }
  }, [texture, planet?.color, planet?.id]);

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

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} material={material} />
      {planet.hasRings && ringGeometry && (
        <mesh rotation={[Math.PI / 2, 0, 0]} geometry={ringGeometry} material={ringMaterial} />
      )}
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

  // Position planets based on their distance from the sun with better spacing
  const positionedPlanets = useMemo(() => {
    if (!planets || !Array.isArray(planets) || planets.length === 0) {
      return [];
    }

    return planets.map((planet, index) => {
      // Much better orbital spacing based on actual distance and index
      const baseDistance = 8; // Starting distance
      const distanceIncrement = 6; // Space between each planet
      const scaledDistance = baseDistance + (index * distanceIncrement);
      // Use actual orbital position with slight angle variation
      const angle = index * (Math.PI * 2 / Math.max(planets.length, 1)) + (index * 0.3);
      const verticalOffset = (index % 2 === 0) ? 1.5 : -1.5; // Alternating vertical position

      return {
        ...planet,
        position: [
          Math.cos(angle) * scaledDistance,
          verticalOffset,
          Math.sin(angle) * scaledDistance
        ],
        size: Math.max(0.3, Math.log(planet.diameter) / 3) // Slightly larger for better visibility
      };
    });
  }, [planets]);

  return (
    <group ref={systemRef}>
      {/* Sun at the center */}
      <Sun />

      {positionedPlanets.map(planet => {
        const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
        const texturePath = textureMap[planet.id];
        const texture = useMemo(() => {
          if (!texturePath) return null;
          const loader = new THREE.TextureLoader();
          try {
            const loadedTexture = loader.load(texturePath);
            loadedTexture.colorSpace = THREE.SRGBColorSpace;
            return loadedTexture;
          } catch (error) {
            console.warn(`Texture not found for ${planet.id}, using color fallback`);
            return null;
          }
        }, [texturePath]);

        return (
          <group key={planet.id} position={planet.position}>
            <mesh geometry={geometry}>
              <meshStandardMaterial
                map={texture}
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
  // Load milky way background texture
  const milkyWayTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    try {
      const loadedTexture = loader.load('/textures/Texturelabs_Sky_173XL.jpg');
      loadedTexture.colorSpace = THREE.SRGBColorSpace;
      return loadedTexture;
    } catch (error) {
      console.warn('Stars texture not found, using black background');
      return null;
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{
          position: showSolarSystem ? [0, 30, 60] : [0, 0, planet ? 8 : 20],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: '#000000' }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        onCreated={({ scene }) => {
          // Set milky way texture as the scene background
          if (milkyWayTexture) {
            scene.background = milkyWayTexture;
          }
        }}
      >
        <ambientLight intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 0, 0]} intensity={3} color="#FDB813" />
        <pointLight position={[50, 50, 50]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-50, -50, 50]} intensity={0.8} color="#ffffff" />
        <pointLight position={[50, -50, -50]} intensity={0.8} color="#ffffff" />

        {/* Deep space stars - far background */}
        <Stars
          radius={800}
          depth={200}
          count={15000}
          factor={8}
          saturation={0.3}
          fade
          speed={0.3}
        />

        {/* Main star field - mid ground */}
        <Stars
          radius={600}
          depth={150}
          count={12000}
          factor={6}
          saturation={0.5}
          fade
          speed={0.4}
        />

        {/* Nebula stars - colored for visual depth */}
        <Stars
          radius={500}
          depth={100}
          count={8000}
          factor={5}
          saturation={0.8}
          fade
          speed={0.2}
          color="#4a90e2"
        />

        {/* Foreground stars - closer */}
        <Stars
          radius={400}
          depth={80}
          count={7000}
          factor={4}
          saturation={0.7}
          fade
          speed={0.6}
          color="#ffffff"
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
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={1.2}
          panSpeed={0.8}
          rotateSpeed={0.6}
          minDistance={showSolarSystem ? 5 : planet ? 2 : 5}
          maxDistance={showSolarSystem ? 500 : planet ? 50 : 200}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          autoRotate={false}
          autoRotateSpeed={0.5}
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