"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { EstimateService } from "@/lib/site";
import { EstimateModal } from "./EstimateModal";

export type EstimatePrefill = {
  services?: EstimateService[];
  notes?: string;
};

type Ctx = {
  open: (prefill?: EstimatePrefill) => void;
};

const EstimateCtx = createContext<Ctx | null>(null);

export function EstimateProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<EstimatePrefill | undefined>();
  // Bumped on each open so the form remounts fresh with the new prefill.
  const [session, setSession] = useState(0);

  const open = useCallback((p?: EstimatePrefill) => {
    setPrefill(p);
    setSession((s) => s + 1);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  // Warm the form chunk once the page is idle, so the first open is instant.
  useEffect(() => {
    const warm = () => void import("./EstimateForm");
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warm, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(warm, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <EstimateCtx.Provider value={value}>
      {children}
      <EstimateModal open={isOpen} onClose={() => setOpen(false)} prefill={prefill} session={session} />
    </EstimateCtx.Provider>
  );
}

export function useEstimate() {
  const ctx = useContext(EstimateCtx);
  if (!ctx) throw new Error("useEstimate must be used inside EstimateProvider");
  return ctx;
}
