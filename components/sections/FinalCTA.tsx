import Image from "next/image";
import { business } from "@/lib/site";
import { p } from "@/lib/photos";
import { EstimateButton } from "@/components/ui/EstimateButton";

export function FinalCTA() {
  const ph = p("02");
  return (
    <section aria-labelledby="cta-title" className="photo relative flex min-h-[480px] items-center overflow-hidden bg-asphalt py-24 lg:h-[70vh] lg:max-h-[760px]">
      <Image src={ph.src} alt={ph.alt} fill sizes="100vw" className="object-cover object-[50%_60%]" />
      <div aria-hidden="true" className="absolute inset-0 bg-asphalt/72" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-asphalt/80 via-asphalt/30 to-transparent" />
      <div className="wrap relative">
        <h2 id="cta-title" className="font-display max-w-4xl text-[clamp(2.5rem,7.4vw,6.25rem)]">
          Got dirt that <span className="text-green">needs moving?</span>
        </h2>
        <div className="mt-10 flex flex-col items-start gap-4">
          <EstimateButton size="lg" className="w-full sm:w-auto" />
          <p className="text-limestone/80">
            Or call {business.ownerFirst}:{" "}
            <a href={business.phoneHref} className="tnum font-semibold text-limestone underline-offset-4 hover:underline">
              {business.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
