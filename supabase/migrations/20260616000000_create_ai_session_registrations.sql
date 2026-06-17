-- AI Sessions with CRACHAD — paid 1-on-1 AI training registrations.
-- Mirrors the camp_registrations pattern: nobody writes to the table directly;
-- public traffic goes through submit_ai_session_registration() (SECURITY DEFINER),
-- which validates and inserts. RLS stays on with no anon policies; admins read
-- via the service-role key / dashboard.

create table public.ai_session_registrations (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  full_name     text not null,
  email         text not null,
  phone         text not null,
  track         text not null,          -- business | professional | everyday
  ai_experience text not null,          -- none | some | lots
  format        text not null,          -- in_person | online
  time_slot     text not null,          -- early (5:00–6:30) | late (6:30–8:00) | either
  days          text[] not null,        -- mon..fri
  goals         text,
  heard_from    text,
  status        text not null default 'new',

  constraint ai_email_format
    check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  constraint ai_track_values
    check (track in ('business', 'professional', 'everyday')),
  constraint ai_experience_values
    check (ai_experience in ('none', 'some', 'lots')),
  constraint ai_format_values
    check (format in ('in_person', 'online')),
  constraint ai_time_slot_values
    check (time_slot in ('early', 'late', 'either')),
  constraint ai_days_nonempty
    check (array_length(days, 1) >= 1),
  constraint ai_days_values
    check (days <@ array['mon','tue','wed','thu','fri']),
  constraint ai_status_values
    check (status in ('new', 'contacted', 'confirmed', 'paid', 'cancelled'))
);

create index ai_session_registrations_created_at_idx
  on public.ai_session_registrations (created_at desc);

create index ai_session_registrations_status_idx
  on public.ai_session_registrations (status);

alter table public.ai_session_registrations enable row level security;
-- (No anon-facing policies. Writes go through the RPC below.)

create or replace function public.submit_ai_session_registration(
  p_full_name     text,
  p_email         text,
  p_phone         text,
  p_track         text,
  p_ai_experience text,
  p_format        text,
  p_time_slot     text,
  p_days          text[],
  p_goals         text default null,
  p_heard_from    text default null
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
  v_track text;
  v_exp   text;
  v_fmt   text;
  v_slot  text;
  v_days  text[];
begin
  v_name  := nullif(btrim(p_full_name), '');
  v_email := nullif(btrim(p_email), '');
  v_phone := nullif(btrim(p_phone), '');
  v_track := nullif(btrim(p_track), '');
  v_exp   := nullif(btrim(p_ai_experience), '');
  v_fmt   := nullif(btrim(p_format), '');
  v_slot  := nullif(btrim(p_time_slot), '');

  if v_name is null then return jsonb_build_object('ok', false, 'error', 'Your name is required.'); end if;
  if v_email is null or v_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    return jsonb_build_object('ok', false, 'error', 'A valid email is required.');
  end if;
  if v_phone is null then return jsonb_build_object('ok', false, 'error', 'Phone / WhatsApp is required.'); end if;
  if v_track not in ('business', 'professional', 'everyday') then
    return jsonb_build_object('ok', false, 'error', 'Please choose a track.');
  end if;
  if v_exp not in ('none', 'some', 'lots') then
    return jsonb_build_object('ok', false, 'error', 'AI experience must be one of: none, some, lots.');
  end if;
  if v_fmt not in ('in_person', 'online') then
    return jsonb_build_object('ok', false, 'error', 'Please choose a format (in person or online).');
  end if;
  if v_slot not in ('early', 'late', 'either') then
    return jsonb_build_object('ok', false, 'error', 'Please choose a time slot.');
  end if;
  if p_days is null or array_length(p_days, 1) is null then
    return jsonb_build_object('ok', false, 'error', 'Select at least one weekday.');
  end if;
  if exists (select 1 from unnest(p_days) as d where d not in ('mon','tue','wed','thu','fri')) then
    return jsonb_build_object('ok', false, 'error', 'Invalid weekday selection.');
  end if;
  -- De-duplicate and order the day selection (Mon→Fri).
  select array_agg(d order by array_position(array['mon','tue','wed','thu','fri'], d)) into v_days
  from (select distinct unnest(p_days) as d) u;

  if length(v_name) > 200 or length(v_email) > 200 or length(v_phone) > 60
     or coalesce(length(p_goals), 0)      > 4000
     or coalesce(length(p_heard_from), 0) > 500 then
    return jsonb_build_object('ok', false, 'error', 'One or more fields exceeded the allowed length.');
  end if;

  insert into public.ai_session_registrations
    (full_name, email, phone, track, ai_experience, format, time_slot, days, goals, heard_from)
  values
    (v_name, v_email, v_phone, v_track, v_exp, v_fmt, v_slot, v_days,
     nullif(btrim(p_goals), ''),
     nullif(btrim(p_heard_from), ''))
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

revoke all on function public.submit_ai_session_registration(text, text, text, text, text, text, text, text[], text, text) from public;
grant execute on function public.submit_ai_session_registration(text, text, text, text, text, text, text, text[], text, text) to anon, authenticated;

notify pgrst, 'reload schema';
