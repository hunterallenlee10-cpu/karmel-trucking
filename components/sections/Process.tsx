"use client";

import { m, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { p, type Photo } from "@/lib/photos";
import { Reveal } from "@/components/ui/Reveal";
import { StakeLabel } from "@/components/ui/StakeLabel";

type Step = { title: string; text: string; photo: Photo };

const STEPS: Step[] = [
  { title: "Walk the site", text: "James walks it with you and tells you straight what it needs.", photo: p("03") },
  { title: "Clear", text: "Trees, root balls and brush pulled and hauled off.", photo: p("11") },
  { title: "Grade", text: "A level pad and the right slope away from the house.", photo: p("13") },
  { title: "Drain", text: "Pipe, culverts and swales so water goes where it should.", photo: p("20") },
  { title: "Finish", text: "Millings or stone spread and rolled. Seed and straw down.", photo: p("09") },
];

export function Process() {
  return (
    <section id="process" aria-label="How a job goes" className="bg-limestone text-asphalt">
      {/* Desktop: pinned, scroll-driven. Mobile and reduced motion: simple timeline. */}
      <PinnedProcess />
      <div className="lg:motion-safe:hidden">
        <TimelineProcess />
      </div>
    </section>
  );
}

function Header({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <StakeLabel num="03" tone="light">
        The process
      </StakeLabel>
      <h2 className="font-display mt-5 text-[clamp(2.2rem,5.4vw,4.25rem)]">
        How a job goes
      </h2>
    </div>
  );
}

function PinnedProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length * 0.999)));
    setActive(i);
  });

  return (
    <div ref={ref} className="relative hidden h-[250vh] lg:motion-safe:block">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="wrap grid h-full max-h-[920px] grid-cols-12 gap-12 pt-28 pb-12">
          <div className="col-span-5 flex flex-col">
            <Header />
            <div className="relative mt-10 flex-1">
              {/* The cut line: a faint track with the green line drawn by scroll. */}
              <div aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-[2px] bg-asphalt/12" />
              <m.div
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[11px] w-[2px] origin-top bg-green"
                style={{ scaleY: scrollYProgress }}
              />
              <ol className="relative flex h-full flex-col justify-between gap-4">
                {STEPS.map((s, i) => {
                  const on = i === active;
                  const done = i < active;
                  return (
                    <li key={s.title} className="flex gap-6" aria-current={on ? "step" : undefined}>
                      <span
                        aria-hidden="true"
                        className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300 ${
                          on || done ? "border-green bg-green" : "border-asphalt/25 bg-limestone"
                        }`}
                      >
                        <span className={`size-2 rounded-full ${on ? "bg-asphalt" : "bg-transparent"}`} />
                      </span>
                      <div className={`transition-opacity duration-300 ${on ? "opacity-100" : "opacity-40"}`}>
                        <p className="stake tnum text-[0.7rem] text-green-ink">Step 0{i + 1}</p>
                        <h3 className="font-display mt-1 text-[1.6rem] xl:text-[1.9rem]">{s.title}</h3>
                        <p
                          className={`max-w-sm overflow-hidden text-[1.02rem] leading-snug text-muted-light transition-[max-height,margin] duration-500 ${
                            on ? "mt-2 max-h-24" : "mt-0 max-h-0"
                          }`}
                        >
                          {s.text}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          <div className="relative col-span-7 overflow-hidden rounded-[var(--radius)] bg-asphalt">
            {STEPS.map((s, i) => (
              <div
                key={s.photo.id}
                className="photo absolute inset-0 transition-[opacity,transform] duration-700 ease-out"
                style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.04)" }}
                aria-hidden={i !== active}
              >
                <Image src={s.photo.src} alt={s.photo.alt} fill sizes="55vw" className="object-cover" />
              </div>
            ))}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-asphalt/80 to-transparent" />
            <p className="font-display tnum absolute right-6 bottom-5 text-[5.5rem] leading-none text-limestone/90" aria-hidden="true">
              0{active + 1}
              <span className="text-[2rem] text-limestone/45"> / 05</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineProcess() {
  return (
    <div className="wrap py-20 sm:py-28">
      <Header />
      <ol className="relative mt-12 grid gap-12 border-l-2 border-green pl-6 sm:pl-10">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.title} className="relative">
            <span aria-hidden="true" className="absolute top-1 -left-[calc(1.5rem+13px)] size-6 rounded-full border-2 border-green bg-limestone sm:-left-[calc(2.5rem+13px)]" />
            <p className="stake tnum text-[0.7rem] text-green-ink">Step 0{i + 1}</p>
            <h3 className="font-display mt-1 text-[1.6rem]">{s.title}</h3>
            <p className="mt-2 max-w-md text-[1.02rem] text-muted-light">{s.text}</p>
            <div className="photo relative mt-5 aspect-[4/3] overflow-hidden rounded-[var(--radius)] sm:max-w-xl">
              <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
