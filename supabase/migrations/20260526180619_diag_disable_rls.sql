-- Diagnostic only — flip RLS off to confirm it's the gating layer, then we'll
-- re-enable in the next migration.
alter table public.reservations disable row level security;
