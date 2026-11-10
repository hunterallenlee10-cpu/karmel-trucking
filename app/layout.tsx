import type { Metadata, Viewport } from "next";
import { Public_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/Providers";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Display face: Archivo Black at 125% width, the only style the design uses.
// It is the exact Google Fonts instance (fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,900,
// latin subset), self-hosted through next/font/local because next/font/google cannot request a
// single weight together with the width axis. 14 KB instead of the 88 KB full variable font.
const archivo = localFont({
  src: "./fonts/archivo-900-expanded-latin.woff2",
  weight: "900",
  style: "normal",
  declarations: [{ prop: "font-stretch", value: "125%" }],
  variable: "--font-archivo",
  display: "swap",
  fallback: ["Arial Black", "system-ui", "sans-serif"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const title = "Karmel Trucking & Excavating | Land Clearing, Grading & Drainage in Mechanicsville, MD";
const description =
  "Land clearing, grading, drainage, demolition and bulk stone, millings and topsoil delivery in Southern Maryland. Free estimates. Call (240) 412-7476.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  // Concept preview: keep it out of search so it never competes with anything real.
  // REMOVE this robots block at launch.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Karmel Trucking & Excavating",
    title,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Karmel Trucking & Excavating. Free Estimates. (240) 412-7476" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#121412",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" data-scroll-behavior="smooth" className={`${archivo.variable} ${publicSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[200] rounded-[var(--radius)] bg-green px-4 py-3 font-semibold text-asphalt focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
