"use client";

import { Modal } from "@/components/ui/Modal";
import type { EstimatePrefill } from "./EstimateContext";
import { EstimateForm } from "./EstimateForm";

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
