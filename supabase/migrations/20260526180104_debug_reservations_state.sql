-- Throwaway debug helper. Drop after diagnosis.

create or replace function public._debug_reservations()
returns jsonb
language sql
security definer
set search_path = public, pg_catalog
as $$
  select jsonb_build_object(
    'rls_enabled',  (select relrowsecurity from pg_class where oid = 'public.reservations'::regclass),
    'rls_forced',   (select relforcerowsecurity from pg_class where oid = 'public.reservations'::regclass),
    'policies',     (select coalesce(jsonb_agg(jsonb_build_object(
                       'name', policyname, 'roles', roles, 'cmd', cmd,
                       'permissive', permissive, 'qual', qual, 'with_check', with_check
                     )), '[]'::jsonb) from pg_policies where schemaname='public' and tablename='reservations'),
    'grants',       (select coalesce(jsonb_agg(jsonb_build_object(
                       'grantee', grantee, 'privilege', privilege_type
                     )), '[]'::jsonb)
                     from information_schema.role_table_grants
                     where table_schema='public' and table_name='reservations')
  );
$$;

grant execute on function public._debug_reservations() to service_role;
