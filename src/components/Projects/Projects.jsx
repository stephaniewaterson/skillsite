// import { Html } from "@react-three/drei";
// import "./Projects.css";
// import * as THREE from "three";
// import { useRef, useState, useEffect } from "react";
// import { useFrame, useThree } from "@react-three/fiber";
// import { useIntersect, Image, ScrollControls, Scroll } from "@react-three/drei";

// function Item({ url, scale, ...props }) {
//   const visible = useRef(false);
//   const [hovered, hover] = useState(false);
//   const ref = useIntersect((isVisible) => (visible.current = isVisible));
//   const { height } = useThree((state) => state.viewport);

//   useFrame((state, delta) => {
//     ref.current.position.y = THREE.MathUtils.damp(
//       ref.current.position.y,
//       visible.current ? 0 : -height / 2 + 1,
//       4,
//       delta
//     );
//     ref.current.material.zoom = THREE.MathUtils.damp(
//       ref.current.material.zoom,
//       visible.current ? 1 : 1.5,
//       4,
//       delta
//     );
//     ref.current.material.grayscale = THREE.MathUtils.damp(
//       ref.current.material.grayscale,
//       hovered ? 1 : 0,
//       4,
//       delta
//     );
//   });
//   return (
//     <group {...props}>
//       <Image
//         ref={ref}
//         onPointerOver={() => hover(true)}
//         onPointerOut={() => hover(false)}
//         scale={scale}
//         url={url}
//       />
//     </group>
//   );
// }

// export function Items() {
//   function AddLink() {
//     window.location.replace("https://locallingo.netlify.app/");
//   }

//   const { width: w, height: h } = useThree((state) => state.viewport);
//   return (
//     <Scroll>
//       <Item
//         url="/images/2.png"
//         scale={[w / 2.5, w / 3.5, 2]}
//         position={[-w / 4, -h * 0.5, 0]}
//         onClick={(e) => {
//           window.open("https://locallingo.netlify.app/");
//         }}
//       />

//       <Item
//         url="/images/4.png"
//         scale={[w / 2.5, w / 3.5, 1]}
//         position={[w / 4, -h * 0.5, 0]}
//         onClick={(e) => {
//           window.open("https://spaceflight.netlify.app/");
//         }}
//       />
//     </Scroll>
//   );
// }

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useIntersect, Image, Scroll } from "@react-three/drei";
import * as THREE from "three";

// Helper hook to pick values per screen size
function useResponsiveValue(mobile, tablet, desktop) {
  const { size } = useThree();
  if (size.width <= 767) return mobile; // mobile
  if (size.width <= 1280) return tablet; // tablet
  return desktop; // desktop
}

function Item({ url, scale, ...props }) {
  const visible = useRef(false);
  const [hovered, hover] = useState(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { height } = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Animate Y position in/out of view
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );

    // Zoom effect when visible
    ref.current.material.zoom = THREE.MathUtils.damp(
      ref.current.material.zoom,
      visible.current ? 1 : 1.5,
      4,
      delta
    );

    // Grayscale on hover
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      hovered ? 1 : 0,
      4,
      delta
    );
  });

  return (
    <group {...props}>
      <Image
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={scale}
        url={url}
      />
    </group>
  );
}

export function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport);

  // Responsive scales
  const itemScale = useResponsiveValue(
    [w / 1.2, w / 2, 2], // mobile
    [w / 2, w / 3, 2], // tablet
    [w / 2.5, w / 3.5, 2] // desktop
  );

  return (
    <Scroll>
      <Item
        url="/images/2.png"
        scale={itemScale}
        position={useResponsiveValue(
          [10, -h * 0.4, 0], // mobile
          [-w / 8, -h * 0.45, 0], // tablet
          [-w / 4, -h * 0.5, 0] // desktop
        )}
        onClick={() => window.open("https://locallingo.netlify.app/")}
      />

      <Item
        url="/images/4.png"
        scale={itemScale}
        position={useResponsiveValue(
          [10, -h * 0.1, 0], // mobile
          [w / 2, -h * 0.45, 0], // tablet
          [w / 4, -h * 0.5, 0] // desktop
        )}
        onClick={() => window.open("https://spaceflight.netlify.app/")}
      />
    </Scroll>
  );
}
