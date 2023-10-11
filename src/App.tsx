import "./App.css";
import GLBPlayer from "./components/Player/GLBPlayer";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
function App() {
  const canvasRef = useRef();
  return (
    <Canvas shadows dpr={[1, 2]} ref={canvasRef} id="mainScene">
      <GLBPlayer dom={canvasRef} />
    </Canvas>
  );
}

export default App;
