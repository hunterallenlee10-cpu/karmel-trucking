"use client";

import { GripVertical } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { p } from "@/lib/photos";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { Reveal } from "@/components/ui/Reveal";
import { StakeLabel } from "@/components/ui/StakeLabel";

const BEFORE = p("15");
const AFTER = p("17");
const FRAMES = [
  { label: "Before", photo: p("15") },
  { label: "During", photo: p("16") },
  { label: "After", photo: p("18") },
];

export function BeforeAfter() {
  return (
    <section aria-labelledby="ba-title" className="contour bg-asphalt py-20 sm:py-28 lg:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <StakeLabel num="02">Pool removal</StakeLabel>
          <h2 id="ba-title" className="font-display mt-5 text-[clamp(2.2rem,6vw,4.5rem)]">
            The pool&apos;s gone. <span className="text-limestone/55">The yard&apos;s back.</span>
          </h2>
          <Reveal className="mt-10">
            <CompareSlider />
          </Reveal>
        </div>

        <div className="flex flex-col lg:col-span-5 lg:pt-[7.5rem]">
          <ol className="grid grid-cols-3 gap-2 sm:gap-3">
            {FRAMES.map((f, i) => (
              <li key={f.label}>
                <figure>
                  <div className="photo relative aspect-[3/4] overflow-hidden rounded-[var(--radius)]">
                    <Image src={f.photo.src} alt={f.photo.alt} fill sizes="(min-width: 1024px) 13vw, 30vw" className="object-cover" />
                  </div>
                  <figcaption className="stake tnum mt-3 flex items-center gap-2 text-[0.7rem] text-limestone/75">
                    <span className="text-green">0{i + 1}</span> {f.label}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>

          <Reveal className="mt-10 rounded-[var(--radius)] border border-line-dark bg-card-dark p-6 sm:p-8">
            <p className="stake text-limestone/70">Same kind of job, another yard</p>
            <dl className="mt-6 grid gap-5">
              <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <dt className="stake tnum text-[0.7rem] text-green">01 Problem</dt>
                <dd className="text-limestone/85">
                  A 10,000 to 15,000 sq ft yard with an in-ground pool to fill and an unused deck to tear down.
                </dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <dt className="stake tnum text-[0.7rem] text-green">02 The work</dt>
                <dd className="text-limestone/85">
                  Filled the pool, tore down the deck, leveled the yard, put down new grass seed and straw, and built a new driveway.
                </dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <dt className="stake tnum text-[0.7rem] text-green">03 Result</dt>
                <dd className="text-limestone/85">Fast, professional work at what he called very reasonable pricing.</dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-line-dark pt-4 text-sm text-limestone/70">
              <span className="font-semibold text-limestone">Wayne E.</span>, via Thumbtack · Jun 2023
            </p>
          </Reveal>

          <div className="mt-8">
            <EstimateButton size="lg" className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareSlider() {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div className="relative mx-auto aspect-[3/4] max-h-[78svh] w-full select-none overflow-hidden rounded-[var(--radius)] bg-card-dark lg:mx-0">
      <div className="photo absolute inset-0">
        <Image src={AFTER.src} alt={AFTER.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      </div>
      <div className="photo absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={BEFORE.src} alt={BEFORE.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      </div>

      <span className="stake absolute top-4 left-4 rounded-[4px] bg-asphalt/80 px-2.5 py-1.5 text-[0.7rem] backdrop-blur-sm" aria-hidden="true">
        Before
      </span>
      <span className="stake absolute top-4 right-4 rounded-[4px] bg-green px-2.5 py-1.5 text-[0.7rem] text-asphalt" aria-hidden="true">
        After
      </span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0 z-10 w-[2px] -translate-x-1/2 bg-limestone" style={{ left: `${pos}%` }} aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-green text-asphalt shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
          <GripVertical className="size-5" />
        </div>
      </div>

      <label htmlFor={id} className="sr-only">
        Before and after comparison. Use the arrow keys to reveal more of the before or after photo.
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% before photo shown`}
        className="ba-range absolute inset-0 z-20 m-0 h-full w-full rounded-[var(--radius)] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-green focus-visible:outline-solid"
      />
    </div>
  );
}
