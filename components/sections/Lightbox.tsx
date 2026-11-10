"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/lib/photos";
import { Modal } from "@/components/ui/Modal";

type Props = {
  photos: Photo[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
};

/** Full-screen photo viewer: arrows, Esc, swipe on touch, caption + category. */
export function Lightbox({ photos, index, onIndex, onClose }: Props) {
  const open = index !== null;
  const photo = open ? photos[index] : null;
  const startX = useRef<number | null>(null);

  const go = (d: number) => {
    if (index === null) return;
    onIndex((index + d + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <Modal open={open} onClose={onClose} labelledBy="lightbox-caption" variant="bare">
      {photo ? (
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between gap-4 px-4 sm:px-6">
            <p className="stake tnum text-limestone/75">
              <span className="text-green">{String(index! + 1).padStart(2, "0")}</span> / {String(photos.length).padStart(2, "0")}
              <span className="mx-3 opacity-40">·</span>
              {photo.category}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="grid size-11 place-items-center rounded-[var(--radius)] text-limestone hover:bg-white/5"
              aria-label="Close photo viewer"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <div
            className="relative flex-1 touch-pan-y"
            onPointerDown={(e) => {
              startX.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (startX.current === null) return;
              const dx = e.clientX - startX.current;
              startX.current = null;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}
          >
            <Image
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              className="object-contain px-2 sm:px-20"
              draggable={false}
            />
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-asphalt/70 text-limestone backdrop-blur-sm transition hover:bg-card-dark sm:left-5"
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute top-1/2 right-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-asphalt/70 text-limestone backdrop-blur-sm transition hover:bg-card-dark sm:right-5"
              aria-label="Next photo"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          </div>

          <p id="lightbox-caption" className="shrink-0 px-4 py-5 text-center text-limestone sm:px-6" aria-live="polite">
            {photo.caption}
            <span className="ml-2 text-limestone/55">· Southern Maryland</span>
          </p>
        </div>
      ) : null}
    </Modal>
  );
}
