-- Reverts 20260625130000_stem_camp_capacity.sql.
-- The 30-spot limit is advertised in the sign-up form only — NOT enforced in the
-- database (so organisers can accept an extra camper manually if they choose).
-- Restore the original submit RPC (no capacity guard) and drop the count helper.

create or replace function public.submit_stem_camp_registration(
  p_guardian_name text,
  p_camper_name   text,
  p_camper_age    int,
  p_email         text,
  p_phone         text,
  p_experience    text,
  p_notes         text default null,
  p_heard_from    text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog
as $$
declare
  v_id     uuid;
  v_gname  text;
  v_cname  text;
  v_email  text;
  v_phone  text;
  v_exp    text;
begin
  v_gname := nullif(btrim(p_guardian_name), '');
  v_cname := nullif(btrim(p_camper_name), '');
  v_email := nullif(btrim(p_email), '');
  v_phone := nullif(btrim(p_phone), '');
  v_exp   := nullif(btrim(p_experience), '');

  if v_gname is null then return jsonb_build_object('ok', false, 'error', 'Parent / guardian name is required.'); end if;
  if v_cname is null then return jsonb_build_object('ok', false, 'error', 'Camper name is required.'); end if;
  if p_camper_age is null or p_camper_age < 7 or p_camper_age > 13 then
    return jsonb_build_object('ok', false, 'error', 'This camp is for ages 7–13.');
  end if;
  if v_email is null or v_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    return jsonb_build_object('ok', false, 'error', 'A valid email is required.');
  end if;
  if v_phone is null then return jsonb_build_object('ok', false, 'error', 'Phone / WhatsApp is required.'); end if;
  if v_exp not in ('none', 'some', 'lots') then
    return jsonb_build_object('ok', false, 'error', 'Experience must be one of: none, some, lots.');
  end if;

  if length(v_gname) > 200 or length(v_cname) > 200 or length(v_email) > 200 or length(v_phone) > 60
     or coalesce(length(p_notes), 0)      > 4000
     or coalesce(length(p_heard_from), 0) > 500 then
    return jsonb_build_object('ok', false, 'error', 'One or more fields exceeded the allowed length.');
  end if;

  insert into public.stem_camp_registrations
    (guardian_name, camper_name, camper_age, email, phone, experience, notes, heard_from)
  values
    (v_gname, v_cname, p_camper_age, v_email, v_phone, v_exp,
     nullif(btrim(p_notes), ''),
     nullif(btrim(p_heard_from), ''))
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

drop function if exists public.stem_camp_spots_remaining();

notify pgrst, 'reload schema';
