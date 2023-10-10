/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Noby Grand (https://sketchfab.com/NobyGrand)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/ghost-w-tophat-6b1217e3462440519a2d0e3e75bf16d3
Title: Ghost w/ Tophat
*/

import { useGLTF } from "@react-three/drei";

export default function CharacterModel(props: any) {
  const { nodes, materials } = useGLTF("/ghost.glb") as any;

  return (
    <group {...props}>
      <group scale={0.0034} position={[0, 0, 0]}>
        <group
          position={[0, 20.777, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Eyes_Eyes_0.geometry}
            material={materials.Eyes}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Eyes_Ghost_White_0.geometry}
            material={materials.Ghost_White}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_Ghost_White_0.geometry}
          material={materials.Ghost_White}
          position={[0, 20.777, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hat_Hat_Black_0.geometry}
          material={materials.Hat_Black}
          position={[0, 179.13, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rim_Rim_Red_0.geometry}
          material={materials.Rim_Red}
          position={[0, 115.411, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/ghost.glb");