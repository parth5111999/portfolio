import { useEffect, useState } from "react";

type Options = {
  smoothing?: number;
};

export function useScrollProgress(options: Options = {}) {
  const { smoothing = 0.08 } = options;
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

