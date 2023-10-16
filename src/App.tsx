import "./App.css";
import GLBPlayer from "./components/Player/GLBPlayer";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { getProject } from "@theatre/core";
import { ScrollControls } from "@react-three/drei";
import flyThrougState from "./weirdmovemnts.json";
// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject("Demo Project", {
  state: flyThrougState,
}).sheet("Demo Sheet");

import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { SheetProvider } from "@theatre/r3f";

// studio.initialize();
// studio.extend(extension);
function App() {
  const canvasRef = useRef();
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        ref={canvasRef}
        id="mainScene"
        gl={{
          preserveDrawingBuffer: true,
        }}
      >
        <ScrollControls pages={5}>
          <SheetProvider sheet={demoSheet}>
            <GLBPlayer />
          </SheetProvider>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
