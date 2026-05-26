-- Diagnostic — return the current role context as anon
create or replace function public._whoami()
returns jsonb
language sql
stable
as $$
  select jsonb_build_object(
    'current_user', current_user,
    'session_user', session_user,
    'role_setting', current_setting('role', true),
    'jwt_role',     current_setting('request.jwt.claim.role', true)
  );
$$;

grant execute on function public._whoami() to anon, authenticated, service_role;

-- Re-enable RLS now that the off-test proved everything else works.
alter table public.reservations enable row level security;
