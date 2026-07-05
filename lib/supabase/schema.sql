-- InCareList.com initial schema
-- Run this in the Supabase SQL editor once a project is created.
--
-- InCareList is state-only (no city layer) and every provider belongs to
-- exactly one of 17 fixed categories, so this schema is flatter than a
-- multi-category facility model: one join to states, one join to
-- categories, and insurance is a plain text[] column rather than a
-- many-to-many join table.

create table if not exists states (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table if not exists providers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id), -- set once claimed
  name text not null,
  slug text not null unique,
  state_id uuid not null references states(id),
  category_id uuid not null references categories(id),
  address text not null,
  zip text not null,
  phone text,
  website text,
  description text,
  services_offered text[] not null default '{}',
  insurance_accepted text[] not null default '{}',
  hours_of_operation text,
  contact_form_enabled boolean not null default false,
  contact_email text, -- where "Send a message" submissions on the profile are delivered
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  image_url text,
  logo_url text,
  gallery_urls text[] not null default '{}',
  lat double precision,
  lng double precision,
  verified boolean not null default false,
  featured boolean not null default false,
  claimed boolean not null default false,
  is_premium boolean not null default false,
  premium_tier text, -- 'premium' | null (matches lib/pricing.ts PlanId)
  premium_expires_at timestamptz,
  source text not null default 'seed', -- 'seed' | 'self_submitted' | 'admin'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists provider_claims (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references providers(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending', -- pending | approved | rejected
  verification_notes text,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references providers(id) on delete cascade,
  plan text not null default 'premium', -- single tier for now (lib/pricing.ts)
  payment_provider text not null default 'stripe', -- 'stripe' | 'paypal'
  stripe_customer_id text,
  stripe_subscription_id text,
  paypal_subscription_id text,
  status text not null default 'inactive', -- active | past_due | canceled | inactive
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

-- "Create your free profile" — for providers not already in the directory.
-- Reviewed manually, same as claims. On approval, an admin creates the real
-- providers row and this becomes 'approved'.
create table if not exists provider_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending', -- pending | approved | rejected
  provider_name text not null,
  category_slug text not null,
  state_slug text not null,
  address text not null,
  zip text not null,
  phone text not null,
  website text,
  description text,
  insurance_types text[] not null default '{}',
  submitter_name text not null,
  submitter_role text not null,
  submitter_email text not null,
  submitter_phone text not null,
  created_provider_id uuid references providers(id), -- set once approved
  created_at timestamptz not null default now()
);

create index if not exists idx_providers_state on providers(state_id);
create index if not exists idx_providers_category on providers(category_id);
create index if not exists idx_providers_featured on providers(featured) where featured = true;

-- states and categories are plain public reference data (the state
-- dropdown, category grid) — RLS is enabled with an explicit "anyone can
-- read" policy so this is a deliberate choice, not an accidental gap that
-- Supabase's "enable RLS" prompt might otherwise lock down with zero
-- policies (which would break the state/category pickers site-wide).
alter table states enable row level security;

create policy "Public can read states"
  on states for select
  using (true);

alter table categories enable row level security;

create policy "Public can read categories"
  on categories for select
  using (true);

-- subscriptions holds billing-adjacent data with no end-user-facing reads
-- or writes yet (that all goes through the service role key once Stripe
-- is wired up) — RLS enabled with zero policies is correct here: it
-- blocks all anon/authenticated access by default.
alter table subscriptions enable row level security;

-- Row Level Security: public read on profile data, owner-only writes.
alter table providers enable row level security;

create policy "Public can read providers"
  on providers for select
  using (true);

create policy "Owners can update their claimed provider"
  on providers for update
  using (auth.uid() = owner_id);

alter table provider_claims enable row level security;

create policy "Users can submit their own claim"
  on provider_claims for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own claims"
  on provider_claims for select
  using (auth.uid() = user_id);

-- Admin approve/reject happens via the service role key (lib/supabase/admin.ts),
-- which bypasses RLS entirely — no admin-specific policy needed here.

alter table provider_submissions enable row level security;

create policy "Users can submit a new provider"
  on provider_submissions for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own submissions"
  on provider_submissions for select
  using (auth.uid() = user_id);

-- Admin approve/reject happens via the service role key and bypasses RLS,
-- same as provider_claims.
