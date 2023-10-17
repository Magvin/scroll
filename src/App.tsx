import "./App.css";
import GLBPlayer from "./components/Player/GLBPlayer";
import { Canvas } from "@react-three/fiber";
import { useContext, useReducer, useRef } from "react";
import { getProject } from "@theatre/core";
import { ScrollControls } from "@react-three/drei";
import flyThrougState from "./weirdmovemnts.json";
import { EffectComposer } from "@react-three/postprocessing";
// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject("Demo Project", {
  state: flyThrougState,
}).sheet("Demo Sheet");

import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { SheetProvider } from "@theatre/r3f";
import {
  reducers,
  InitialState,
  EcommerceContext,
} from "./components/Provider/Provider";
import Modal from "./components/Modal/Modal";

// studio.initialize();
// studio.extend(extension);
function App() {
  const [globalState, dispatch] = useReducer(reducers, InitialState);

  const canvasRef = useRef();
  const { windowOpen } = globalState;
  return (
    <EcommerceContext.Provider value={{ globalState, dispatch }}>
      {windowOpen && <Modal open={windowOpen} />}
      <Canvas
        shadows
        dpr={[1, 2]}
        ref={canvasRef}
        id="mainScene"
        gl={{
          preserveDrawingBuffer: true,
        }}
      >
        <ScrollControls pages={10}>
          <SheetProvider sheet={demoSheet}>
            <GLBPlayer />
          </SheetProvider>
        </ScrollControls>
      </Canvas>
    </EcommerceContext.Provider>
  );
}

export default App;
