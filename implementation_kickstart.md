# Karmel Trucking & Excavating: Implementation Kickstart

Concept spec site for Karmel Trucking & Excavating LLC (Mechanicsville, MD), built by Lee Enterprises Unlimited.
Single conversion goal: **Free Estimate** request. Front end only, no backend.

Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion + lucide-react. Images via `sharp` → webp.

Rules that apply to every phase:
- Only the real photos from the Drive folder. No stock, no AI images.
- Only verified business facts. Anything unverified goes in `CONFIRM.md` (shown normally in the UI).
- One CTA label everywhere: "Get a Free Estimate" (nav button reads "Free Estimate").
- No em dashes or "--" in site copy. No "Apex / elevate / unlock / seamless / solutions".
- 2 fonts (Archivo display, Public Sans body). 3 colours (asphalt, limestone, karmel green) plus neutrals.
- Heavy motion only in the hero and the Process section. Everything else: 12px / 400ms fade-up, once.
- Respect `prefers-reduced-motion` everywhere. Visible 2px green focus rings.
- Components in `components/sections/*`, each file 400 to 600 lines max.

---

## Phase 0: Setup and assets
- [x] Download all 40 files from Drive folder `16DAGt_AJF6XHMANvsaUZ2Hj0MTtRwSNG` into `public/images/raw/` with exact names
- [x] Create `implementation_kickstart.md` (this file) and `CONFIRM.md`; commit before UI
- [x] `scripts/optimize-images.mjs` (sharp): webp q80 at 480 / 828 / 1200, never upscale past source
- [x] Sample the logo green and lock the colour token

## Phase 1: Scaffold, tokens, Nav, Hero
_Review notes: fixed unlayered `.photo` CSS overriding `absolute` (photos collapsed), tightened headline size so THE EARTH holds one line at 1440, nowrap mobile nav CTA, added survey coordinates tag._
- [x] Next.js scaffold, Tailwind tokens (`--asphalt`, `--limestone`, `--karmel-green`, neutrals), 8px grid, 6px radius
- [x] Fonts via `next/font/google`: Archivo (900, stretch 125%), Public Sans (400/500/600), tabular numbers
- [x] SVG wordmark (KARMEL + TRUCKING & EXCAVATING + green rule), K monogram favicon
- [x] Texture: topographic contour SVG (4 to 6% opacity), survey-stake section labels, film grain (3%)
- [x] Image data module with alt text for every photo ("... in Southern Maryland")
- [x] Nav: sticky, transparent over hero then solid after 80px; anchors; phone link; Free Estimate button; mobile full-screen sheet
- [x] Hero: 55/45 split, photo crossfade 01 → 03 → 05 every 6s with 1.05 drift, slot-roll headline (CLEAR IT. / GRADE IT. / DRAIN IT. / HAUL IT.), sub, CTA, trust row, "latest job" ticket card; mobile photo on top at 60vh
- [x] `npm run dev`, Playwright screenshots at 1440 and 390, critical review, improve

## Phase 2: Services, Before/After, Process
- [x] Proof marquee (7 Facebook reviewer names + stars, slow, pause on hover)
- [x] Services: 3 featured cards (Land Clearing 05, Grading & Drainage 20, Driveways & Millings 07)
- [x] Secondary grid of 8 (Excavation & Footings 31, Demolition 26, Pool Removal & Fill 18, Pads 27, Trenching 23, Stump Grinding 04, Perc Testing icon only, Bulk Material Delivery 06)
- [x] "Also:" line (Snow plowing 36, Seasonal lawn care)
- [x] Service "Learn more" modal: 3 bullet reasons + CTA (no redirects, no prices)
- [x] Before/After slider 15 ↔ 17, keyboard + labelled range input, green grip handle
- [x] Before / During / After frames (15, 16, 18) and Wayne E. Thumbtack mini case study; CTA
- [x] Process: pinned ~250vh on desktop, green cut line drawn by scroll, photo per step (03, 11, 13, 20, 09); mobile vertical timeline; reduced-motion fallback

