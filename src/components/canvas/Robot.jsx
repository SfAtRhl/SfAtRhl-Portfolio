import React, { Suspense, lazy } from "react";
import { OrbitControls, BakeShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Scene = lazy(() => import("./Scene"));

const RobotCanvas = () => {
  return (
    <Canvas
      camera={{
        fov: 50,
        near: 0.1,
        far: 200,
        position: [2, 2.2, 7.6],
      }}
      shadows
      dpr={[1, 2]}
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          target={[0, 0.55, 0]}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          rotateSpeed={0.8}
        />
        <ambientLight intensity={0.75} />
        <directionalLight
          position={[-5, 7, 5]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[4, 2, -3]} intensity={0.35} />
        <BakeShadows />

        {/* Scaled and centered model */}
        <group position={[0, -1.0, 0]} scale={0.72}>
          <Scene />
        </group>

        {/* Ground shadow plane */}
        <mesh
          rotation={[-0.5 * Math.PI, 0, 0]}
          position={[0, -1.0, 0]}
          receiveShadow
        >
          <planeGeometry args={[12, 12]} />
          <shadowMaterial transparent opacity={0.22} />
        </mesh>
      </Suspense>
    </Canvas>
  );
};

export default RobotCanvas;
