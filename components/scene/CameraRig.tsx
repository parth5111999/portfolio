'use client';

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type * as THREE from "three";

export function CameraRig({ scroll }: { scroll: number }) {
  const { camera, pointer, viewport } = useThree();
  const scrollRef = useRef(scroll);
  const tiltRef = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const targetScroll = scroll;
    scrollRef.current += (targetScroll - scrollRef.current) * 0.08;

    const minZ = 6;
    const maxZ = -18;
    const z = minZ + (maxZ - minZ) * scrollRef.current;

    const tiltStrength = 0.15;
    const targetTiltX = pointer.y * tiltStrength;
    const targetTiltY = -pointer.x * tiltStrength;
    tiltRef.current.x += (targetTiltX - tiltRef.current.x) * 0.08;
    tiltRef.current.y += (targetTiltY - tiltRef.current.y) * 0.08;

    camera.position.set(
      tiltRef.current.y * viewport.width * 0.15,
      tiltRef.current.x * viewport.height * 0.15,
      z
    );
    camera.lookAt(0, 0, -8);
  });

  return null;
}

