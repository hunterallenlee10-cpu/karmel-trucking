"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { EstimateProvider } from "@/components/estimate/EstimateContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {/* "user" turns transform animations off when the OS asks for reduced motion. */}
      <MotionConfig reducedMotion="user">
        <EstimateProvider>{children}</EstimateProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
