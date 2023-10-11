import { Physics } from "@react-three/rapier";
import {
  Environment,
  KeyboardControls,
  useProgress,
  Html,
  PointerLockControls,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import Lights from "../Character/Lights";
import Map from "../Character/Map";
import CharacterSpookyModel from "../Character/CharacterSpookyModel";
import CharacterDemonModel from "../Character/CharacterDemonModel";
import Ecctrl from "../Ecctrl/Ecctrl";
import { EcctrlAnimation } from "../Ecctrl/EcctrlAnimation";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
/**
 * Character animation set preset
 */
const animationSet = {
  idle: "CharacterArmature|Idle",
  walk: "CharacterArmature|Walk",
  run: "CharacterArmature|Run",
  jump: "CharacterArmature|Jump",
  jumpIdle: "CharacterArmature|Jump_Idle",
  jumpLand: "CharacterArmature|Jump_Land",
  fall: "CharacterArmature|Duck", // This is for falling from high sky
  action1: "CharacterArmature|Wave",
  action2: "CharacterArmature|Death",
  action3: "CharacterArmature|HitReact",
  action4: "CharacterArmature|Punch",
};
// creates a centralized joystick
function GLBPlayer({ character }) {
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
            <Ecctrl animated>
              <EcctrlAnimation
                characterURL={"/demon.glb"}
                animationSet={animationSet}
              >
                {character === "spooky" ? (
                  <CharacterSpookyModel
                    userData={{ camExcludeCollision: true }}
                  />
                ) : (
                  <CharacterDemonModel
                    userData={{ camExcludeCollision: true }}
                  />
                )}
              </EcctrlAnimation>
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
