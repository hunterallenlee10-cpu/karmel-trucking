import { Star } from "lucide-react";
import { reviews } from "@/lib/site";

/** Slim strip of the 7 Facebook reviewers. Slow, pauses on hover. */
export function ProofMarquee() {
  const items = reviews.filter((r) => r.source === "Facebook");
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((r) => (
        <li key={r.name} className="flex items-center gap-3 px-7 whitespace-nowrap">
          <Star className="size-3.5 fill-green text-green" aria-hidden="true" />
          <span className="font-semibold text-limestone">{r.name}</span>
          <span className="text-limestone/60">recommends Karmel</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Facebook recommendations" className="marquee relative overflow-hidden border-y border-line-dark bg-asphalt py-4 text-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-asphalt to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-asphalt to-transparent" aria-hidden="true" />
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
