import "./App.css";
import GLBPlayer from "./components/Player/GLBPlayer";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
function App() {
  const canvasRef = useRef();
  const [selected, setSelected] = useState<string>();
  return (
    <>
      {!selected && (
        <div className="buttonContainer">
          <p>Select your character</p>
          <button onClick={() => setSelected("demon")}>Demon</button>
          <button onClick={() => setSelected("spooky")}>Spooky</button>
        </div>
      )}
      <Canvas shadows dpr={[1, 2]} ref={canvasRef} id="mainScene">
        {selected && <GLBPlayer character={selected} />}
      </Canvas>
    </>
  );
}

export default App;
