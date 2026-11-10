import { ArrowUpRight, Star } from "lucide-react";
import { business, proof, reviews } from "@/lib/site";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { Reveal } from "@/components/ui/Reveal";
import { StakeLabel } from "@/components/ui/StakeLabel";

const HIGHLIGHT = "Only company out of 6";

export function Reviews() {
  const [hero, ...rest] = reviews; // Erin T. first
  const [pre, post] = hero.text.split(HIGHLIGHT);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative bg-asphalt py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <StakeLabel num="06">Reviews</StakeLabel>
        <h2 id="reviews-title" className="sr-only">
          What customers say
        </h2>

        {/* Giant pull quote */}
        <Reveal>
          <figure className="mt-10 max-w-[68rem]">
            <span aria-hidden="true" className="font-display block text-[6rem] leading-[0.6] text-green sm:text-[8rem]">
              &ldquo;
            </span>
            <blockquote
              className="mt-2 text-[clamp(1.55rem,3.4vw,3.1rem)] leading-[1.12] font-extrabold tracking-[-0.015em] text-limestone"
              style={{ fontFamily: "var(--font-archivo)", fontStretch: "110%" }}
            >
              <p>
                {pre}
                <mark className="bg-transparent text-green">{HIGHLIGHT}</mark>
                {post}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <Avatar name={hero.name} large />
              <span>
                <span className="block font-semibold">{hero.name}</span>
                <span className="text-sm text-limestone/65">Recommends on Facebook</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Score tiles */}
        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
          <ScoreTile
            big={proof.facebook.recommend}
            label="recommend"
            source={`Facebook · ${proof.facebook.reviews} reviews`}
            href={business.facebook}
          />
          <ScoreTile big={proof.thumbtack.rating} label="out of 5" source={`Thumbtack · ${proof.thumbtack.reviews} reviews`} href={business.thumbtack} stars />
        </div>

        {/* The other six */}
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((r, i) => (
            <Reveal as="li" key={r.name} delay={(i % 3) * 0.05}>
              <figure className="flex h-full flex-col rounded-[var(--radius)] border border-line-dark bg-card-dark p-6">
                <blockquote className="text-[1.02rem] leading-relaxed text-limestone/90">
                  <p>&ldquo;{r.text}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-6">
                  <Avatar name={r.name} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{r.name}</span>
                    {r.date ? <span className="tnum text-sm text-limestone/60">{r.date}</span> : null}
                  </span>
                  <span className="stake rounded-[4px] border border-line-dark px-2 py-1 text-[0.62rem] text-limestone/70">{r.source}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <EstimateButton size="lg" className="w-full sm:w-auto" />
          <p className="text-limestone/70">Be the next yard on this list.</p>
        </div>
      </div>
    </section>
  );
}

function Avatar({ name, large }: { name: string; large?: boolean }) {
  const initials = name
    .replace(".", "")
    .split(" ")
    .map((s) => s[0])
    .join("");
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-limestone font-bold text-asphalt ${large ? "size-14 text-lg" : "size-10 text-sm"}`}
    >
      {initials}
    </span>
  );
}

function ScoreTile({ big, label, source, href, stars }: { big: string; label: string; source: string; href: string; stars?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-end justify-between gap-4 rounded-[var(--radius)] border border-line-dark p-5 transition-colors hover:border-green/60"
    >
      <span>
        <span className="flex items-baseline gap-2">
          <span className="font-display tnum text-[3rem] text-green">{big}</span>
          <span className="text-limestone/70">{label}</span>
        </span>
        <span className="mt-2 flex items-center gap-2 text-sm text-limestone/75">
          {stars ? (
            <span className="flex" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className={`size-3.5 ${i < 4 ? "fill-green text-green" : "fill-green/40 text-green"}`} />
              ))}
            </span>
          ) : null}
          {source}
        </span>
      </span>
      <ArrowUpRight className="size-5 text-limestone/50 transition group-hover:text-green" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
