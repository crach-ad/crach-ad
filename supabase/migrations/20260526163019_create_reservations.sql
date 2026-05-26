-- Reservations for the STEM Skill Development 2-pager.
-- Anonymous browsers can INSERT (form submission). Only authenticated admins
-- can SELECT/UPDATE/DELETE — the anon key is publicly exposed in the page,
-- so RLS is the only thing standing between you and a data dump.

create table public.reservations (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  student_name    text not null,
  student_grade   text not null,
  parent_name     text not null,
  parent_email    text not null,
  parent_phone    text not null,

  heard_from      text,
  needs           text,
  notes           text,

  constraint reservations_email_format
    check (parent_email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')
);

create index reservations_created_at_idx on public.reservations (created_at desc);

alter table public.reservations enable row level security;

-- Public form submissions.
create policy "anon can insert reservations"
  on public.reservations
  for insert
  to anon
  with check (true);

-- No SELECT/UPDATE/DELETE policies → those operations are denied for anon and
-- authenticated by default. The service-role key (used in the dashboard / from
-- a server) bypasses RLS, so you can view rows there.
