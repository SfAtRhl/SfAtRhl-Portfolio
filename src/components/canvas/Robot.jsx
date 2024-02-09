import React, { Suspense, lazy, useMemo } from "react";
import { OrbitControls, BakeShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Scene = lazy(() => import("./Scene"));

const RobotCanvas = () => {
  const isTablet = useMemo(
    () => window.innerWidth < 960 && window.innerWidth > 414,
    []
  );

  return (
    <Canvas
      camera={{
        fov: isTablet ? 100 : 70,
        near: 0.1,
        far: 200,
        position: [2, 3, 6],
      }}
      shadows
    >
      <Suspense fallback={null}>
        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight />
        <directionalLight
          position={[-5, 5, 5]}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <BakeShadows />
        <group position={[0, -1, 0]}>
          <Scene />
        </group>
        <mesh
          rotation={[-0.5 * Math.PI, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
        >
          <planeBufferGeometry args={[10, 10, 1, 1]} />
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
      </Suspense>
    </Canvas>
  );
};

export default RobotCanvas;
