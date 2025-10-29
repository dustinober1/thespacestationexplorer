import React, { useMemo } from 'react';
import * as THREE from 'three';

const AsteroidBelt = React.memo(() => {
  const asteroids = useMemo(() => {
    const belt = new THREE.Group();
    const asteroidCount = 1500;
    const beltRadius = 10;
    const beltWidth = 4;

    const asteroidGeometry = new THREE.DodecahedronGeometry(0.05, 0);
    const asteroidMaterial = new THREE.MeshStandardMaterial({
      color: '#A9A9A9',
      roughness: 0.8,
      metalness: 0.5,
    });

    for (let i = 0; i < asteroidCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = beltRadius + (Math.random() - 0.5) * beltWidth;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.5;

      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      asteroid.position.set(x, y, z);
      asteroid.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      belt.add(asteroid);
    }
    return belt;
  }, []);

  return <primitive object={asteroids} />;
});

export default AsteroidBelt;
