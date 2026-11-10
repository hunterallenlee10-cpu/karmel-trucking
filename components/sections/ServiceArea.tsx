"use client";

import { MapPin, Phone } from "lucide-react";
import { useId, useState } from "react";
import { business, towns } from "@/lib/site";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { StakeLabel } from "@/components/ui/StakeLabel";

export function ServiceArea() {
  const id = useId();
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<"yes" | "call" | "invalid" | null>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) return setResult("invalid");
    // CONFIRM: 206xx / 207xx as the service area rule.
    setResult(zip.startsWith("206") || zip.startsWith("207") ? "yes" : "call");
  }

  return (
    <section id="area" aria-labelledby="area-title" className="bg-limestone py-20 text-asphalt sm:py-28 lg:py-32">
      <div className="wrap">
        <StakeLabel num="07" tone="light">
          Service area
        </StakeLabel>
        <h2 id="area-title" className="font-display mt-5 text-[6.6vw] sm:text-[6.2vw] lg:text-[clamp(3rem,5.2vw,4.75rem)]">
          Based in Mechanicsville.
        </h2>
        <p className="mt-4 text-xl text-muted-light">Working across Southern Maryland.</p>
      </div>
      <div className="wrap mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <form onSubmit={check} noValidate>
            <label htmlFor={id} className="stake text-muted-light">
              Do you cover my area?
            </label>
            <div className="mt-3 flex gap-2">
              <input
                id={id}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="Your ZIP"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                  setResult(null);
                }}
                className="tnum h-14 w-full max-w-[12rem] rounded-[var(--radius)] border border-line-light bg-white/60 px-4 text-lg font-semibold placeholder:font-normal placeholder:text-muted-light focus:border-green-ink focus:outline-none"
              />
              <button type="submit" className="h-14 rounded-[var(--radius)] bg-asphalt px-6 font-semibold text-limestone transition hover:bg-black">
                Check
              </button>
            </div>
            <div aria-live="polite" className="mt-4 min-h-[1.5rem]">
              {result === "yes" ? (
                <div className="rounded-[var(--radius)] border border-green-ink/30 bg-green/10 p-5">
                  <p className="flex items-center gap-2 font-semibold">
                    <MapPin className="size-5 text-green-ink" aria-hidden="true" />
                    Yes, you&apos;re in our area. Let&apos;s talk.
                  </p>
                  <EstimateButton className="mt-4" />
                </div>
              ) : null}
              {result === "call" ? (
                <p className="flex items-center gap-2 font-semibold">
                  <Phone className="size-5 text-green-ink" aria-hidden="true" />
                  Call {business.ownerFirst} to check:{" "}
                  <a href={business.phoneHref} className="tnum underline underline-offset-4">
                    {business.phoneDisplay}
                  </a>
                </p>
              ) : null}
              {result === "invalid" ? <p className="text-[#9a3a24]">Enter a 5-digit ZIP code.</p> : null}
            </div>
          </form>

          <p className="stake mt-8 text-muted-light">Towns we work in</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {towns.map((t) => (
              <li key={t} className="rounded-full border border-line-light px-3.5 py-1.5 text-sm font-medium">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <MapEmbed className="min-h-[360px] lg:col-span-7 lg:min-h-[560px]" />
      </div>
    </section>
  );
}
