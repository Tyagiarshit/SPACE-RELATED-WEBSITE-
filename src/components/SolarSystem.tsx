import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { PLANETS } from '../constants/planets';
import { Planet } from './Planet';
import { Starfield } from './Starfield';

interface SolarSystemProps {
  selectedId: string | null;
  onSelectPlanet: (id: string) => void;
}

export function SolarSystem({ selectedId, onSelectPlanet }: SolarSystemProps) {
  return (
    <div className="w-full h-full absolute inset-0 bg-[#050505]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 40, 80]} fov={45} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={!selectedId} 
          maxDistance={150} 
          minDistance={10}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
        
        <Starfield />

        {/* Sun Placeholder */}
        {!selectedId && (
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[4, 64, 64]} />
            <meshBasicMaterial color="#FFD700" />
            <pointLight intensity={5} distance={100} color="#FFD700" />
          </mesh>
        )}

        {PLANETS.map((planet) => (
          <Planet
            key={planet.id}
            data={planet}
            isSelected={selectedId === planet.id}
            onSelect={onSelectPlanet}
            isOrbiting={!selectedId}
          />
        ))}

        <EffectComposer>
          <Bloom 
            intensity={1.5} 
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.9} 
            radius={0.8} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
