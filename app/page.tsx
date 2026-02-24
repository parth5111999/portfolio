import { ScrollSceneCanvas } from "@/components/ScrollSceneCanvas";

export default function HomePage() {
  return (
    <main className="relative min-h-[200vh] bg-slate-950 text-slate-50">
      <ScrollSceneCanvas />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="max-w-3xl text-center space-y-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-sky-400 uppercase">
            React Three Fiber · Next.js · Tailwind
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Fullscreen 3D scene synced to{" "}
            <span className="text-sky-400">smooth scroll</span>.
          </h1>
          <p className="text-base md:text-lg text-slate-300">
            Scroll to drive the motion of the 3D object in the background.
            The canvas stays fixed while the page content scrolls over it.
          </p>
          <p className="text-xs text-slate-500">
            Tip: try slow, steady scrolling to see the easing effect.
          </p>
        </div>
      </section>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl space-y-4 rounded-2xl bg-slate-900/70 p-8 backdrop-blur">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Smooth scroll tracking
          </h2>
          <p className="text-slate-300">
            Scroll position is normalized between 0 and 1 and then smoothed
            with an easing function before being passed into the React Three
            Fiber scene. That smoothed value drives rotation and depth to keep
            motion feeling fluid instead of jittery.
          </p>
          <p className="text-slate-400 text-sm">
            You can plug the same scroll value into any animation system,
            shaders, or camera controls you like.
          </p>
        </div>
      </section>
    </main>
  );
}
