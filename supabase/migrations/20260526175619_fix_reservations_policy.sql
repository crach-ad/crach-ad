-- Earlier policy didn't take effect (POST as anon kept hitting RLS deny).
-- Drop and recreate explicitly, plus reassert the grant.

drop policy if exists "anon can insert reservations" on public.reservations;

create policy "anon insert reservations"
  on public.reservations
  as permissive
  for insert
  to anon
  with check (true);

grant insert on public.reservations to anon;

-- Sanity: notify schema cache so PostgREST picks up the change immediately.
notify pgrst, 'reload schema';
