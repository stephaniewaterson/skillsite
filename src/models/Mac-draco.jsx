import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

export function Mac({ open, ...props }) {
  const { nodes, materials } = useGLTF("/mac-draco.glb");
  const group = useRef();
  const hingeGroup = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      open ? Math.cos(t / 10) / 10 + 0.35 : 0,
      0.1
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      open ? Math.sin(t / 10) / 4 : 0,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      open ? Math.sin(t / 10) / 10 : 0,
      0.1
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      open ? (-2 + Math.sin(t)) / 3 : -4.3,
      0.1
    );
  });

  useEffect(() => {
    if (!hingeGroup.current) return;
    gsap.to(hingeGroup.current.rotation, {
      x: open ? 0 : 1.57,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [open]);

  useEffect(() => {
    if (open && group.current) {
      group.current.rotation.y = group.current.rotation.y - Math.PI;
    }
  }, [open]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group ref={hingeGroup} rotation-x={0} position={[0, -0.04, 0.491]}>
        <group position={[0.002, -0.038, 0.414]} rotation={[0.014, 0, 0]}>
          <group position={[0, 2.965, -0.63]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Cube008.geometry}
              material={materials.aluminium}
            />
            <mesh
              geometry={nodes.Cube008_1.geometry}
              material={materials["matte.001"]}
            />
            <mesh
              geometry={nodes.Cube008_2.geometry}
              material={materials["screen.001"]}
            />
          </group>
        </group>
      </group>
      <mesh
        geometry={nodes.keyboard.geometry}
        material={materials.keys}
        position={[1.793, 0, 3.451]}
      />
      <group position={[0, -0.1, 3.394]}>
        <mesh
          geometry={nodes.Cube002.geometry}
          material={materials.aluminium}
        />
        <mesh
          geometry={nodes.Cube002_1.geometry}
          material={materials.trackpad}
        />
      </group>
      <mesh
        geometry={nodes.touchbar.geometry}
        material={materials.touchbar}
        position={[0, -0.027, 1.201]}
      />
    </group>
  );
}

useGLTF.preload("/mac-draco.glb");
