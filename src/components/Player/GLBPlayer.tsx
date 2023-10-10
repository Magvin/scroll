import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import {
  Environment,
  KeyboardControls,
  useProgress,
  Html,
  PointerLockControls,
} from "@react-three/drei";
import { Suspense, useState } from "react";
import Lights from "../Character/Lights";
import Map from "../Character/Map";
import CharacterModel from "../Character/CharacterModel";
import Ecctrl from "../Ecctrl/Ecctrl";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
// creates a centralized joystick
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
    <>
      <Canvas shadows dpr={[1, 2]}>
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

          <PointerLockControls />
        </Suspense>
      </Canvas>
      {/* <Joystick
        size={100}
        sticky={true}
        baseColor="red"
        stickColor="blue"
        
        move={(move) => setMovementsDirection(move.direction)}
        stop={() => setMovementsDirection(null)}
      /> */}
    </>
  );
}

export default GLBPlayer;
