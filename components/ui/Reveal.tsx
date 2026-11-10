"use client";

import { m } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
};

/** The one simple motion used outside the hero and Process: 12px fade-up, 400ms, once. */
export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </Comp>
  );
}
