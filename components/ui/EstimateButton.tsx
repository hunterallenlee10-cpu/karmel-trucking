"use client";

import { ArrowRight } from "lucide-react";
import { useEstimate, type EstimatePrefill } from "@/components/estimate/EstimateContext";

type Props = {
  label?: string;
  size?: "sm" | "md" | "lg";
  prefill?: EstimatePrefill;
  className?: string;
  arrow?: boolean;
  /** Called first, e.g. to close a parent modal. The estimate then opens after its exit animation. */
  onBeforeOpen?: () => void;
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base sm:h-16 sm:px-8 sm:text-lg",
};

/** The one CTA. Green fill, asphalt text (5.6:1). Opens the estimate modal. */
export function EstimateButton({ label = "Get a Free Estimate", size = "md", prefill, className = "", arrow = true, onBeforeOpen }: Props) {
  const { open } = useEstimate();
  return (
    <button
      type="button"
      onClick={() => {
        if (onBeforeOpen) {
          onBeforeOpen();
          window.setTimeout(() => open(prefill), 260);
        } else {
          open(prefill);
        }
      }}
      className={`group inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-green font-semibold text-asphalt transition-[background-color,transform] duration-200 hover:bg-[#4fb233] active:translate-y-px ${sizes[size]} ${className}`}
    >
      <span>{label}</span>
      {arrow ? (
        <ArrowRight className="size-[1.1em] transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
      ) : null}
    </button>
  );
}
