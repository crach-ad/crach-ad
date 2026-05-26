-- Add trigger + event-trigger introspection to the debug fn.
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
    'triggers',     (select coalesce(jsonb_agg(jsonb_build_object(
                       'name', tgname, 'enabled', tgenabled,
                       'definition', pg_get_triggerdef(t.oid)
                     )), '[]'::jsonb)
                     from pg_trigger t where tgrelid = 'public.reservations'::regclass and not tgisinternal),
    'event_triggers', (select coalesce(jsonb_agg(jsonb_build_object(
                         'name', evtname, 'event', evtevent, 'enabled', evtenabled
                       )), '[]'::jsonb) from pg_event_trigger),
    'check_constraints', (select coalesce(jsonb_agg(jsonb_build_object(
                            'name', conname, 'definition', pg_get_constraintdef(oid)
                          )), '[]'::jsonb)
                          from pg_constraint where conrelid = 'public.reservations'::regclass and contype='c'),
    'inherits',     (select coalesce(jsonb_agg(inhparent::regclass::text), '[]'::jsonb)
                     from pg_inherits where inhrelid = 'public.reservations'::regclass)
  );
$$;
