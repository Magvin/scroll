import {
  useProgress,
  Html,
  useGLTF,
  useScroll,
  useCamera,
} from "@react-three/drei";
import { Suspense } from "react";
import Lights from "../Character/Lights";
import { PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";
import { TextureLoader } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { val } from "@theatre/core";
import Map from "../Character/Map";

import { WebGLExtensions } from "three/src/renderers/webgl/WebGLExtensions";
// @ts-ignore
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import CharacterModel from "../Character/CharacterSpookyModel";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed()} % loaded</Html>;
}

const KTX_CDN = "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/";

let ktx2loader: KTX2Loader | undefined;

// it's inconvenient to have to produce a gl object to check for ktx2 support, especially when it comes to the cache keys
// solution is to create a skeleton object that provides the minimum requirements to check for ktx support, defined below
// https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/KTX2Loader.js#L113-L135
type PotentialCanvas = WebGLRenderingContext | WebGL2RenderingContext | null;
type KTXSupportCheck = {
  capabilities: { isWebGL2: boolean };
  extensions: WebGLExtensions;
};

const setupKtx2 = () => {
  if (ktx2loader) return;

  ktx2loader = new KTX2Loader();
  ktx2loader.setTranscoderPath(KTX_CDN);

  let supportsWebgl2: boolean;
  const el = document.createElement("canvas");
  let gl: PotentialCanvas = el.getContext("webgl2");
  if (gl) {
    supportsWebgl2 = true;
  } else {
    gl = el.getContext("webgl");
    supportsWebgl2 = false;
  }
  if (!gl) {
    throw new Error("No WebGL support");
  }
  el.remove();
  const minimumGL: KTXSupportCheck = {
    extensions: new WebGLExtensions(gl),
    capabilities: { isWebGL2: supportsWebgl2 },
  };

  // @ts-ignore
  ktx2loader.detectSupport(minimumGL);
};

// our callback will run on every animation frame

function GLBPlayer() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 0]} intensity={1.5} />

        <Lights />
        <Map />
        <CharacterModel />
        <PerspectiveCamera
          theatreKey="Camera"
          makeDefault
          position={[-1, 1.7, -2]}
          rotation={[0, 3, 0]}
          fov={90}
          near={0.1}
          far={70}
        />
      </Suspense>
    </>
  );
}
useGLTF.preload("/PENTHOUSE_Quartz-v1-v3.glb", true, false, (loader) => {
  setupKtx2();
  loader.setKTX2Loader(ktx2loader!);
});

export default GLBPlayer;
