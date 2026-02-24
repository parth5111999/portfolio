'use client';

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

type Panel = {
  id: string;
  position: [number, number, number];
};

const PANELS: Panel[] = [
  { id: "project-1", position: [-2, 0, -10] },
  { id: "project-2", position: [0, -0.5, -11] },
  { id: "project-3", position: [2, 0.5, -12] }
];

export function ProjectPanels({
  onSelect
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {PANELS.map((panel) => (
        <PanelMesh key={panel.id} panel={panel} onSelect={onSelect} />
      ))}
    </>
  );
}

function PanelMesh({
  panel,
  onSelect
}: {
  panel: Panel;
  onSelect: (id: string) => void;
}) {
  const ref = useRef<THREE.Mesh | null>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;

    const targetScale = hovered ? 1.15 : 1;
    const currentScale = ref.current.scale.x;
    const nextScale = currentScale + (targetScale - currentScale) * 0.12;
    ref.current.scale.setScalar(nextScale);
  });

  return (
    <mesh
      ref={ref}
      position={panel.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(panel.id);
      }}
    >
      <planeGeometry args={[2.2, 1.3, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? "#38bdf8" : "#0f172a"}
        emissive="#0ea5e9"
        emissiveIntensity={hovered ? 1.2 : 0.4}
        roughness={0.35}
        metalness={0.15}
      />
    </mesh>
  );
}

