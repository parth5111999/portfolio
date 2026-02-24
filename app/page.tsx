'use client';

import { useEffect, useState } from "react";
import { ScrollSceneCanvas } from "@/components/ScrollSceneCanvas";
import { useScrollProgress } from "@/components/useScrollProgress";
import { IntroOverlay } from "@/components/ui/IntroOverlay";
import { Modal } from "@/components/ui/Modal";

export default function HomePage() {
  const scrollProgress = useScrollProgress({ smoothing: 0.08 });
  const [isMobile, setIsMobile] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handlePanelSelect = (id: string) => {
    setActiveProjectId(id);
  };

  const handleCloseModal = () => {
    setActiveProjectId(null);
  };

  return (
    <main className="relative min-h-[280vh] bg-slate-950 text-slate-50">
      <ScrollSceneCanvas
        scrollProgress={scrollProgress}
        isMobile={isMobile}
        onPanelSelect={handlePanelSelect}
      />

      <IntroOverlay progress={scrollProgress} isMobile={isMobile} />

      {isMobile ? (
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
          <div className="max-w-xl space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
              Parth · Portfolio
            </p>
            <h1 className="text-3xl font-semibold md:text-4xl">
              Creative digital experiences,{" "}
              <span className="text-sky-400">optimized for mobile.</span>
            </h1>
            <p className="text-sm text-slate-300">
              On smaller screens the full 3D scene is disabled to keep things
              fast and accessible. Scroll to explore my work and get in touch.
            </p>
          </div>
        </section>
      ) : null}

      {/* Push explanatory content below initial hero viewport on desktop */}
      <div className="relative z-10 mt-[110vh] space-y-24 px-6">
        <section className="flex min-h-[60vh] items-center justify-center">
          <div className="max-w-xl space-y-4 rounded-2xl bg-slate-900/80 p-8 backdrop-blur">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Smooth cinematic scroll
            </h2>
            <p className="text-slate-300 text-sm md:text-base">
              As you scroll, the camera glides through a 3D space, easing
              between sections while subtle parallax reacts to your mouse. This
              creates a cinematic, story-like journey through the site.
            </p>
          </div>
        </section>

        <section className="flex min-h-[60vh] items-center justify-center">
          <div className="max-w-xl space-y-4 rounded-2xl bg-slate-900/80 p-8 backdrop-blur">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Project experiments
            </h2>
            <p className="text-slate-300 text-sm md:text-base">
              In the scene, glowing panels represent different experiments and
              projects. Hover and click them to reveal more details in a modal
              overlay without breaking the flow of the scroll experience.
            </p>
          </div>
        </section>
      </div>

      <Modal
        open={activeProjectId !== null}
        title="Project placeholder"
        onClose={handleCloseModal}
      >
        <p className="mb-2">
          This is a placeholder for a future project detail view.
        </p>
        <p className="text-slate-400 text-xs">
          You clicked: <span className="font-mono">{activeProjectId}</span>.
          Replace this with real content once your projects are ready.
        </p>
      </Modal>
    </main>
  );
}
