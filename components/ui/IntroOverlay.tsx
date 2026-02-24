'use client';

type IntroOverlayProps = {
  progress: number;
  isMobile: boolean;
};

export function IntroOverlay({ progress, isMobile }: IntroOverlayProps) {
  // Fade in once we move "inside" the clouds
  const fadeInStart = 0.18;
  const fadeInEnd = 0.35;
  const t = clamp01((progress - fadeInStart) / (fadeInEnd - fadeInStart));
  const opacity = t;
  const translateY = (1 - t) * 32;

  if (isMobile) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-6"
      style={{ opacity, transform: `translateY(${translateY}px)` }}
    >
      <div className="max-w-3xl text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Hi, I&apos;m{" "}
          <span className="text-sky-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]">
            Parth
          </span>
          .
        </h1>
        <p className="text-base md:text-xl text-slate-200">
          I&apos;m an SEO-focused{" "}
          <span className="text-sky-300">creative digital experience</span>{" "}
          builder who blends strategy, content, and motion.
        </p>
      </div>
    </div>
  );
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

