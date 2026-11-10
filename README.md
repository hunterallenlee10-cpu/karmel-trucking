# Karmel Trucking & Excavating: concept site

Front-end-only spec site for Karmel Trucking & Excavating LLC (Mechanicsville, MD), built by Lee Enterprises Unlimited.
Single goal: get a **Free Estimate** request.

- `implementation_kickstart.md`: the phased build checklist
- `CONFIRM.md`: every claim, photo and setting that needs James's sign-off before launch

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Framer Motion · lucide-react. No backend.

## Photos

Real job photos only, from the "Karmel Trucking Website Assets" Drive folder, kept with their original names in
`public/images/raw/`. `npm run images` (sharp) writes webp at quality 80 in 240 / 480 / 640 / 828 / 1200 widths,
never upscaling, plus `lib/image-manifest.json`. `lib/image-loader.ts` maps each `next/image` srcset width to the
nearest pre-built file, so the site needs no runtime image optimization.

`node scripts/make-og.mjs` (dev server running) regenerates `public/og-image.png`.

## Where things live

| Path | What |
|---|---|
| `lib/site.ts` | Verified business facts, reviews, towns. The only source for facts on the site |
| `lib/photos.ts` | Photo registry: alt text, captions, gallery categories |
| `lib/services.ts` | Service cards and modal copy |
| `components/sections/*` | One file per page section |
| `components/estimate/*` | The 4-step estimate form, used in the modal and inline on `/contact` |
| `lib/submit.ts` | Form submit stubs. `TODO`: wire to the n8n webhook at launch |
| `app/ai/page.tsx` | Plain, machine-readable facts page |

## Before launch

- Remove the `robots` noindex block in `app/layout.tsx`
- Point `SITE_URL` in `lib/site.ts` at the real domain
- Wire `lib/submit.ts` to the webhook
- Clear every item in `CONFIRM.md`
