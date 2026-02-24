'use client';

type IntroOverlayProps = {
  progress: number;
  isMobile: boolean;
};

export function IntroOverlay({ progress, isMobile }: IntroOverlayProps) {
  const fadeOutStart = 0.0;
  const fadeOutEnd = 0.2;
  const t = clamp01((progress - fadeOutStart) / (fadeOutEnd - fadeOutStart));
  const opacity = 1 - t;
  const translateY = t * 32;

  if (isMobile) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-6"
      style={{ opacity, transform: `translateY(${translateY}px)` }}
    >
      <div className="max-w-3xl text-center space-y-4">
        <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-sky-400 uppercase">
          React Three Fiber · Next.js · Tailwind
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Hi, I&apos;m{" "}
          <span className="text-sky-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]">
            Parth
          </span>
          .
        </h1>
        <p className="text-base md:text-xl text-slate-200">
          I build{" "}
          <span className="text-sky-300">creative digital experiences</span>{" "}
          that blend storytelling, motion, and technology.
        </p>
      </div>
    </div>
  );
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

