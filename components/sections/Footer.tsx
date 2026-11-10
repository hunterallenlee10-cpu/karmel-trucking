import Link from "next/link";
import { business, navLinks } from "@/lib/site";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="contour border-t border-line-dark bg-asphalt pt-16 pb-10">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <Wordmark className="h-12 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-limestone/75">
              Land clearing, grading, drainage, demolition and bulk material delivery across Southern Maryland.
            </p>
            <a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-grid size-11 place-items-center rounded-full border border-line-dark text-limestone transition hover:border-green hover:text-green"
              aria-label="Karmel Trucking & Excavating on Facebook (opens in a new tab)"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="stake text-limestone/60">Visit</h2>
              <address className="mt-4 text-limestone/90 not-italic leading-relaxed">
                {business.name}
                <br />
                {business.street}
                <br />
                {business.town}, {business.state} {business.zip}
              </address>
            </div>
            <div>
              <h2 className="stake text-limestone/60">Reach us</h2>
              <ul className="mt-4 grid gap-2">
                <li>
                  <a href={business.phoneHref} className="tnum font-semibold text-limestone hover:text-green">
                    {business.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${business.email}`} className="break-all text-limestone/90 hover:text-green">
                    {business.email}
                  </a>
                </li>
              </ul>
            </div>
            <nav aria-label="Footer">
              <h2 className="stake text-limestone/60">Explore</h2>
              <ul className="mt-4 grid gap-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-limestone/90 hover:text-green">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="text-limestone/90 hover:text-green">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/ai" className="text-limestone/90 hover:text-green">
                    Company facts
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line-dark pt-6 text-sm">
          <span className="stake text-limestone/60">We accept</span>
          {business.payments.map((m) => (
            <span key={m} className="rounded-full border border-line-dark px-3 py-1 text-limestone/85">
              {m}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 text-sm text-limestone/60 sm:flex-row sm:justify-between">
          <p>© 2026 {business.name}</p>
          <p>Concept preview by Lee Enterprises Unlimited.</p>
        </div>
      </div>
    </footer>
  );
}
