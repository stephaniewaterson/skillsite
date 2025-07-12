import { Html } from "@react-three/drei";
import "./Projects.css";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useIntersect, Image, ScrollControls, Scroll } from "@react-three/drei";

function Item({ url, scale, ...props }) {
  const visible = useRef(false);
  const [hovered, hover] = useState(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );
    ref.current.material.zoom = THREE.MathUtils.damp(
      ref.current.material.zoom,
      visible.current ? 1 : 1.5,
      4,
      delta
    );
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
  function AddLink() {
    window.location.replace("https://locallingo.netlify.app/");
    console.log("hello");
  }

  const { width: w, height: h } = useThree((state) => state.viewport);
  return (
    <Scroll>
      <Item
        url="/images/2.png"
        scale={[w / 2.5, w / 3.5, 2]}
        position={[-w / 4, -h * 0.5, 0]}
        onClick={(e) => {
          window.open("https://locallingo.netlify.app/");
        }}
      />

      <Item
        url="/images/4.png"
        scale={[w / 2.5, w / 3.5, 1]}
        position={[w / 4, -h * 0.5, 0]}
        onClick={(e) => {
          window.open("https://spaceflight.netlify.app/");
        }}
      />
    </Scroll>
  );
}
