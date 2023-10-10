import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import {
  Environment,
  KeyboardControls,
  useProgress,
  Html,
} from "@react-three/drei";
import { Suspense } from "react";
import Lights from "../Character/Lights";
import Map from "../Character/Map";
import CharacterModel from "../Character/CharacterModel";
import Ecctrl from "../Ecctrl/Ecctrl";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function GLBPlayer() {
  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  return (
    <Canvas
      shadows
      onPointerDown={(e: any) => {
        if (e.target.requestPointerLock) {
          e.target.requestPointerLock();
        }
      }}
    >
      <Environment background files="/clouds.hdr" />
      <Lights />
      <Suspense fallback={<Loader />}>
        <Physics timeStep="vary">
          <KeyboardControls map={keyboardMap}>
            <Ecctrl animated={true}>
              <CharacterModel userData={{ camExcludeCollision: true }} />
            </Ecctrl>
          </KeyboardControls>
          <Map />
        </Physics>
      </Suspense>
    </Canvas>
  );
}

export default GLBPlayer;
