import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useCharacterAnimations } from "../context/CharacterAnimations";

const Scene = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./robot/scene.glb");
  const { setAnimations, animationIndex } = useCharacterAnimations();
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (names && names.length > 0) {
      setAnimations(names);
    }
  }, [names, setAnimations]);

  useEffect(() => {
    const actionName = names && names[animationIndex];
    if (actions && actionName && actions[actionName]) {
      actions[actionName].reset().fadeIn(0.35).play();
    }
    return () => {
      if (actions && actionName && actions[actionName]) {
        actions[actionName].fadeOut(0.35);
      }
    };
  }, [animationIndex, actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="RobotArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Bone} />
          </group>
          <group
            name="HandR"
            position={[-0.003, 2.37, -0.021]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="HandR_1"
              geometry={nodes.HandR_1.geometry}
              material={materials.Main}
              skeleton={nodes.HandR_1.skeleton}
            />
            <skinnedMesh
              name="HandR_2"
              geometry={nodes.HandR_2.geometry}
              material={materials.Grey}
              skeleton={nodes.HandR_2.skeleton}
            />
          </group>
          <group
            name="HandL"
            position={[-0.003, 2.37, -0.021]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="HandL_1"
              geometry={nodes.HandL_1.geometry}
              material={materials.Main}
              skeleton={nodes.HandL_1.skeleton}
            />
            <skinnedMesh
              name="HandL_2"
              geometry={nodes.HandL_2.geometry}
              material={materials.Grey}
              skeleton={nodes.HandL_2.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default Scene;
useGLTF.preload("./robot/scene.glb");
