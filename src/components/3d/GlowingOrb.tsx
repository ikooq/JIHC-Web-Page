import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Orb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[2, 128, 128]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>
      
      {/* Inner glow */}
      <Sphere args={[1.8, 64, 64]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} />
      </Sphere>
    </Float>
  );
};

export const GlowingOrb = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#60a5fa" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3b82f6" />
          <Orb />
        </Suspense>
      </Canvas>
    </div>
  );
};
