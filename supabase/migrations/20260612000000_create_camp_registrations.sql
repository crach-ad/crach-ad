-- STEM Summer Camp (Cohort 01) — youth camp registrations.
-- Mirrors the hitl_registrations pattern: nobody writes to the table directly;
-- public traffic goes through submit_camp_registration() (SECURITY DEFINER),
-- which validates and inserts. RLS stays on with no anon policies; admins
-- read via the service-role key / dashboard.

create table public.camp_registrations (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  guardian_name     text not null,
  email             text not null,
  phone             text not null,
  student_name      text not null,
  student_age       int  not null,
  student_school    text not null,
  student_grade     text not null,
  weeks             text[] not null,
  coding_experience text not null,
  notes             text,
  heard_from        text,

  constraint camp_email_format
    check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  constraint camp_student_age_range
    check (student_age between 5 and 19),
  constraint camp_weeks_nonempty
    check (array_length(weeks, 1) >= 1),
  constraint camp_weeks_values
    check (weeks <@ array['w1','w2','w3','w4','w5','w6']),
  constraint camp_coding_experience_values
    check (coding_experience in ('none', 'some', 'lots'))
);

create index camp_registrations_created_at_idx
  on public.camp_registrations (created_at desc);

alter table public.camp_registrations enable row level security;
-- (No anon-facing policies. Writes go through the RPC below.)

create or replace function public.submit_camp_registration(
  p_guardian_name     text,
  p_email             text,
  p_phone             text,
  p_student_name      text,
  p_student_age       int,
  p_student_school    text,
  p_student_grade     text,
  p_weeks             text[],
  p_coding_experience text,
  p_notes             text default null,
  p_heard_from        text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog
as $$
declare
  v_id       uuid;
  v_guardian text;
  v_email    text;
  v_phone    text;
  v_student  text;
  v_school   text;
  v_grade    text;
  v_weeks    text[];
  v_exp      text;
begin
  v_guardian := nullif(btrim(p_guardian_name), '');
  v_email    := nullif(btrim(p_email), '');
  v_phone    := nullif(btrim(p_phone), '');
  v_student  := nullif(btrim(p_student_name), '');
  v_school   := nullif(btrim(p_student_school), '');
  v_grade    := nullif(btrim(p_student_grade), '');
  v_exp      := nullif(btrim(p_coding_experience), '');

  if v_guardian is null then return jsonb_build_object('ok', false, 'error', 'Parent / guardian name is required.'); end if;
  if v_email is null or v_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    return jsonb_build_object('ok', false, 'error', 'A valid email is required.');
  end if;
  if v_phone   is null then return jsonb_build_object('ok', false, 'error', 'Phone is required.'); end if;
  if v_student is null then return jsonb_build_object('ok', false, 'error', 'Student name is required.'); end if;
  if p_student_age is null or p_student_age < 5 or p_student_age > 19 then
    return jsonb_build_object('ok', false, 'error', 'Student age must be between 5 and 19.');
  end if;
  if v_school is null then return jsonb_build_object('ok', false, 'error', 'Student school is required.'); end if;
  if v_grade  is null then return jsonb_build_object('ok', false, 'error', 'Student grade is required.'); end if;
  if p_weeks is null or array_length(p_weeks, 1) is null then
    return jsonb_build_object('ok', false, 'error', 'Select at least one week.');
  end if;
  if exists (select 1 from unnest(p_weeks) as w where w !~ '^w[1-6]$') then
    return jsonb_build_object('ok', false, 'error', 'Invalid week selection.');
  end if;
  -- De-duplicate and order the week selection.
  select array_agg(w order by w) into v_weeks
  from (select distinct unnest(p_weeks) as w) d;
  if v_exp not in ('none', 'some', 'lots') then
    return jsonb_build_object('ok', false, 'error', 'Coding experience must be one of: none, some, lots.');
  end if;

  if length(v_guardian) > 200 or length(v_email) > 200 or length(v_phone) > 60
     or length(v_student) > 200 or length(v_school) > 200 or length(v_grade) > 60
     or coalesce(length(p_notes), 0)      > 4000
     or coalesce(length(p_heard_from), 0) > 500 then
    return jsonb_build_object('ok', false, 'error', 'One or more fields exceeded the allowed length.');
  end if;

  insert into public.camp_registrations
    (guardian_name, email, phone, student_name, student_age, student_school, student_grade, weeks, coding_experience, notes, heard_from)
  values
    (v_guardian, v_email, v_phone, v_student, p_student_age, v_school, v_grade, v_weeks, v_exp,
     nullif(btrim(p_notes), ''),
     nullif(btrim(p_heard_from), ''))
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

revoke all on function public.submit_camp_registration(text, text, text, text, int, text, text, text[], text, text, text) from public;
grant execute on function public.submit_camp_registration(text, text, text, text, int, text, text, text[], text, text, text) to anon, authenticated;

notify pgrst, 'reload schema';
