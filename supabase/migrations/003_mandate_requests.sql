-- Credit-as-a-Service intake (server inserts with service role; adjust RLS for your security model).
create table if not exists public.mandate_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  firm_name text not null,
  target_asset text,
  sector text,
  inquiry_type text not null,
  additional_context text
);

create index if not exists mandate_requests_created_at_idx
  on public.mandate_requests (created_at desc);

alter table public.mandate_requests enable row level security;

-- No policies for anon/authenticated: only service_role bypasses RLS for inserts from Next.js server action.
