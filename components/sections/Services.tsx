"use client";

import { ArrowUpRight, Check, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { business } from "@/lib/site";
import { featuredServices, moreServices, type Service } from "@/lib/services";
import { p } from "@/lib/photos";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { StakeLabel } from "@/components/ui/StakeLabel";

export function Services() {
  const [active, setActive] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);

  const show = (s: Service) => {
    setActive(s);
    setOpen(true);
  };

  return (
    <section id="services" aria-labelledby="services-title" className="bg-limestone py-20 text-asphalt sm:py-28 lg:py-32">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <StakeLabel num="01" tone="light">
              What we do
            </StakeLabel>
            <h2 id="services-title" className="font-display mt-5 text-[clamp(2.2rem,6.4vw,4.75rem)]">
              From the first tree to the last load of stone.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted-light lg:col-span-4 lg:pb-2">
            One crew for the whole site. Clear it, grade it, drain it, then haul in what it needs. Every job starts with a free estimate.
          </p>
        </div>

        {/* Rule of three */}
        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5">
          {featuredServices.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => show(s)}
                className="group relative block aspect-[5/4] w-full md:aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-asphalt text-left text-limestone"
                aria-label={`${s.title}: learn more`}
              >
                <div className="photo absolute inset-0">
                  <Image
                    src={s.photo!.src}
                    alt={s.photo!.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/45 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="stake tnum text-limestone/85">0{i + 1}</span>
                  <span className="grid size-10 place-items-center rounded-full bg-asphalt/60 backdrop-blur-sm">
                    <ServiceIcon name={s.icon} className="size-5 text-green" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 className="font-display text-[1.75rem] sm:text-[2rem]">{s.title}</h3>
                  <span aria-hidden="true" className="mt-3 block h-[3px] w-10 bg-green transition-[width] duration-500 ease-out group-hover:w-full" />
                  <p className="mt-4 max-w-xs text-[0.98rem] leading-snug text-limestone/85">{s.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Learn more <ArrowUpRight className="size-4 text-green transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </ul>

        {/* Full grid */}
        <div className="mt-20 flex items-end justify-between gap-6 border-b border-line-light pb-5">
          <h3 className="font-display text-2xl sm:text-3xl">And the rest of the job</h3>
          <span className="stake tnum hidden text-muted-light sm:block">{moreServices.length} more services</span>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {moreServices.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 4) * 0.04}>
              <button
                type="button"
                onClick={() => show(s)}
                className="group relative flex h-full min-h-[184px] w-full flex-col overflow-hidden rounded-[var(--radius)] bg-card-light p-5 text-left transition-colors"
                aria-label={`${s.title}: learn more`}
              >
                {s.photo ? (
                  <div className="photo absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Image src={s.photo.src} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                    <div className="absolute inset-0 bg-asphalt/70" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-asphalt opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                )}
                <div className="relative flex h-full flex-col transition-colors duration-300 group-hover:text-limestone group-focus-visible:text-limestone">
                  <div className="flex items-center justify-between">
                    <ServiceIcon name={s.icon} className="size-6 text-green-ink transition-colors group-hover:text-green group-focus-visible:text-green" />
                    <ArrowUpRight className="size-4 opacity-50 transition group-hover:opacity-100" aria-hidden="true" />
                  </div>
                  <h4 className="font-display mt-auto pt-8 text-[1.2rem] leading-[1.02]">{s.title}</h4>
                  <p className="mt-2 text-sm leading-snug text-muted-light transition-colors group-hover:text-limestone/80 group-focus-visible:text-limestone/80">
                    {s.blurb}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </ul>

        <AlsoLine />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy="service-title" className="sm:max-w-3xl">
        {active ? <ServiceDetail service={active} onClose={() => setOpen(false)} /> : null}
      </Modal>
    </section>
  );
}

function AlsoLine() {
  const plow = p("36");
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[var(--radius)] border border-line-light px-4 py-3 text-[0.95rem]">
      <span className="photo relative size-11 shrink-0 overflow-hidden rounded-[4px]">
        <Image src={plow.src} alt={plow.alt} fill sizes="44px" className="object-cover" />
      </span>
      <span className="stake text-muted-light">Also</span>
      <span className="font-semibold">Snow plowing</span>
      <span aria-hidden="true" className="size-1 rounded-full bg-asphalt/30" />
      <span className="font-semibold">Seasonal lawn care</span>
      <span className="text-muted-light">Ask when you call.</span>
    </div>
  );
}

function ServiceDetail({ service: s, onClose }: { service: Service; onClose: () => void }) {
  return (
    <div className="grid sm:grid-cols-[2fr_3fr]">
      {s.photo ? (
        <div className="photo relative hidden min-h-full sm:block">
          <Image src={s.photo.src} alt={s.photo.alt} fill sizes="300px" className="object-cover" />
        </div>
      ) : (
        <div className="contour hidden place-items-center bg-asphalt sm:grid">
          <ServiceIcon name={s.icon} className="size-16 text-green" />
        </div>
      )}
      <div className="p-6 pt-8 sm:p-8">
        <span className="flex items-center gap-3">
          <ServiceIcon name={s.icon} className="size-5 text-green" />
          <span className="stake text-limestone/70">Service</span>
        </span>
        <h2 id="service-title" className="font-display mt-4 pr-10 text-3xl sm:text-[2.2rem]">
          {s.title}
        </h2>
        <p className="mt-3 text-limestone/80">{s.blurb}</p>
        <ul className="mt-6 grid gap-3">
          {s.reasons.map((r) => (
            <li key={r} className="flex gap-3">
              <Check className="mt-0.5 size-5 shrink-0 text-green" aria-hidden="true" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          <EstimateButton prefill={{ services: s.prefill }} className="w-full" onBeforeOpen={onClose} />
          <a
            href={business.phoneHref}
            className="tnum inline-flex items-center justify-center gap-2 text-sm text-limestone/75 hover:text-limestone"
          >
            <Phone className="size-4" aria-hidden="true" /> or call {business.ownerFirst}: {business.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
