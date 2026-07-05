# InCareList — Nationwide Behavioral Health & Care Provider Directory

A directory of therapists, psychiatrists, treatment centers, senior living
communities, and home/hospice care agencies, organized by state across the
United States. Built on the same foundation as Sobrup (Next.js + Supabase,
mock-data fallback), redesigned for InCareList's broader scope: 17
categories under one unified `Provider` model instead of a facility/
therapist split, state-only geography (no city layer), and white/orange
branding.

## What's built

- Homepage, `/browse`, `/categories`, and provider profile pages read
  through `lib/data/providers.ts` — real Supabase data if it's connected,
  mock data (`lib/mock-data.ts`) if it isn't. Nothing breaks either way.
- `/[state]/[category]/[provider]` — provider profile page with SEO
  metadata, breadcrumbs, JSON-LD `LocalBusiness` structured data, and a
  claim-profile CTA
- **Search** — state selector, free-text name/business search, and category
  filter, all combinable on `/browse`. Empty results show a clear CTA:
  "Don't see your practice or facility? Create your free professional
  profile."
- **Claim-profile flow (manual review, no auto-verification yet):**
  - `/sign-in` — magic-link auth (no password), via Supabase Auth
  - `/auth/callback` — exchanges the magic-link code for a session
  - `/claim?provider=slug` — claim form; requires sign-in; blocks
    re-claiming an already-claimed profile
  - `/dashboard` — shows the signed-in user's claim(s) and status, with an
    "Edit profile" link once approved
  - `/admin/claims` — manual review queue; approve/reject sets
    `providers.owner_id` and `claimed = true`. Gated by `ADMIN_EMAILS`
- **Edit-profile flow:**
  - `/dashboard/provider/[slug]` — owner-only edit form (phone, website,
    address, ZIP, logo, cover image, description, services offered,
    insurance accepted, hours, social links). Enforced by Postgres RLS
    (`owner_id = auth.uid()`), not just app-level checks.
- **Create-your-free-profile flow (for providers missing from the directory):**
  - `/add-profile` — public form (category + state dropdowns, address,
    phone, insurance), linked from `/browse` (empty-results state and
    below normal results), the homepage, and the navbar. Auth-gated like
    claiming.
  - `/admin/submissions` — manual review queue. Approving creates the real
    `providers` row and sets the submitter as owner immediately.
- **Contact form delivery** — Premium profiles with a contact email on file
  show a "Send a message" button (`/contact/[slug]`) that emails the
  provider directly via Resend, with reply-to set to the sender so the
  provider can just hit reply. Enforced server-side
  (`lib/actions/contact.ts`) — a profile only gets a working contact form
  if it's actually Premium and has `contact_email` set, regardless of what
  the request claims. Providers set their delivery email from
  `/dashboard/provider/[slug]`. Uses the same `RESEND_API_KEY` already
  used for admin notifications — no second email provider needed.
- **Google Maps integration** — Premium profiles show an embedded map
  (`components/ProviderMap.tsx`) built from the provider's address via the
  Maps Embed API. Reads `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`; if it's not set,
  the map section simply doesn't render — the rest of the profile still
  works fine.
- **Pricing page (`/for-providers`)** — Free vs. Premium ($149/year)
  comparison, defined in `lib/pricing.ts` (single source of truth for both
  the page and, later, Stripe/PayPal product setup). Only lists features
  InCareList can currently deliver — no aspirational claims. No real
  billing yet — CTAs route into the claim form with the chosen plan
  attached, so it shows up in the claim notes an admin reviews by hand.
- Data model (`lib/supabase/schema.sql`) with RLS on every writable table,
  plus `premium_tier` on providers and `plan`/`payment_provider` on
  subscriptions so Stripe and/or PayPal can slot in later without a schema
  change.
- `lib/supabase/seed.sql` — seeds all 50 states + DC, all 17 categories,
  and one sample provider per category (matching `lib/mock-data.ts`), so
  the whole claim → approve → edit loop is testable against a real
  database from the start.

## The 17 categories

Therapists · Psychologists · Psychiatrists · Mental Health Clinics ·
Substance Use Treatment Centers · Detox Centers · Sober Living Homes ·
Intensive Outpatient Programs (IOP) · Partial Hospitalization Programs
(PHP) · Residential Treatment Centers · Assisted Living Facilities ·
Memory Care Communities · Independent Senior Living · Skilled Nursing
Facilities · Hospice Providers · Home Health Agencies · Case Management
Services

## Not built yet (next slices)

- Real Stripe and/or PayPal checkout + webhooks (pricing page UI exists,
  billing itself does not — see `lib/pricing.ts` and `/for-providers`)
- Photo/logo/gallery upload via Supabase Storage (edit form currently
  takes an image URL rather than a file upload)
- Real provider data beyond the 17 seeded samples — populate `providers`
  from licensing/public datasets per category, similar to how Sobrup
  imported SAMHSA data for California treatment facilities
- Blog
- Automated claim verification (email-domain matching, phone verification)

## A note on legal considerations

Not legal advice, but worth flagging before launch:

- Facts (name, address, phone, license number/status if public) aren't
  copyrightable (*Feist v. Rural Telephone*, 1991) — this is why
  directories like this are legal to seed with public data. Don't copy
  another site's written descriptions, photos, or reviews.
- Several states have patient brokering laws restricting payment tied to
  referring someone into substance-use treatment. Flat annual listing fees
  (what's built here) are generally the safer structure versus per-lead
  pricing — confirm with a healthcare/marketing attorney, especially once
  the contact form starts routing real inquiries.
- Google, Meta, and Bing require LegitScript certification before you can
  advertise addiction-treatment content on their platforms.
- Senior living and home health categories may have their own state-level
  advertising/licensing disclosure rules — worth a pass with an attorney
  familiar with elder-care marketing before launch, separate from the
  behavioral-health considerations above.

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000

The app works out of the box with no environment variables — it reads from
`lib/mock-data.ts`. To connect real data:

1. Create a Supabase project
2. Run `lib/supabase/schema.sql` in the Supabase SQL editor, then
   `lib/supabase/seed.sql` for matching sample data across all 17
   categories
3. Copy `.env.example` to `.env.local` and fill in your Supabase keys
   (including `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_EMAILS` if you want to
   test the `/admin/claims` queue)
4. In Supabase → Authentication → URL Configuration, add
   `http://localhost:3000/auth/callback` (and your production URL later) to
   the allowed redirect URLs — magic links won't work without this
5. Restart `npm run dev` — the homepage, browse, and provider pages will
   automatically start reading from Supabase instead of mock data

See `DEPLOYMENT.md` for the full step-by-step to get this live on Netlify.

## Design notes

- Palette: white canvas with a confident, energetic orange (`#F0621D`) as
  the sole accent — deliberately avoiding both the generic "medical blue"
  look and the warm-cream/terracotta AI-default look
- Type: Sora (display/headings) + Inter (body/UI) + IBM Plex Mono (small
  utility labels, category eyebrows)
- Signature element: a quiet orange "thread" motif connecting points in the
  hero and category grid — representing the full continuum of care this
  directory covers, from a first therapy session to home health, used once
  and restrained
