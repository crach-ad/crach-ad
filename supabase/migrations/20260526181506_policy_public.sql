-- Add a fallback INSERT policy that applies to PUBLIC (every role).
-- If this works where `to anon` didn't, we know role-targeting in policies
-- isn't being honored as expected on this project.
create policy "public insert reservations"
  on public.reservations
  as permissive
  for insert
  to public
  with check (true);
