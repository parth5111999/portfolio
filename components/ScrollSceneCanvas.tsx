'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type * as THREE from "three";

function useSmoothScrollProgress(smoothing = 0.08) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let target = 0;
    let animationFrame: number | null = null;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      target = maxScroll > 0 ? scrollTop / maxScroll : 0;

      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      setProgress((prev) => {
        const next = prev + (target - prev) * smoothing;
        const isSettled = Math.abs(next - target) < 0.0001;

        if (!isSettled) {
          animationFrame = window.requestAnimationFrame(tick);
        } else {
          animationFrame = null;
        }

        return isSettled ? target : next;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [smoothing]);

  return progress;
}

type FloatingPoint = {
  position: [number, number, number];
  floatSpeed: number;
  rotationSpeed: number;
  scale: number;
};

function FloatingObjects() {
  const points = useMemo<FloatingPoint[]>(() => {
    const items: FloatingPoint[] = [];
    const count = 24;

    for (let i = 0; i < count; i += 1) {
      items.push({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          -i * 0.8 - 2
        ],
        floatSpeed: 0.5 + Math.random() * 0.8,
        rotationSpeed: 0.2 + Math.random() * 0.6,
        scale: 0.3 + Math.random() * 0.8
      });
    }

    return items;
  }, []);

  return (
    <>
      {points.map((p, index) => (
        <FloatingObject key={index} point={p} />
      ))}
    </>
  );
}

function FloatingObject({ point }: { point: FloatingPoint }) {
  const ref = useRef<THREE.Mesh | null>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    ref.current.position.set(
      point.position[0],
      point.position[1] + Math.sin(t * point.floatSpeed + point.position[0]) * 0.3,
      point.position[2]
    );

    ref.current.rotation.x = t * point.rotationSpeed;
    ref.current.rotation.y = t * point.rotationSpeed * 1.2;
  });

  return (
    <mesh ref={ref} scale={point.scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#38bdf8"
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

function ScrollCamera({ scroll }: { scroll: number }) {
  const { camera } = useThree();
  const scrollRef = useRef(scroll);

  useFrame(() => {
    const target = scroll;
    scrollRef.current += (target - scrollRef.current) * 0.08;

    const baseZ = 4;
    const maxForward = 8;
    camera.position.z = baseZ - scrollRef.current * maxForward;
    camera.position.y = scrollRef.current * 0.5;
    camera.lookAt(0, 0, -4);
  });

  return null;
}

export function ScrollSceneCanvas() {
  const scrollProgress = useSmoothScrollProgress(0.08);

  return (
    <div className="pointer-events-none fixed inset-0">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 55 }}
        className="h-full w-full"
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 4, 14]} />

        <ambientLight intensity={0.3} />
        <hemisphereLight
          intensity={0.7}
          color="#e0f2fe"
          groundColor="#020617"
        />
        <directionalLight
          position={[4, 6, 2]}
          intensity={1}
          castShadow={false}
        />

        <FloatingObjects />
        <ScrollCamera scroll={scrollProgress} />
      </Canvas>
    </div>
  );
}
