-- Human in the Loop — adult-professional cohort registrations.
-- Mirrors the reservations pattern: nobody writes to the table directly;
-- public traffic goes through submit_hitl_registration() (SECURITY DEFINER),
-- which validates and inserts. RLS stays on with no anon policies; admins
-- read via the service-role key / dashboard.

create table public.hitl_registrations (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  full_name       text not null,
  email           text not null,
  phone           text not null,
  organization    text not null,
  role            text not null,
  ai_experience   text not null,
  goals           text,
  heard_from      text,

  constraint hitl_email_format
    check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  constraint hitl_ai_experience_values
    check (ai_experience in ('none', 'some', 'heavy'))
);

create index hitl_registrations_created_at_idx
  on public.hitl_registrations (created_at desc);

alter table public.hitl_registrations enable row level security;
-- (No anon-facing policies. Writes go through the RPC below.)

create or replace function public.submit_hitl_registration(
  p_full_name      text,
  p_email          text,
  p_phone          text,
  p_organization   text,
  p_role           text,
  p_ai_experience  text,
  p_goals          text default null,
  p_heard_from     text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog
as $$
declare
  v_id    uuid;
  v_name  text;
  v_email text;
  v_phone text;
  v_org   text;
  v_role  text;
  v_exp   text;
begin
  v_name  := nullif(btrim(p_full_name), '');
  v_email := nullif(btrim(p_email), '');
  v_phone := nullif(btrim(p_phone), '');
  v_org   := nullif(btrim(p_organization), '');
  v_role  := nullif(btrim(p_role), '');
  v_exp   := nullif(btrim(p_ai_experience), '');

  if v_name  is null then return jsonb_build_object('ok', false, 'error', 'Name is required.'); end if;
  if v_email is null or v_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    return jsonb_build_object('ok', false, 'error', 'A valid email is required.');
  end if;
  if v_phone is null then return jsonb_build_object('ok', false, 'error', 'Phone is required.'); end if;
  if v_org   is null then return jsonb_build_object('ok', false, 'error', 'Organization is required.'); end if;
  if v_role  is null then return jsonb_build_object('ok', false, 'error', 'Role / title is required.'); end if;
  if v_exp not in ('none', 'some', 'heavy') then
    return jsonb_build_object('ok', false, 'error', 'AI experience must be one of: none, some, heavy.');
  end if;

  if length(v_name)  > 200 or length(v_email) > 200 or length(v_phone) > 60
     or length(v_org) > 200 or length(v_role) > 200
     or coalesce(length(p_goals), 0)      > 4000
     or coalesce(length(p_heard_from), 0) > 500 then
    return jsonb_build_object('ok', false, 'error', 'One or more fields exceeded the allowed length.');
  end if;

  insert into public.hitl_registrations
    (full_name, email, phone, organization, role, ai_experience, goals, heard_from)
  values
    (v_name, v_email, v_phone, v_org, v_role, v_exp,
     nullif(btrim(p_goals), ''),
     nullif(btrim(p_heard_from), ''))
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

revoke all on function public.submit_hitl_registration(text, text, text, text, text, text, text, text) from public;
grant execute on function public.submit_hitl_registration(text, text, text, text, text, text, text, text) to anon, authenticated;

notify pgrst, 'reload schema';
