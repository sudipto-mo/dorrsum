-- Run in Supabase SQL Editor after 001_linkedin_sign_ins.sql (or standalone).

create table if not exists public.google_sign_ins (
  id uuid primary key default gen_random_uuid(),
  google_sub text not null,
  email text,
  name text,
  signed_in_at timestamptz not null default now(),
  user_agent text,
  ip text
);

create index if not exists google_sign_ins_signed_in_at_idx
  on public.google_sign_ins (signed_in_at desc);

create index if not exists google_sign_ins_sub_idx
  on public.google_sign_ins (google_sub);

alter table public.google_sign_ins enable row level security;

-- Only the service role inserts via PostgREST; no anon/authenticated grants.
