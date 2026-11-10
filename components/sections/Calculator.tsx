"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { business } from "@/lib/site";
import { p } from "@/lib/photos";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { StakeLabel } from "@/components/ui/StakeLabel";

// Rough tons per cubic yard (industry averages). Mulch is sold by the yard only.
const MATERIALS = [
  { name: "Asphalt Millings", factor: 1.4 },
  { name: "Crushed Stone", factor: 1.4 },
  { name: "Fill Dirt", factor: 1.3 },
  { name: "Topsoil", factor: 1.2 },
  { name: "Mulch", factor: null },
] as const;

const DEPTHS = [2, 3, 4, 6];

const fmt = (n: number) => (n >= 100 ? Math.round(n).toLocaleString("en-US") : n.toFixed(1));

export function Calculator() {
  const uid = useId();
  const [material, setMaterial] = useState<(typeof MATERIALS)[number]["name"]>("Asphalt Millings");
  const [length, setLength] = useState("60");
  const [width, setWidth] = useState("12");
  const [depth, setDepth] = useState("4");
  const [waste, setWaste] = useState(true);

  const mat = MATERIALS.find((m) => m.name === material)!;
  const L = parseFloat(length) || 0;
  const W = parseFloat(width) || 0;
  const D = parseFloat(depth) || 0;

  const { yards, tons } = useMemo(() => {
    const y = ((L * W * (D / 12)) / 27) * (waste ? 1.1 : 1);
    return { yards: y, tons: mat.factor ? y * mat.factor : null };
  }, [L, W, D, waste, mat.factor]);

  const valid = L > 0 && W > 0 && D > 0;
  const bigJob = tons !== null && tons >= 40;

  const notes = valid
    ? `Calculator: ${material}, about ${fmt(yards)} cubic yards${tons !== null ? ` (${fmt(tons)} tons)` : ""}. Area ${L} x ${W} ft at ${D} in deep${waste ? ", plus 10% for compaction and waste" : ""}.`
    : `Calculator: ${material}.`;

  const input =
    "no-spin tnum h-14 w-full rounded-[var(--radius)] border border-line-light bg-limestone px-4 pr-12 text-lg font-semibold text-asphalt focus:border-green-ink focus:outline-none";

  return (
    <section id="materials" aria-labelledby="calc-title" className="bg-limestone py-20 text-asphalt sm:py-28 lg:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <StakeLabel num="05" tone="light">
            Bulk materials
          </StakeLabel>
          <h2 id="calc-title" className="font-display mt-5 text-[clamp(2.2rem,5.6vw,4.25rem)]">
            How much do you need?
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-light">
            Stone, millings, fill dirt, topsoil and mulch, delivered by the load. Punch in your area and get a ballpark.
          </p>
          <div className="photo relative mt-8 hidden aspect-[4/5] overflow-hidden rounded-[var(--radius)] lg:block">
            <Image src={p("06").src} alt={p("06").alt} fill sizes="38vw" className="object-cover" />
            <span className="stake absolute bottom-4 left-4 rounded-[4px] bg-asphalt/80 px-2.5 py-1.5 text-[0.7rem] text-limestone backdrop-blur-sm">
              Stone delivery, Southern Maryland
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[var(--radius)] bg-card-light p-5 sm:p-8">
            <fieldset>
              <legend className="stake text-muted-light">01 Material</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {MATERIALS.map((m) => {
                  const on = m.name === material;
                  return (
                    <label
                      key={m.name}
                      className={`inline-flex h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-green-ink has-[:focus-visible]:outline-solid ${
                        on ? "border-asphalt bg-asphalt text-limestone" : "border-line-light bg-limestone text-asphalt hover:border-asphalt/40"
                      }`}
                    >
                      <input type="radio" name={`${uid}-mat`} className="sr-only" checked={on} onChange={() => setMaterial(m.name)} />
                      {m.name}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="stake text-muted-light">02 Length</span>
                <span className="relative mt-3 block">
                  <input type="number" inputMode="decimal" min={0} className={input} value={length} onChange={(e) => setLength(e.target.value)} />
                  <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-muted-light">ft</span>
                </span>
              </label>
              <label className="block">
                <span className="stake text-muted-light">03 Width</span>
                <span className="relative mt-3 block">
                  <input type="number" inputMode="decimal" min={0} className={input} value={width} onChange={(e) => setWidth(e.target.value)} />
                  <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-muted-light">ft</span>
                </span>
              </label>
            </div>

            <fieldset className="mt-6">
              <legend className="stake text-muted-light">04 Depth</legend>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {DEPTHS.map((d) => {
                  const on = String(d) === depth;
                  return (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setDepth(String(d))}
                      className={`tnum h-11 min-w-14 rounded-[var(--radius)] border px-3 text-sm font-semibold transition-colors ${
                        on ? "border-asphalt bg-asphalt text-limestone" : "border-line-light bg-limestone hover:border-asphalt/40"
                      }`}
                    >
                      {d}&quot;
                    </button>
                  );
                })}
                <label className="relative ml-1 w-32">
                  <span className="sr-only">Custom depth in inches</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="no-spin tnum h-11 w-full rounded-[var(--radius)] border border-line-light bg-limestone px-3 pr-10 text-sm font-semibold focus:border-green-ink focus:outline-none"
                  />
                  <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-light">in</span>
                </label>
              </div>
            </fieldset>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-line-light pt-6">
              <span id={`${uid}-waste`} className="text-[0.95rem]">
                Add 10% for compaction &amp; waste
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={waste}
                aria-labelledby={`${uid}-waste`}
                onClick={() => setWaste((w) => !w)}
                className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${waste ? "bg-green-ink" : "bg-asphalt/25"}`}
              >
                <span className={`absolute top-1 left-1 size-6 rounded-full bg-limestone shadow transition-transform ${waste ? "translate-x-6" : ""}`} />
              </button>
            </div>

            {/* Result */}
            <div className="mt-6 rounded-[var(--radius)] bg-asphalt p-5 text-limestone sm:p-7" aria-live="polite">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="stake text-[0.7rem] text-limestone/65">Cubic yards</p>
                  <p className="font-display tnum mt-2 text-[clamp(2.4rem,7vw,4rem)] text-green">{valid ? fmt(yards) : "0.0"}</p>
                </div>
                <div>
                  <p className="stake text-[0.7rem] text-limestone/65">Approx. tons</p>
                  {tons !== null ? (
                    <p className="font-display tnum mt-2 text-[clamp(2.4rem,7vw,4rem)]">{valid ? fmt(tons) : "0.0"}</p>
                  ) : (
                    <p className="mt-3 text-[0.95rem] leading-snug text-limestone/75">Mulch goes by the yard, not the ton.</p>
                  )}
                </div>
              </div>
              {bigJob ? (
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-green/50 bg-green/10 px-3 py-1.5 text-sm text-limestone">
                  <span className="size-1.5 rounded-full bg-green" aria-hidden="true" />
                  That&apos;s about the size of our latest millings job.
                </p>
              ) : null}
            </div>

            <p className="mt-4 text-sm text-muted-light">
              Rough estimate using industry averages. {business.ownerFirst} confirms the exact amount and delivery.
            </p>

            <EstimateButton className="mt-6 w-full sm:w-auto" size="lg" prefill={{ services: ["Material Delivery"], notes }} />
          </div>
        </div>
      </div>
    </section>
  );
}