## Phase 3: Our Work, Calculator, Reviews
_Review notes: gallery capped at 12 with "Show all" (it was 5,300px tall at desktop); Thumbtack score links to their real profile._
- [x] Filter chips: All, Land Clearing, Grading & Pads, Drainage, Driveways, Pools, Demolition, Hardscape
- [x] Masonry grid of photos 01 to 37, lazy webp
- [x] Lightbox: swipe, arrow keys, Esc, caption + category
- [x] 2 pinned featured tiles: "Erosion stopped for good" (25, Amanda M.) and "The drainage problem 5 other companies missed" (29, Erin T.)
- [x] Calculator: material select, L/W/depth with presets 2/3/4/6, cubic yards + tons (factors 1.4 / 1.4 / 1.3 / 1.2, mulch yards only), 10% toggle, small print, prefilled CTA, 40-ton easter egg chip
- [x] Reviews: giant Erin T. pull quote with "Only company out of 6" in green; 6 review cards with initial avatars; score tiles (100% Facebook, 4.6 Thumbtack) with source links; CTA

## Phase 4: Area, FAQ, CTA band, Contact, Footer, /contact, /ai
- [ ] Service area: grayscale Google Maps iframe (no key) + green pin; ZIP checker (206/207); town chips
- [ ] FAQ accordion (8 items)
- [ ] Final CTA band: photo 02, dark overlay, max 70vh, "GOT DIRT THAT NEEDS MOVING?"
- [ ] "Still have questions?" block: phone, email, Facebook, 3-field form with success state
- [ ] Footer: wordmark, description, NAP, email, Facebook, anchors, payment methods, © 2026, "Concept preview by Lee Enterprises Unlimited."
- [ ] `/contact`: hero strip, inline estimate form, map, NAP, CTA band, footer; lands at top
- [ ] `/ai`: plain semantic facts page

## Phase 5: Estimate modal
- [ ] 4 steps with green progress bar and slide transitions: needs (multi-select tiles), property, timing (+ photo previews, notes), your info
- [ ] Esc / overlay close, focus trap, friendly inline validation
- [ ] Success screen + "Call now"; `TODO` for n8n webhook
- [ ] Wired to every CTA (nav, hero, after proof sections, calculator prefill, final band, contact page)

## Phase 6: Metadata, SEO, QA
- [ ] Title, description, canonical, Open Graph, Twitter `summary_large_image`
- [ ] `og-image.png` 1200×630 (photo 02 + wordmark + "Free Estimates · (240) 412-7476"), favicon, `apple-touch-icon.png`
- [ ] `noindex, nofollow` robots (comment: remove at launch)
- [ ] LocalBusiness + GeneralContractor JSON-LD site-wide (aggregateRating only with a cited source)
- [ ] One H1, H2 per section
- [ ] Lighthouse mobile ≥ 90 on all four categories; fix what it flags
- [ ] Contrast AA (darker green for text on light backgrounds)
- [ ] Responsive pass at 375 / 768 / 1024 / 1440 with screenshots, no horizontal scroll

## Final self-review
- [ ] Only real photos from the Drive folder; zero stock or AI images
- [ ] Every fact traces to VERIFIED BUSINESS FACTS; all [CONFIRM] items listed in CONFIRM.md
- [ ] One CTA ("Get a Free Estimate"), working from the nav, hero, after the proof sections, the final band and the contact page
- [ ] No em dashes or "--" in the copy; 2 fonts; 3 colours; motion only in hero + process
- [ ] Footer present with the concept line; noindex set
- [ ] Lighthouse ≥ 90 mobile; 375px looks deliberate, not squeezed

## Ship
- [ ] Push to GitHub
- [ ] Deploy on Vercel via Git import, confirm READY, share URL
