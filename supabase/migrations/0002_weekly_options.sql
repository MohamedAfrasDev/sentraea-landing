-- Sentraea V1.1 — weekly tradeoff engine
-- Run this in the Supabase SQL editor after 0001_init.sql.

-- ============================================================
-- Fix: public.users rows were missing for accounts created
-- before the mirror trigger existed, which broke the
-- startup_profiles.user_id foreign key on onboarding.
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill any existing auth users that never got mirrored.
insert into public.users (id, email)
select id, coalesce(email, '') from auth.users
on conflict (id) do nothing;

-- Allow a signed-in user to insert their own row as a server-side fallback.
drop policy if exists "users: insert own row" on public.users;
create policy "users: insert own row" on public.users
  for insert with check (auth.uid() = id);

-- ============================================================
-- Weekly options: the founder's explicit choices for the week.
-- ============================================================

create table if not exists public.weekly_options (
  id uuid primary key default gen_random_uuid(),
  weekly_context_id uuid not null references public.weekly_contexts (id) on delete cascade,
  title text not null,
  type text not null check (type in ('build', 'outreach', 'research', 'sales', 'ops')),
  expected_impact text not null check (expected_impact in ('low', 'medium', 'high')),
  effort text not null check (effort in ('low', 'medium', 'high')),
  reversible boolean not null default true,
  target_outcome text not null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists weekly_options_context_idx
  on public.weekly_options (weekly_context_id, created_at);

alter table public.weekly_options enable row level security;

drop policy if exists "weekly_options: own rows" on public.weekly_options;
create policy "weekly_options: own rows" on public.weekly_options
  for all using (
    exists (
      select 1
      from public.weekly_contexts wc
      join public.startup_profiles sp on sp.id = wc.startup_profile_id
      where wc.id = weekly_context_id and sp.user_id = auth.uid()
    )
  );

-- The options list is now the primary weekly input; the old freeform
-- fields become optional supporting context.
alter table public.weekly_contexts alter column planned_work drop not null;
alter table public.weekly_contexts alter column current_blocker drop not null;

-- ============================================================
-- Recommendations now record the comparative decision.
-- ============================================================

alter table public.recommendations
  add column if not exists chosen_option_id uuid references public.weekly_options (id) on delete set null,
  add column if not exists rejected_options_json jsonb not null default '[]'::jsonb;

-- ============================================================
-- Weekly review becomes decision-quality feedback.
-- ============================================================

alter table public.recommendation_feedback
  add column if not exists chose_right_option text check (chose_right_option in ('yes', 'no')),
  add column if not exists better_option_title text,
  add column if not exists felt_wrong_notes text,
  add column if not exists tasks_helped text check (tasks_helped in ('yes', 'somewhat', 'no'));
