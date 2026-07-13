-- Sentraea V1 schema
-- Run this in the Supabase SQL editor (or via `supabase db push` / psql).

-- ============================================================
-- Tables
-- ============================================================

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.startup_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  startup_name text not null,
  product_summary text not null,
  customer_type text not null,
  stage text not null check (stage in ('idea', 'mvp', 'early_users', 'revenue')),
  main_goal_30d text not null,
  bottleneck text not null,
  priorities jsonb not null default '[]'::jsonb,
  website_url text,
  product_url text,
  competitor_urls jsonb not null default '[]'::jsonb,
  recent_changes text,
  notes text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists startup_profiles_user_id_idx
  on public.startup_profiles (user_id);

create table if not exists public.weekly_contexts (
  id uuid primary key default gen_random_uuid(),
  startup_profile_id uuid not null references public.startup_profiles (id) on delete cascade,
  week_start_date timestamptz not null default now(),
  planned_work text not null,
  current_blocker text not null,
  recent_changes text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists weekly_contexts_profile_idx
  on public.weekly_contexts (startup_profile_id, created_at desc);

create table if not exists public.research_runs (
  id uuid primary key default gen_random_uuid(),
  weekly_context_id uuid not null references public.weekly_contexts (id) on delete cascade,
  status text not null default 'pending' check (
    status in (
      'pending',
      'synthesizing_context',
      'generating_questions',
      'researching',
      'deciding',
      'complete',
      'failed'
    )
  ),
  error_message text,
  context_summary_json jsonb,
  generated_questions_json jsonb,
  extracted_signals_json jsonb,
  created_at timestamptz not null default now()
);

create index if not exists research_runs_context_idx
  on public.research_runs (weekly_context_id, created_at desc);

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  weekly_context_id uuid not null references public.weekly_contexts (id) on delete cascade,
  recommendation_title text not null,
  recommendation_summary text not null,
  why_now text not null,
  internal_signals_json jsonb not null default '[]'::jsonb,
  external_signals_json jsonb not null default '[]'::jsonb,
  ignored_alternatives_json jsonb not null default '[]'::jsonb,
  execution_tasks_json jsonb not null default '[]'::jsonb,
  confidence_level text not null check (confidence_level in ('low', 'medium', 'high')),
  success_criteria text not null,
  created_at timestamptz not null default now()
);

create index if not exists recommendations_context_idx
  on public.recommendations (weekly_context_id, created_at desc);

create table if not exists public.recommendation_sources (
  id uuid primary key default gen_random_uuid(),
  recommendation_id uuid not null references public.recommendations (id) on delete cascade,
  title text not null,
  url text not null,
  snippet text,
  signal_summary text
);

create index if not exists recommendation_sources_rec_idx
  on public.recommendation_sources (recommendation_id);

create table if not exists public.recommendation_feedback (
  id uuid primary key default gen_random_uuid(),
  recommendation_id uuid not null references public.recommendations (id) on delete cascade,
  acted_on text check (acted_on in ('yes', 'no', 'partially')),
  usefulness text check (usefulness in ('useful', 'not_useful')),
  outcome_notes text,
  blockers text,
  changed_this_week text,
  next_time_notes text,
  memory_note text,
  created_at timestamptz not null default now()
);

create index if not exists recommendation_feedback_rec_idx
  on public.recommendation_feedback (recommendation_id);

-- ============================================================
-- Mirror auth.users into public.users
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- Row Level Security
-- All application access goes through the server with queries scoped
-- to the authenticated user; RLS is defense in depth so the anon /
-- authenticated Postgres roles can never read another user's rows.
-- ============================================================

alter table public.users enable row level security;
alter table public.startup_profiles enable row level security;
alter table public.weekly_contexts enable row level security;
alter table public.research_runs enable row level security;
alter table public.recommendations enable row level security;
alter table public.recommendation_sources enable row level security;
alter table public.recommendation_feedback enable row level security;

create policy "users: own row" on public.users
  for select using (auth.uid() = id);

create policy "profiles: own rows" on public.startup_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "weekly_contexts: own rows" on public.weekly_contexts
  for all using (
    exists (
      select 1 from public.startup_profiles sp
      where sp.id = startup_profile_id and sp.user_id = auth.uid()
    )
  );

create policy "research_runs: own rows" on public.research_runs
  for all using (
    exists (
      select 1
      from public.weekly_contexts wc
      join public.startup_profiles sp on sp.id = wc.startup_profile_id
      where wc.id = weekly_context_id and sp.user_id = auth.uid()
    )
  );

create policy "recommendations: own rows" on public.recommendations
  for all using (
    exists (
      select 1
      from public.weekly_contexts wc
      join public.startup_profiles sp on sp.id = wc.startup_profile_id
      where wc.id = weekly_context_id and sp.user_id = auth.uid()
    )
  );

create policy "recommendation_sources: own rows" on public.recommendation_sources
  for all using (
    exists (
      select 1
      from public.recommendations r
      join public.weekly_contexts wc on wc.id = r.weekly_context_id
      join public.startup_profiles sp on sp.id = wc.startup_profile_id
      where r.id = recommendation_id and sp.user_id = auth.uid()
    )
  );

create policy "recommendation_feedback: own rows" on public.recommendation_feedback
  for all using (
    exists (
      select 1
      from public.recommendations r
      join public.weekly_contexts wc on wc.id = r.weekly_context_id
      join public.startup_profiles sp on sp.id = wc.startup_profile_id
      where r.id = recommendation_id and sp.user_id = auth.uid()
    )
  );
