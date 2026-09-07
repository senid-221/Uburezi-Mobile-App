-- UBUREZI production database foundation
-- Supabase Auth stores passwords securely. Never store passwords in public tables.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'PARENT' check (role in ('PARENT','TEACHER','ADMIN')),
  created_at timestamptz not null default now()
);

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(), parent_id uuid not null references public.profiles(id) on delete cascade,
  display_name text not null, birth_year int not null check (birth_year between 2011 and 2025),
  learning_level text not null check (learning_level in ('early','young','kids','teens')),
  avatar text default 'person-circle-outline', created_at timestamptz not null default now()
);

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(), child_id uuid not null references public.children(id) on delete cascade,
  lesson_id text not null, progress int not null default 0 check (progress between 0 and 100), completed boolean not null default false,
  updated_at timestamptz not null default now(), unique(child_id, lesson_id)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(), child_id uuid not null references public.children(id) on delete cascade,
  lesson_id text not null, score int not null check (score >= 0), total int not null check (total > 0), completed_at timestamptz not null default now()
);

create table if not exists public.parent_settings (
  parent_id uuid primary key references public.profiles(id) on delete cascade,
  screen_time_enabled boolean not null default true, screen_time_minutes int not null default 60 check (screen_time_minutes in (30,60,90,120)),
  content_filter boolean not null default true, child_messaging boolean not null default false, notifications_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.learning_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.parent_settings enable row level security;

create policy "parents read own profile" on public.profiles for select using (auth.uid() = id);
create policy "parents insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "parents update own profile" on public.profiles for update using (auth.uid() = id);
create policy "parents manage own children" on public.children for all using (auth.uid() = parent_id) with check (auth.uid() = parent_id);
create policy "parents manage child progress" on public.learning_progress for all using (exists (select 1 from public.children c where c.id = child_id and c.parent_id = auth.uid())) with check (exists (select 1 from public.children c where c.id = child_id and c.parent_id = auth.uid()));
create policy "parents manage quiz attempts" on public.quiz_attempts for all using (exists (select 1 from public.children c where c.id = child_id and c.parent_id = auth.uid())) with check (exists (select 1 from public.children c where c.id = child_id and c.parent_id = auth.uid()));
create policy "parents manage settings" on public.parent_settings for all using (auth.uid() = parent_id) with check (auth.uid() = parent_id);

-- Ensure every new Supabase Auth user receives a profile even when email confirmation delays the client session.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), coalesce(new.raw_user_meta_data->>'role', 'PARENT'))
  on conflict (id) do update set full_name = excluded.full_name;
  insert into public.parent_settings (parent_id) values (new.id) on conflict (parent_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
