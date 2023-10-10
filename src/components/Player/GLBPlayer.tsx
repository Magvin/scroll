import { Canvas, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import {
  Environment,
  KeyboardControls,
  useProgress,
  Html,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import Lights from "../Character/Lights";
import Map from "../Character/Map";
import CharacterModel from "../Character/CharacterModel";
import Ecctrl from "../Ecctrl/Ecctrl";
import { PointerLockControls } from "../utils/CustomePointerLock";
import { Group } from "three";

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

  const camera = useThree().camera;
  const PointerLock = new PointerLockControls(camera, dom.current);

  PointerLock.connect();

  dom.current.addEventListener("click", (e) => PointerLock.lock());

  return (
    <>
      <Environment background files="/clouds.hdr" />
      <Lights />
      <Suspense fallback={<Loader />}>
        <Physics timeStep="vary">
          <KeyboardControls map={keyboardMap}>
            <Ecctrl>
              <CharacterModel userData={{ camExcludeCollision: true }} />
            </Ecctrl>
          </KeyboardControls>
          <Map />
        </Physics>
      </Suspense>
    </>
  );
}

export default GLBPlayer;
