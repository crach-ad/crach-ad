-- INVOKER version — runs as the caller (service_role), can SET ROLE.
create or replace function public._try_insert_as_anon()
returns jsonb
language plpgsql
security invoker
as $$
declare
  result jsonb;
begin
  set local role anon;
  begin
    insert into public.reservations
      (student_name, student_grade, parent_name, parent_email, parent_phone)
    values
      ('SQL-direct probe', 'test', 'probe', 'probe@example.com', '555-0001')
    returning to_jsonb(public.reservations.*) into result;
    reset role;
    return jsonb_build_object('ok', true, 'row', result);
  exception when others then
    reset role;
    return jsonb_build_object('ok', false, 'sqlstate', sqlstate, 'message', sqlerrm);
  end;
end;
$$;

grant execute on function public._try_insert_as_anon() to service_role;
