import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '../constants/planets';

interface PlanetProps {
  data: PlanetData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isOrbiting: boolean;
}

export function Planet({ data, isSelected, onSelect, isOrbiting }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Random starting angle
  const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (isOrbiting && !isSelected) {
      const time = state.clock.getElapsedTime();
      const angle = startAngle + time * data.speed;
      meshRef.current.position.x = Math.cos(angle) * data.distance;
      meshRef.current.position.z = Math.sin(angle) * data.distance;
      meshRef.current.position.y = Math.sin(angle * 0.5) * 2; // Slight vertical wobble
      
      // Update glow position
      if (glowRef.current) {
        glowRef.current.position.copy(meshRef.current.position);
      }
    } else if (isSelected) {
      // Smoothly transition to center if selected
      meshRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      if (glowRef.current) {
        glowRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      }
    }

    // Rotation
    meshRef.current.rotation.y += 0.01;
  });

  const scale = isSelected ? 3 : hovered ? data.size * 1.2 : data.size;

  return (
    <group>
      {/* Outer Glow Effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[scale * 1.4, 32, 32]} />
        <meshBasicMaterial 
          color={data.glowColor} 
          transparent 
          opacity={hovered || isSelected ? 0.2 : 0.05} 
          side={THREE.BackSide}
        />
      </mesh>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(data.id);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={scale}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={data.color}
            speed={hovered ? 3 : 1}
            distort={hovered ? 0.4 : 0.2}
            roughness={0.5}
            metalness={0.8}
          />
          
          {/* Planet Name Label (only when orbiting or hovered) */}
          {(hovered && !isSelected) && (
            <Text
              position={[0, 1.5, 0]}
              fontSize={0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {data.name}
            </Text>
          )}
        </mesh>
      </Float>
    </group>
  );
}
