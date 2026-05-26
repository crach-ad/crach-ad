-- Public-facing RPC for the reservation form. SECURITY DEFINER so we don't
-- depend on table-level RLS evaluation (which on this project was rejecting
-- valid anon inserts for unclear reasons). All validation happens here.

create or replace function public.submit_reservation(
  p_student_name  text,
  p_student_grade text,
  p_parent_name   text,
  p_parent_email  text,
  p_parent_phone  text,
  p_heard_from    text default null,
  p_needs         text default null,
  p_notes         text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog
as $$
declare
  v_id   uuid;
  v_name text;
  v_email text;
  v_phone text;
begin
  -- Trim + basic sanity checks. Reject empties with a friendly message.
  v_name  := nullif(btrim(p_student_name), '');
  v_email := nullif(btrim(p_parent_email), '');
  v_phone := nullif(btrim(p_parent_phone), '');

  if v_name is null then
    return jsonb_build_object('ok', false, 'error', 'Student name is required.');
  end if;
  if nullif(btrim(p_student_grade), '') is null then
    return jsonb_build_object('ok', false, 'error', 'Student grade/age is required.');
  end if;
  if nullif(btrim(p_parent_name), '') is null then
    return jsonb_build_object('ok', false, 'error', 'Parent/guardian name is required.');
  end if;
  if v_email is null or v_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    return jsonb_build_object('ok', false, 'error', 'Valid parent email is required.');
  end if;
  if v_phone is null then
    return jsonb_build_object('ok', false, 'error', 'Parent phone is required.');
  end if;

  -- Cap text lengths so the form isn't a free DoS vector
  if length(v_name) > 200 or length(v_email) > 200 or length(v_phone) > 60
     or length(p_student_grade) > 60 or length(p_parent_name) > 200
     or coalesce(length(p_heard_from),0) > 500
     or coalesce(length(p_needs),0)      > 2000
     or coalesce(length(p_notes),0)      > 2000 then
    return jsonb_build_object('ok', false, 'error', 'One or more fields exceeded the allowed length.');
  end if;

  insert into public.reservations
    (student_name, student_grade, parent_name, parent_email, parent_phone,
     heard_from, needs, notes)
  values
    (v_name, btrim(p_student_grade), btrim(p_parent_name), v_email, v_phone,
     nullif(btrim(p_heard_from), ''),
     nullif(btrim(p_needs), ''),
     nullif(btrim(p_notes), ''))
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

-- Lock down: only anon + authenticated may execute; revoke from public.
revoke all on function public.submit_reservation(text, text, text, text, text, text, text, text) from public;
grant execute on function public.submit_reservation(text, text, text, text, text, text, text, text) to anon, authenticated;

-- Refresh PostgREST schema cache so the new RPC is exposed immediately.
notify pgrst, 'reload schema';
