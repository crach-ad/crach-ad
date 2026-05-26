-- Newer Supabase projects don't auto-grant INSERT to the anon role on new
-- tables, so the policy alone isn't enough — PostgREST will hit RLS-deny
-- when the underlying GRANT is missing. Explicit grant fixes it.

grant insert on public.reservations to anon;
