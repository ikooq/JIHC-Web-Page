import { Canvas } from "@react-three/fiber";
import { Float, Sphere, Box, Torus, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AnimatedSphere = ({ position, color, speed = 1, distort = 0.3 }: { 
  position: [number, number, number]; 
  color: string;
  speed?: number;
  distort?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const AnimatedBox = ({ position, color }: { 
  position: [number, number, number]; 
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Box ref={meshRef} args={[1.2, 1.2, 1.2]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </Box>
    </Float>
  );
};

const AnimatedTorus = ({ position, color }: { 
  position: [number, number, number]; 
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1}>
      <Torus ref={meshRef} args={[0.8, 0.3, 32, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Torus>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#60a5fa" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#93c5fd" />
      
      <AnimatedSphere position={[-4, 2, -2]} color="#3b82f6" distort={0.4} />
      <AnimatedSphere position={[4, -1.5, -3]} color="#60a5fa" speed={0.7} distort={0.3} />
      <AnimatedBox position={[3, 2.5, -4]} color="#2563eb" />
      <AnimatedTorus position={[-3.5, -2, -2]} color="#1d4ed8" />
      <AnimatedSphere position={[0, 3, -5]} color="#93c5fd" speed={0.5} distort={0.2} />
    </>
  );
};

export const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};
