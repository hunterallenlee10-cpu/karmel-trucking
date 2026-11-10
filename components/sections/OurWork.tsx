"use client";

import { Expand, Quote } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryFilters, p, photos } from "@/lib/photos";
import { Reveal } from "@/components/ui/Reveal";
import { StakeLabel } from "@/components/ui/StakeLabel";
import { Lightbox } from "./Lightbox";

type Filter = (typeof galleryFilters)[number];

const FEATURED = [
  {
    photo: p("25"),
    title: "Erosion stopped for good",
    quote: "I was having serious erosion problems and James designed the perfect system to stop it.",
    who: "Amanda M.",
    detail: "Drainage pipes, leveled land, railroad ties and seed matting.",
  },
  {
    photo: p("29"),
    title: "The drainage problem 5 other companies missed",
    quote: "Only company out of 6 that noticed a problem w/ water drainage where I wanted to put my pool.",
    who: "Erin T.",
    detail: "Fixed while the crew was there for a different job.",
  },
];

export function OurWork() {
  const [filter, setFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);
  const [viewer, setViewer] = useState<{ list: typeof photos; index: number } | null>(null);

  const visible = useMemo(() => (filter === "All" ? photos : photos.filter((ph) => ph.category === filter)), [filter]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: photos.length };
    for (const ph of photos) c[ph.category] = (c[ph.category] ?? 0) + 1;
    return c;
  }, []);

  const LIMIT = 12;
  const capped = filter === "All" && !showAll && visible.length > LIMIT;
  const shown = capped ? visible.slice(0, LIMIT) : visible;

  const openPhoto = (id: string, list = visible) => {
    const i = list.findIndex((ph) => ph.id === id);
    setViewer({ list, index: Math.max(0, i) });
  };

  return (
    <section id="work" aria-labelledby="work-title" className="contour bg-asphalt py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <StakeLabel num="04">Our work</StakeLabel>
            <h2 id="work-title" className="font-display mt-5 text-[clamp(2.2rem,6.4vw,4.75rem)]">
              Dirt we&apos;ve moved
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-limestone/75 lg:col-span-4 lg:pb-2">
            Every photo here is a real job site. No stock photos, no renderings.
          </p>
        </div>

        {/* Two pinned featured projects */}
        <ul className="mt-14 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {FEATURED.map((f) => (
            <Reveal as="li" key={f.title}>
              <article className="grid h-full overflow-hidden rounded-[var(--radius)] border border-line-dark bg-card-dark sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <button
                  type="button"
                  onClick={() => openPhoto(f.photo.id, photos)}
                  className="group photo relative aspect-[4/3] sm:aspect-auto sm:min-h-[340px]"
                  aria-label={`View photo: ${f.photo.caption}`}
                >
                  <Image
                    src={f.photo.src}
                    alt={f.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="stake absolute top-3 left-3 rounded-[4px] bg-green px-2 py-1 text-[0.65rem] text-asphalt">Featured</span>
                </button>
                <div className="flex flex-col p-6 sm:p-7">
                  <h3 className="font-display text-[1.6rem] sm:text-[1.85rem]">{f.title}</h3>
                  <blockquote className="mt-5 flex gap-3 text-limestone/90">
                    <Quote className="mt-1 size-5 shrink-0 text-green" aria-hidden="true" />
                    <p className="text-[1.05rem] leading-relaxed">{f.quote}</p>
                  </blockquote>
                  <p className="mt-auto border-t border-line-dark pt-4 text-sm text-limestone/70">
                    <span className="font-semibold text-limestone">{f.who}</span>, Facebook · {f.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Filters */}
        <div role="group" aria-label="Filter photos by job type" className="-mx-4 mt-16 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {galleryFilters.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  on ? "border-green bg-green text-asphalt" : "border-line-dark text-limestone/85 hover:border-limestone/40 hover:text-limestone"
                }`}
              >
                {f}
                <span className={`tnum text-xs ${on ? "text-asphalt/70" : "text-limestone/50"}`}>{counts[f] ?? 0}</span>
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} photos{filter === "All" ? "" : ` of ${filter}`}.
        </p>

        {/* Masonry */}
        <ul key={filter} className="mt-6 columns-2 gap-3 md:columns-3 lg:columns-4 [&>li]:mb-3">
          {shown.map((ph) => (
            <li key={ph.id} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => openPhoto(ph.id)}
                className="group photo relative block w-full overflow-hidden rounded-[var(--radius)] bg-card-dark"
                aria-label={`View photo: ${ph.caption}`}
              >
                <Image
                  src={ph.src}
                  alt={ph.alt}
                  width={ph.width}
                  height={ph.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-asphalt/90 to-transparent p-3 pt-10 text-left text-[0.82rem] leading-snug text-limestone opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span>{ph.caption}</span>
                  <Expand className="size-4 shrink-0 text-green" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
        {capped ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex h-12 items-center gap-2 rounded-[var(--radius)] border border-limestone/30 px-6 font-semibold text-limestone transition-colors hover:border-green hover:text-green"
            >
              Show all <span className="tnum">{visible.length}</span> photos
            </button>
          </div>
        ) : null}
      </div>

      <Lightbox
        photos={viewer?.list ?? photos}
        index={viewer?.index ?? null}
        onIndex={(i) => setViewer((v) => (v ? { ...v, index: i } : v))}
        onClose={() => setViewer(null)}
      />
    </section>
  );
}
