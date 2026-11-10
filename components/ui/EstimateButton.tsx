"use client";

import { ArrowRight } from "lucide-react";
import { useEstimate, type EstimatePrefill } from "@/components/estimate/EstimateContext";

type Props = {
  label?: string;
  size?: "sm" | "md" | "lg";
  prefill?: EstimatePrefill;
  className?: string;
  arrow?: boolean;
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base sm:h-16 sm:px-8 sm:text-lg",
};

/** The one CTA. Green fill, asphalt text (5.6:1). Opens the estimate modal. */
export function EstimateButton({ label = "Get a Free Estimate", size = "md", prefill, className = "", arrow = true }: Props) {
  const { open } = useEstimate();
  return (
    <button
      type="button"
      onClick={() => open(prefill)}
      className={`group inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-green font-semibold text-asphalt transition-[background-color,transform] duration-200 hover:bg-[#4fb233] active:translate-y-px ${sizes[size]} ${className}`}
    >
      <span>{label}</span>
      {arrow ? (
        <ArrowRight className="size-[1.1em] transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
      ) : null}
    </button>
  );
}
