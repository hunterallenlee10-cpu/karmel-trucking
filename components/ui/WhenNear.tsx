"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders children only once the wrapper is within `margin` of the viewport.
 * Used for photos just below the hero, which native lazy-loading would fetch
 * immediately and which would then compete with the hero image on mobile.
 */
export function WhenNear({ children, margin = "300px", className }: { children: React.ReactNode; margin?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, near]);

  return (
    <div ref={ref} className={className}>
      {near ? children : null}
    </div>
  );
}
