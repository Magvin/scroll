import { useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import {
  Environment,
  KeyboardControls,
  useProgress,
  Html,
  PointerLockControls,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import Lights from "../Character/Lights";
import Map from "../Character/Map";
import CharacterModel from "../Character/CharacterModel";
import Ecctrl from "../Ecctrl/Ecctrl";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
// creates a centralized joystick
function GLBPlayer({ dom }: any) {
  const canvasRef = useRef();
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
      <Suspense fallback={<Loader />}>
        <Environment background files="/clouds.hdr" />
        <Lights />
        <Physics timeStep="vary">
          <KeyboardControls map={keyboardMap}>
            <Ecctrl>
              <CharacterModel userData={{ camExcludeCollision: true }} />
            </Ecctrl>
          </KeyboardControls>
          <Map />
        </Physics>
        <PointerLockControls />
      </Suspense>
    </>
  );
}

export default GLBPlayer;
