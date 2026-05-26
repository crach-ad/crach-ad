-- SECURITY DEFINER fn that SET ROLE anon and then INSERTs.
-- Caller (service_role) bypasses normal RLS; SET LOCAL ROLE flips the
-- session role so the INSERT runs under anon and hits the same RLS path
-- as a PostgREST request.
create or replace function public._try_insert_as_anon()
returns jsonb
language plpgsql
security definer
as $$
declare
  result jsonb;
begin
  set local role anon;
  insert into public.reservations
    (student_name, student_grade, parent_name, parent_email, parent_phone)
  values
    ('SQL-direct probe', 'test', 'probe', 'probe@example.com', '555-0001')
  returning to_jsonb(public.reservations.*) into result;
  return jsonb_build_object('ok', true, 'row', result);
exception when others then
  return jsonb_build_object('ok', false, 'sqlstate', sqlstate, 'message', sqlerrm);
end;
$$;

grant execute on function public._try_insert_as_anon() to service_role;

-- Also probe installed extensions in case something is intercepting writes
create or replace function public._list_extensions()
returns jsonb
language sql
security definer
set search_path = pg_catalog
as $$
  select coalesce(jsonb_agg(jsonb_build_object('name', extname, 'schema', nspname)), '[]'::jsonb)
  from pg_extension e join pg_namespace n on e.extnamespace = n.oid;
$$;
grant execute on function public._list_extensions() to service_role;
