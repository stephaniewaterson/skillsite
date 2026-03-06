import "./App.scss";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect, useLayoutEffect } from "react";
import { useErrorBoundary } from "use-error-boundary";
import "./styles/partials/_typography.css";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useThree } from "@react-three/fiber";

import {
  ContactShadows,
  MeshTransmissionMaterial,
  ScrollControls,
  Scroll,
  useScroll,
} from "@react-three/drei";
import { Mac } from "./models/Mac-draco";
import { easing } from "maath";
import { useStore } from "../src/components/Store/Store";
import { Overlay } from "./components/Overlay/Overlay";
import { SkillsSection } from "./components/Interface/Interface";
import { Items } from "./components/Projects/Projects";
import { SpaceMan } from "./models/Outhere_space_buddy";
import { Html, useProgress } from "@react-three/drei";
import gsap from "gsap";

extend({ Overlay });
extend({ TextGeometry });

const navStyles = {
  position: "fixed",
  bottom: "2rem",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "1rem",
  zIndex: 99999,
  pointerEvents: "all",
};

const navBtnStyles = {
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.3)",
  color: "#fff",
  padding: "0.55rem 1.4rem",
  borderRadius: "999px",
  fontSize: "0.85rem",
  letterSpacing: "0.08em",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  transition: "background 0.2s, transform 0.15s",
  fontFamily: "inherit",
};

function ScrollJumper({ targetRef, onDone }) {
  const scroll = useScroll();
  const { size, camera } = useThree();
  const destRef = useRef(null);

  if (targetRef.current !== null) {
    destRef.current = targetRef.current * pixelsPerUnit;
    console.log(
      "jumping to worldX:",
      targetRef.current,
      "dest px:",
      destRef.current,
      "totalWidth:",
      el.scrollWidth - el.clientWidth,
      "pixelsPerUnit:",
      pixelsPerUnit
    );
    targetRef.current = null;
  }

  useFrame(() => {
    const el = scroll.el;
    if (!el) return;

    const camZ = camera.position.z;
    if (!camZ) return;

    const vFov = (camera.fov * Math.PI) / 180;
    const worldHeight = 2 * Math.tan(vFov / 2) * camZ;
    const worldWidth = worldHeight * (size.width / size.height);
    const pixelsPerUnit = size.width / worldWidth;

    if (targetRef.current !== null) {
      destRef.current = targetRef.current * pixelsPerUnit;
      targetRef.current = null;
    }

    if (destRef.current !== null) {
      el.scrollLeft += (destRef.current - el.scrollLeft) * 0.08;
      if (Math.abs(destRef.current - el.scrollLeft) < 1) {
        el.scrollLeft = destRef.current;
        destRef.current = null;
        onDone();
      }
    }
  });

  return null;
}

const isMobile = window.innerWidth <= 767;
const isTablet = window.innerWidth <= 1217;

const layout = isMobile
  ? {
      projectsX: 25,
      projectsJump: 14,
      skillsX: 32,
      skillsJump: 32,
      projectsY: 6,
      skillsY: 8,
      showSpaceMan: false,
    }
  : isTablet
  ? {
      projectsX: 25,
      projectsJump: 14,
      skillsX: 44,
      skillsJump: 38,
      projectsY: 12,
      skillsY: 10,
      showSpaceMan: false,
    }
  : {
      projectsX: 35,
      projectsJump: 20,
      skillsX: 80,
      skillsJump: 40,
      projectsY: 12,
      skillsY: 10,
      showSpaceMan: true,
    };
const projectsX = layout.projectsX;
const skillsX = layout.skillsX;

const projectsJumpX = layout.projectsJump;
const skillsJumpX = layout.skillsJump;

function App({ children }) {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  const [open, setOpen] = useState(false);
  const [hoveredState, setHoveredState] = useState(false);
  const scrollTargetRef = useRef(null);

  const mainRef = useRef();
  const titleRef = useRef();

  const [scrollReady, setScrollReady] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setScrollReady(true), 300);
      return () => clearTimeout(timer);
    } else {
      setScrollReady(false);
    }
  }, [open]);

  function ResponsiveItems() {
    return (
      <group
        position={[layout.projectsX, layout.projectsY, 0]}
        className="items"
      >
        <Items />
      </group>
    );
  }
  const laptopScalingFactor = Math.min(
    Math.max(window.innerWidth / 1100, 0.8),
    1
  );

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

  function LoaderOverlay() {
    const { progress } = useProgress();
    if (progress === 100) return null;
    return (
      <div
        style={{
          background: "#1b1e22",
          color: "white",
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          fontFamily: "'Dela Gothic One', sans-serif",
        }}
      >
        <h2
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}
        >
          Loading...
        </h2>
        <div
          style={{
            width: "200px",
            height: "4px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #e8453c, #ff8a65)",
              borderRadius: "99px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <p
          style={{
            marginTop: "0.75rem",
            color: "#888",
            fontSize: "0.85rem",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {Math.floor(progress)}%
        </p>
      </div>
    );
  }

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
        store.openOverlay ? 0.5 : 0.01,
        store.openOverlay ? 0.05 : 0.2,
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
            background="white"
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
      className={open ? "open" : "closed"}
      style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
    >
      <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <h1
          ref={titleRef}
          style={{
            position: "absolute",
            top: "15rem",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#000",
          }}
        >
          Click to open
        </h1>

        <LoaderOverlay />

        {open && scrollReady && (
          <nav style={navStyles}>
            {[
              { label: "Projects", worldX: projectsJumpX },
              { label: "Skills", worldX: skillsJumpX },
            ].map(({ label, worldX }) => (
              <button
                key={label}
                style={navBtnStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => {
                  scrollTargetRef.current = worldX;
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        )}

        <ErrorBoundary>
          {didCatch ? (
            <div style={{ color: "white", padding: 20 }}>
              <pre>{String(error?.stack || error)}</pre>
            </div>
          ) : (
            <Canvas
              className="flex justify-center items-center h-screen w-screen"
              camera={{ position: [0, -1.5, 12.5] }}
              dpr={[1, 3]}
              gl={{ antialias: false }}
            >
              <ScrollControls
                horizontal
                damping={0}
                pages={open ? (isMobile ? 4 : 4.25) : 1}
                prepend={true}
                distance={0.5}
              >
                {scrollReady && (
                  <ScrollJumper targetRef={scrollTargetRef} onDone={() => {}} />
                )}

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
                  <Suspense>
                    {/* Laptop */}
                    <group
                      rotation={[0, 0, 0]}
                      onClick={(e) => (e.stopPropagation(), setOpen(!open))}
                      position={[0, 0.5, 0]}
                      scale={laptopScalingFactor}
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
                          className="overlay"
                        />
                      )}
                    </group>

                    {/* Skills */}
                    <group position={[layout.skillsX, layout.skillsY, 0]}>
                      <SkillsSection />
                      {layout.showSpaceMan && open && (
                        <SpaceMan position={[-13, -16, 0]} scale={6} />
                      )}
                    </group>
                    {/* Projects — responsive */}
                    <ResponsiveItems />
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
          )}
        </ErrorBoundary>
      </div>
    </main>
  );
}

export default App;
