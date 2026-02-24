'use client';

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./scene/CameraRig";
import { SceneZones } from "./scene/SceneZones";
import { ProjectPanels } from "./scene/ProjectPanels";

type ScrollSceneCanvasProps = {
  scrollProgress: number;
  isMobile: boolean;
  onPanelSelect: (id: string) => void;
};

export function ScrollSceneCanvas({
  scrollProgress,
  isMobile,
  onPanelSelect
}: ScrollSceneCanvasProps) {
  return (
    <div className="fixed inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        className="h-full w-full"
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 6, 22]} />

        <ambientLight intensity={0.35} />
        <hemisphereLight
          intensity={0.7}
          color="#e0f2fe"
          groundColor="#020617"
        />
        <directionalLight
          position={[6, 10, 4]}
          intensity={1.2}
          castShadow={false}
        />

        <CameraRig scroll={scrollProgress} />

        <Suspense fallback={null}>
          <SceneZones scroll={scrollProgress} />
          <ProjectPanels onSelect={onPanelSelect} />
        </Suspense>
      </Canvas>
    </div>
  );
}
