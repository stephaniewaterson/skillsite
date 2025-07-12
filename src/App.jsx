import "./App.css";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect, useLayoutEffect } from "react";
import { useErrorBoundary } from "use-error-boundary";
import "./styles/partials/_typography.css";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import {
  ContactShadows,
  MeshTransmissionMaterial,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import { Mac } from "../public/Mac-draco";
import { easing } from "maath";
import { useStore } from "../src/components/Store/Store";
import { Overlay } from "./components/Overlay/Overlay";
import { SkillsSection } from "./components/Interface/Interface";
import { Items } from "./components/Projects/Projects";
import { SpaceMan } from "../public/Outhere_space_buddy";
import { Html } from "@react-three/drei";
import gsap from "gsap";

extend({ Overlay });
extend({ TextGeometry });

function App({ children }) {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  const [open, setOpen] = useState(false);
  const [hoveredState, setHoveredState] = useState(false);

  const mainRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    if (!mainRef.current || !titleRef.current) return;

    gsap.to(mainRef.current, {
      backgroundColor: open ? "#1b1e22" : "#f0f0f0",
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(titleRef.current, {
      opacity: open ? 0 : 1,
      y: open ? 50 : 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [open]);

  const hingeRotation = open ? 1.575 : -0.425;

  function Selector({ children }) {
    const ref = useRef();
    const store = useStore();

    useFrame(({ viewport, camera, pointer }, delta) => {
      const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 3]);
      easing.damp3(
        ref.current.position,
        [(pointer.x * width) / 2, (pointer.y * height) / 5, 5],
        store.openOverlay ? 0 : 0.1,
        delta
      );
      easing.damp3(
        ref.current.scale,
        store.openOverlay ? 4 : 0.01,
        store.openOverlay ? 0.5 : 0.2,
        delta
      );
      easing.dampC(
        ref.current.material.color,
        store.openOverlay ? "#f0f0f0" : "#ccc",
        0.1,
        delta
      );
    });
    return (
      <>
        <mesh ref={ref}>
          <circleGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            samples={16}
            resolution={512}
            anisotropicBlur={0.1}
            thickness={0.1}
            roughness={0.4}
            toneMapped={true}
          />
        </mesh>
        <group
          onPointerOver={() => (store.openOverlay = true)}
          onPointerOut={() => (store.openOverlay = false)}
          onPointerDown={() => (store.openOverlay = true)}
          onPointerUp={() => (store.openOverlay = false)}
        >
          {children}
        </group>
      </>
    );
  }

  return (
    <main
      ref={mainRef}
      style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
    >
      <div
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <h1
          ref={titleRef}
          style={{
            position: "absolute",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#000",
          }}
        >
          Click to open
        </h1>

        <ErrorBoundary>
          <Canvas
            className="flex justify-center items-center h-screen w-screen"
            camera={{ position: [0, -1.5, 12.5] }}
            dpr={[1, 3]}
            gl={{ antialias: false }}
          >
            <ScrollControls
              horizontal
              damping={0.9}
              pages={3.2}
              // max
              // speed={0.2}
              prepend={true}
              distance={0.5}
            >
              <ambientLight />

              <ContactShadows
                resolution={512}
                position={[0, -0.8, 0]}
                opacity={1}
                scale={10}
                blur={2}
                far={0.8}
              />
              <Scroll>
                <Suspense fallback={null}>
                  <group
                    rotation={[0, 0, 0]}
                    onClick={(e) => (e.stopPropagation(), setOpen(!open))}
                    position={[0, 0.5, 0]}
                  >
                    <Selector>
                      <Mac
                        rotation={[1.65, Math.PI, 1]}
                        open={open}
                        hinge={hingeRotation}
                        onPointerEnter={() => setHoveredState(true)}
                      />
                    </Selector>
                    {open && (
                      <Html position={[0, 7, 0]}>
                        <h1 style={{ color: "white" }}>Stephanie Waterson</h1>
                      </Html>
                    )}
                    {hoveredState && open && (
                      <Overlay
                        style={{
                          position: "absolute",
                          top: "60vh",
                          left: "0.5em",
                        }}
                      />
                    )}
                  </group>
                  <group position={[65, 10, 0]}>
                    <SkillsSection />

                    {open && <SpaceMan position={[-15, -15, 2]} scale={6} />}
                  </group>
                  <group position={[45, 12, 0]} className="items">
                    <Items />
                  </group>
                  <Html className="Item__title" position={[32, -5, 0]}>
                    Projects
                  </Html>
                  {/* <Html className="Item__title" position={[98, -3, 0]}>
                      Space model and flight game
                    </Html> */}
                </Suspense>
              </Scroll>

              <directionalLight
                position={[0, 5, -2]}
                scale={[3, 3, 3]}
                intensity={Math.PI}
                color="#FFFFFF"
              />
              <directionalLight
                position={[2, 2, 2]}
                scale={[3, 3, 3]}
                intensity={Math.PI}
                color="#FFFFFF"
              />

              <ContactShadows
                position={[0, -4.5, 0]}
                opacity={0.4}
                scale={20}
                blur={1.75}
                far={4.5}
              />
            </ScrollControls>
          </Canvas>
        </ErrorBoundary>
      </div>
    </main>
  );
}

export default App;
