-- Uburezi production database foundation
-- Authentication is handled by Supabase Auth. Do not store passwords here.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'PARENT' check (role in ('PARENT','TEACHER','ADMIN')),
  created_at timestamptz not null default now()
);

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  display_name text not null,
  birth_year int not null check (birth_year between 2010 and 2030),
  learning_level text not null check (learning_level in ('early','young','kids','teens')),
  avatar text default 'person-circle-outline',
  created_at timestamptz not null default now()
);

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children(id) on delete cascade,
  lesson_id text not null,
  progress int not null default 0 check (progress between 0 and 100),
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(child_id, lesson_id)
);

alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.learning_progress enable row level security;

create policy "parents read own profile" on public.profiles
for select using (auth.uid() = id);

create policy "parents insert own profile" on public.profiles
for insert with check (auth.uid() = id);

create policy "parents update own profile" on public.profiles
for update using (auth.uid() = id);

create policy "parents manage own children" on public.children
for all using (auth.uid() = parent_id) with check (auth.uid() = parent_id);

create policy "parents manage child progress" on public.learning_progress
for all using (
  exists (select 1 from public.children c where c.id = child_id and c.parent_id = auth.uid())
) with check (
  exists (select 1 from public.children c where c.id = child_id and c.parent_id = auth.uid())
);
