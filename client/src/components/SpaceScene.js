import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Planet({ planet }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  if (!planet) return null;

  // Calculate planet size based on diameter (scaled down)
  const size = Math.max(1, Math.log(planet.diameter) / 2);

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          color={planet.color}
          roughness={0.7}
          metalness={0.2}
        />
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

function SpaceScene({ planet }) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
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
        
        <Planet planet={planet} />
        
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={15}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

export default SpaceScene;
