"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { business, navLinks } from "@/lib/site";
import { useEstimate } from "@/components/estimate/EstimateContext";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { Modal } from "@/components/ui/Modal";
import { Wordmark } from "@/components/ui/Wordmark";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useEstimate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-line-dark bg-asphalt/95 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Keeps the nav legible over the hero photo before it turns solid. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-asphalt/70 to-transparent transition-opacity duration-300 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      />
      <nav aria-label="Main" className="relative mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 sm:h-[72px] sm:px-6 lg:px-10">
        <Link href="/" className="shrink-0" aria-label="Karmel Trucking & Excavating, home">
          <Wordmark className="h-7 w-auto sm:h-9" />
        </Link>

        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-[var(--radius)] px-3 py-2 text-[0.92rem] font-medium text-limestone/85 transition-colors hover:text-limestone"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1 sm:gap-4 lg:ml-0">
          <a
            href={business.phoneHref}
            className="tnum hidden items-center gap-2 text-[0.95rem] font-semibold text-limestone transition-colors hover:text-green xl:inline-flex"
          >
            <Phone className="size-4 text-green" aria-hidden="true" />
            {business.phoneDisplay}
          </a>
          <EstimateButton label="Free Estimate" size="sm" arrow={false} className="px-3 whitespace-nowrap max-[359px]:hidden sm:px-4" />
          <a
            href={business.phoneHref}
            className="grid size-11 place-items-center rounded-[var(--radius)] text-limestone sm:hidden"
            aria-label={`Call ${business.phoneDisplay}`}
          >
            <Phone className="size-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="grid size-11 place-items-center rounded-[var(--radius)] text-limestone lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} labelledBy="menu-title" variant="bare">
        <div className="contour flex h-full flex-col overflow-y-auto px-5 pt-4 pb-8">
          <div className="flex h-12 items-center justify-between">
            <Wordmark className="h-8 w-auto" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="grid size-11 place-items-center rounded-[var(--radius)] text-limestone"
              aria-label="Close menu"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <h2 id="menu-title" className="sr-only">
            Menu
          </h2>
          <ul className="mt-10 grid gap-1">
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display flex items-baseline gap-4 py-3 text-[2rem] text-limestone"
                >
                  <span className="stake text-green">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <p className="stake text-limestone/60">Call James</p>
            <a href={business.phoneHref} className="font-display tnum mt-3 block text-[2.1rem] text-limestone">
              {business.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                window.setTimeout(() => open(), 220);
              }}
              className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-[var(--radius)] bg-green text-lg font-semibold text-asphalt"
            >
              Get a Free Estimate
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
}
