"use client";

import { Modal } from "@/components/ui/Modal";
import type { EstimatePrefill } from "./EstimateContext";
import dynamic from "next/dynamic";

// The form code loads on first open (or when the browser is idle), not with the first paint.
const EstimateForm = dynamic(() => import("./EstimateForm").then((m) => m.EstimateForm), {
  ssr: false,
  loading: () => <div className="h-[420px]" aria-busy="true" />,
});

type Props = {
  open: boolean;
  onClose: () => void;
  prefill?: EstimatePrefill;
  session: number;
};

export function EstimateModal({ open, onClose, prefill, session }: Props) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="estimate-title" className="sm:max-w-2xl" closeLabel="Close estimate form">
      <EstimateForm key={session} prefill={prefill} titleId="estimate-title" onDone={onClose} />
    </Modal>
  );
}
