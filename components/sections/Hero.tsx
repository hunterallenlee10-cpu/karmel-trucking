"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { business, proof } from "@/lib/site";
import { p } from "@/lib/photos";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { StakeLabel } from "@/components/ui/StakeLabel";

const SLIDES = [p("01"), p("03"), p("05")];
const WORDS = ["CLEAR IT.", "GRADE IT.", "DRAIN IT.", "HAUL IT."];

export function Hero() {
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [word, setWord] = useState(0);
  // The 2nd and 3rd photos mount after first paint so they never compete with the LCP image.
  const [extras, setExtras] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setExtras(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduce || !extras) return;
    const t = window.setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => window.clearInterval(t);
  }, [reduce, extras]);

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2200);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex flex-col bg-asphalt lg:grid lg:min-h-[max(100svh,720px)] lg:grid-cols-[55fr_45fr]"
    >
      {/* Photo panel: right on desktop, on top at 60vh on mobile. */}
      <div className="relative h-[60svh] min-h-[380px] lg:order-2 lg:h-auto">
        <div className="photo absolute inset-0 bg-card-dark">
          {SLIDES.map((ph, i) =>
            i === 0 || extras ? (
              <div
                key={ph.id}
                className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
                style={{ opacity: slide === i ? 1 : 0 }}
                aria-hidden={slide !== i}
              >
                <Image
                  src={ph.src}
                  alt={ph.alt}
                  fill
                  preload={i === 0}
                  fetchPriority={i === 0 ? "high" : "low"}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  style={{
                    transform: !reduce && slide === i ? "scale(1.05)" : "scale(1)",
                    transition: "transform 7.5s linear",
                  }}
                />
              </div>
            ) : null,
          )}
          {/* Mobile: fade the bottom of the photo into the asphalt copy block. */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-asphalt to-transparent lg:hidden" />
          <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-asphalt/60 to-transparent lg:block" />
        </div>

        {/* Floating "job ticket" overlapping the photo's bottom-left. */}
        <div className="absolute bottom-6 left-4 z-10 hidden w-[340px] sm:block lg:bottom-14 lg:-left-16 xl:-left-24">
          <JobTicket />
        </div>

        {/* Slide index + survey coordinates for Mechanicsville, MD */}
        <div className="absolute right-4 bottom-6 z-10 hidden flex-col items-end gap-3 lg:flex lg:right-8 lg:bottom-14" aria-hidden="true">
          <span className="stake tnum rounded-[var(--radius)] bg-asphalt/70 px-2.5 py-1.5 text-[0.68rem] text-limestone/85 backdrop-blur-sm">
            38.44°N · 76.74°W
          </span>
          <span className="flex items-center gap-2">
          {SLIDES.map((ph, i) => (
            <span key={ph.id} className={`h-[3px] rounded-full transition-all duration-500 ${slide === i ? "w-8 bg-green" : "w-4 bg-limestone/40"}`} />
          ))}
          </span>
        </div>
      </div>

      {/* Copy panel */}
      <div className="contour relative -mt-16 flex flex-col justify-center px-4 pb-14 sm:px-8 lg:order-1 lg:mt-0 lg:pt-32 lg:pr-16 lg:pb-20 lg:pl-10 xl:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] xl:pr-20">
        <StakeLabel>Mechanicsville, MD · Southern Maryland</StakeLabel>

        <h1 id="hero-title" className="font-display mt-6 text-[clamp(2.6rem,11.6vw,5.4rem)] lg:mt-8 lg:text-[clamp(3rem,5.3vw,5.6rem)]">
          <span className="block">We move</span>
          <span className="block">the earth</span>
          <span className="sr-only">. Clear it, grade it, drain it, haul it.</span>
          <span aria-hidden="true" className="relative block h-[1em] overflow-hidden text-green">
            {reduce ? (
              <span className="block">{WORDS[0]}</span>
            ) : (
              <AnimatePresence initial={false} mode="popLayout">
                <m.span
                  key={WORDS[word]}
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-105%" }}
                  transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                >
                  {WORDS[word]}
                </m.span>
              </AnimatePresence>
            )}
          </span>
        </h1>

        <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-limestone/80 sm:text-xl">
          Land clearing, grading, drainage, demolition and bulk material delivery across Southern Maryland. Owner-led crew. Free
          estimates.
        </p>

        <div className="mt-9 flex flex-col items-start gap-4">
          <EstimateButton size="lg" className="w-full sm:w-auto" />
          <p className="text-[0.95rem] text-limestone/70">
            or call {business.ownerFirst}:{" "}
            <a href={business.phoneHref} className="tnum font-semibold text-limestone underline-offset-4 hover:text-green hover:underline">
              {business.phoneDisplay}
            </a>
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line-dark pt-6 text-sm text-limestone/80">
          <li className="flex items-center gap-2">
            <Star className="size-4 fill-green text-green" aria-hidden="true" />
            <span>
              <strong className="tnum font-semibold text-limestone">{proof.facebook.recommend}</strong> recommend on Facebook
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1 rounded-full bg-limestone/30" />
            <span>
              <strong className="tnum font-semibold text-limestone">{proof.thumbtack.rating}</strong> on Thumbtack
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1 rounded-full bg-limestone/30" />
            <span>Licensed &amp; insured</span>
          </li>
        </ul>

        <div className="mt-8 sm:hidden">
          <JobTicket />
        </div>
      </div>
    </section>
  );
}

function JobTicket() {
  const ph = p("07");
  return (
    <div className="relative flex overflow-hidden rounded-[var(--radius)] bg-limestone text-asphalt shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
      <div className="photo relative w-[92px] shrink-0">
        <Image src={ph.src} alt={ph.alt} fill sizes="92px" className="object-cover" />
      </div>
      {/* Perforated edge */}
      <div aria-hidden="true" className="w-0 border-l-2 border-dashed border-asphalt/20" />
      <div className="flex-1 p-4">
        <p className="stake flex items-center gap-2 text-[0.68rem] text-muted-light">
          <span className="size-1.5 rounded-full bg-green-ink" />
          Latest job
        </p>
        <p className="mt-2 text-[0.95rem] leading-snug font-semibold">
          <span className="tnum font-display text-[1.35rem] text-green-ink">40 tons</span>
          <br />
          of double-ground millings, spread and rolled.
        </p>
      </div>
    </div>
  );
}
