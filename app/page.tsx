'use client';

import { useEffect, useState } from "react";
import { ScrollSceneCanvas } from "@/components/ScrollSceneCanvas";
import { useScrollProgress } from "@/components/useScrollProgress";
import { IntroOverlay } from "@/components/ui/IntroOverlay";

export default function HomePage() {
  const scrollProgress = useScrollProgress({ smoothing: 0.08 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50">
      <ScrollSceneCanvas
        scrollProgress={scrollProgress}
        isMobile={isMobile}
        onPanelSelect={() => {}}
      />

      <IntroOverlay progress={scrollProgress} isMobile={isMobile} />

      {/* Spacer so you can scroll "into" the clouds while staying fullscreen */}
      <div className="h-[350vh]" />
    </main>
  );
}
