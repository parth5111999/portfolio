'use client';

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

type FloatingSphere = {
  position: [number, number, number];
  radius: number;
  floatSpeed: number;
};

export function SceneZones({ scroll }: { scroll: number }) {
  return (
    <>
      <IntroZone scroll={scroll} />
    </>
  );
}

function IntroZone({ scroll }: { scroll: number }) {
  const spheres = useMemo<FloatingSphere[]>(() => {
    const items: FloatingSphere[] = [];
    const count = 16;

    for (let i = 0; i < count; i += 1) {
      items.push({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          -i * 0.6 - 4
        ],
        radius: 0.4 + Math.random() * 0.7,
        floatSpeed: 0.6 + Math.random() * 0.6
      });
    }

    return items;
  }, []);

  return (
    <>
      {spheres.map((sphere, index) => (
        <FloatingSphereMesh key={index} data={sphere} />
      ))}
    </>
  );
}

function FloatingSphereMesh({ data }: { data: FloatingSphere }) {
  const ref = useRef<THREE.Mesh | null>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    ref.current.position.set(
      data.position[0],
      data.position[1] + Math.sin(t * data.floatSpeed + data.position[0]) * 0.4,
      data.position[2]
    );

    ref.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[data.radius, 24, 24]} />
      <meshStandardMaterial
        color="#38bdf8"
        emissive="#0ea5e9"
        emissiveIntensity={0.7}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

