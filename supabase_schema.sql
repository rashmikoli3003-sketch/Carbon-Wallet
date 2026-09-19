-- ==========================================
-- CARBON WALLET AI — SUPABASE DATABASE SCHEMA
-- ==========================================

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  city text default 'New York, USA',
  points integer default 145,
  streak integer default 4,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. BUDGETS TABLE
create table if not exists public.budgets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  monthly_limit_kg numeric default 100,
  used_kg numeric default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ACTIVITIES TABLE
create table if not exists public.activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  category text not null,
  amount_kg numeric not null,
  date text default 'Today',
  icon text default '🌱',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

alter table public.profiles enable row level security;
alter table public.budgets enable row level security;
alter table public.activities enable row level security;

-- Profiles Policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Budgets Policies
create policy "Users can view own budget" on public.budgets
  for select using (auth.uid() = user_id);

create policy "Users can update own budget" on public.budgets
  for update using (auth.uid() = user_id);

create policy "Users can insert own budget" on public.budgets
  for insert with check (auth.uid() = user_id);

-- Activities Policies
create policy "Users can view own activities" on public.activities
  for select using (auth.uid() = user_id);

create policy "Users can insert own activities" on public.activities
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own activities" on public.activities
  for delete using (auth.uid() = user_id);

-- ==========================================
-- AUTOMATIC PROFILE & BUDGET TRIGGER ON SIGNUP
-- ==========================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, city, points, streak)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    'New York, USA',
    145,
    4
  );

  insert into public.budgets (user_id, monthly_limit_kg, used_kg)
  values (new.id, 100, 0);

  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
