-- Remove debug functions and the redundant table-level INSERT policies.
-- The submit_reservation RPC is the only public-facing write path.

drop function if exists public._debug_reservations();
drop function if exists public._whoami();
drop function if exists public._try_insert_as_anon();
drop function if exists public._list_extensions();

drop policy if exists "public insert reservations" on public.reservations;
drop policy if exists "anon insert reservations"   on public.reservations;

-- Lock the table down: nobody but the RPC (which runs as definer) and
-- service_role should be writing. Anon's table-level grants no longer matter
-- since they only act through the RPC, but revoke for tidiness.
revoke insert on public.reservations from anon, authenticated;

notify pgrst, 'reload schema';
